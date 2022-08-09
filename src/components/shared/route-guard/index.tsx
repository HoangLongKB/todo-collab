import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userSelector } from '../../../redux/selectors/user.selector';
import { getUserFromStorage } from '../../../services/auth.service';

function RouteGuard({ children, roles }: { children: ReactElement<any, any>, roles: string[] }) {
  const {role} = useSelector(userSelector);
  let checkedRole = role;
  if (!role) {
    const userStorage = JSON.parse(localStorage.getItem('todo-collab') || '{}');
      getUserFromStorage();
      checkedRole = userStorage.user?.role;
  }
  if(!roles.includes(checkedRole)) {
    return <Navigate to="/login"/>
  }
  return children;
}

export default RouteGuard;
