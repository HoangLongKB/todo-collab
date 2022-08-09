import { addDoc, collection, deleteDoc, doc, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, updateDoc, WithFieldValue } from "firebase/firestore";
import { Todo } from "../model";
import { authenticationSelector } from "../redux/selectors/auth.selector";
import { todosSelector } from "../redux/selectors/todo.selector";
import store from "../redux/store";

export const postConverter: FirestoreDataConverter<Todo> = {
  toFirestore(post: WithFieldValue<Todo>) {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Todo {
    const {name, completed, priority} = snapshot.data(options);
    return {
      name,
      id: snapshot.id,
      completed,
      priority
    };
  },
};

export const getUid = (uidParam: string, uid: string): string => {
  return uidParam ? uidParam : uid;
};

export const addTodo = async (uid: string, {id, ...dataUpdate}: Todo) => {
  const { db } = authenticationSelector(store.getState());
  const colRef = collection(db, 'users', uid, 'todos');
  await addDoc(colRef, dataUpdate);
  await updateProgress(uid);
};

export const updateTodo = async (uid: string, id: string, dataUpdate: {name?: string, completed?: boolean}) => {
  const { db } = authenticationSelector(store.getState());
  const docRef = doc(db, 'users', uid, 'todos', id);
  await updateDoc(docRef, dataUpdate);
  await updateProgress(uid);
};

export const deleteTodo = async (uid: string, id: string) => {
  const { db } = authenticationSelector(store.getState());
  const docRef = doc(db, 'users', uid, 'todos', id);
  await deleteDoc(docRef);
  await updateProgress(uid);
};

const updateProgress = async (uid: string) => {
  const { db } = authenticationSelector(store.getState());
  const todoList = todosSelector(store.getState());
  const completedCount = todoList.reduce((prev, todo) => {
    if (todo.completed) {
      return prev + 1; 
    }
    return prev;
  }, 0);
  const progress = ((completedCount/todoList.length)*100).toFixed(1);
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, {progress});
}