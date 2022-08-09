import {
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { LoginForm, RegisterParam, User } from '../model';
import { authenticationSelector } from '../redux/selectors/auth.selector';
import authenticationSlice from '../redux/slices/authenticationSlice.model';
import userSlice from '../redux/slices/userSlice';
import store from '../redux/store';

const STORAGE_NAME = 'todo-collab';

const signIn = async (loginForm: LoginForm) => {
  const { auth, db } = authenticationSelector(store.getState());
  const userCredential: UserCredential = await signInWithEmailAndPassword(
    auth,
    loginForm.email,
    loginForm.password
  );
  const docRef = doc(db, 'users', userCredential.user.uid);
  const docSnap = await getDoc(docRef);
  const { displayName, email, uid } = userCredential.user;
  if (!docSnap.exists()) {
    throw new Error('User have no role!');
  }
  const user: User = {
    displayName,
    email,
    uid,
    role: docSnap.data().role,
    progress: docSnap.data().progress,
  };
  saveUserToStore(user, userCredential.user);
  return userCredential.user;
};

const signUp = async ({ displayName, ...rest }: RegisterParam) => {
  const { auth, db } = authenticationSelector(store.getState());
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    rest.email,
    rest.password
  );

  const { email, uid } = userCredential.user;
  const user: User = {
    displayName,
    email,
    uid,
    role: 'user',
    progress: 0,
  };
  await updateProfile(userCredential.user, { displayName });
  const docRef = doc(db, 'users', userCredential.user.uid);
  await setDoc(docRef, user);
  saveUserToStore(user, userCredential.user);
  return { ...userCredential.user, displayName };
};

export const logOut = async () => {
  const { auth } = authenticationSelector(store.getState());
  await signOut(auth);
  resetUserInStore();
};

const resetUserInStore = () => {
  store.dispatch(userSlice.actions.resetUser());
  store.dispatch(authenticationSlice.actions.resetAuthentication());
  localStorage.removeItem(STORAGE_NAME);
};

const saveUserToStore = (user: User, userFirebase: any) => {
  saveUserToStorage(user, userFirebase);
  store.dispatch(userSlice.actions.setUser(user));
  store.dispatch(
    authenticationSlice.actions.createAuthentication({
      userFirebase,
    })
  );
};

const saveUserToStorage = (user: User, userFirebase: any) => {
  localStorage.setItem(
    STORAGE_NAME,
    JSON.stringify({
      user,
      userFirebase,
    })
  );
};

export const getUserFromStorage = () => {
  const userStorage = JSON.parse(localStorage.getItem(STORAGE_NAME) || '{}');
  if (userStorage && userStorage.user) {
    const { user, userFirebase } = userStorage;
    store.dispatch(userSlice.actions.setUser(user));
    store.dispatch(
      authenticationSlice.actions.createAuthentication({
        userFirebase,
      })
    );
  }
};

export { signIn, signUp };
