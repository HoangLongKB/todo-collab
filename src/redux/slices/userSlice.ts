import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../model';

const initialState = {
  email: '',
  displayName: '',
  uid: '',
  role: '',
  progress: 0
} as User

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: User, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return {...initialState};
    }
  },
});

export default userSlice;
