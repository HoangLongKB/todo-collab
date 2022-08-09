import { Spin } from 'antd';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { db } from '.';
import './App.scss';
import ManageUser from './components/manage-user';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';
import RouteGuard from './components/shared/route-guard';
import MyTodo from './components/my-todo';
import { loadingSelector } from './redux/selectors/appStatus.selector';
import authenticationSlice from './redux/slices/authenticationSlice.model';
import { getUserFromStorage } from './services/auth.service';
import NotFound from './components/shared/not-found';

function App() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const loading = useSelector(loadingSelector);
  useEffect(() => {
    dispatch(authenticationSlice.actions.createAuthentication({ auth, db }));
    getUserFromStorage();
  });

  return (
    <Spin size="large" spinning={loading}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RouteGuard roles={['admin', 'user']}>
                <Dashboard />
              </RouteGuard>
            }
          >
            <Route
              path="/manage-user"
              element={
                <RouteGuard roles={['admin']}>
                  <ManageUser />
                </RouteGuard>
              }
            ></Route>
            <Route
              index
              element={
                <RouteGuard roles={['admin', 'user']}>
                  <MyTodo />
                </RouteGuard>
              }
            ></Route>
            <Route
              path="/my-todo/:uidParam"
              element={
                <RouteGuard roles={['admin', 'user']}>
                  <MyTodo />
                </RouteGuard>
              }
            ></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Spin>
  );
}

export default App;
