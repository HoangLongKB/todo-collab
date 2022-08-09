import { userSelector } from "../redux/selectors/user.selector";
import store from "../redux/store";

export const generateUrlByRole = (path: string) => {
  const {role, uid} = userSelector(store.getState()); 
  switch (path) {
    case '/':
      if (role === 'admin') {
        path = path.concat('manage-user');
      } else {
        path = path.concat(`my-todo/${uid}`);
      }
      break;
    default:
      break;
  }
  return path;
}