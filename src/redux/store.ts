import { configureStore } from '@reduxjs/toolkit';
import appStatusSlice from './slices/appStatusSlice';
import authenticationSlice from './slices/authenticationSlice.model';
import filterSlice from './slices/filterSlice';
import todosSlice from './slices/todosSlice';
import userSlice from './slices/userSlice';

const store = configureStore ({
  reducer: {
    appStatus: appStatusSlice.reducer,
    authentication: authenticationSlice.reducer,
    user: userSlice.reducer,
    filter: filterSlice.reducer,
    todos: todosSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;