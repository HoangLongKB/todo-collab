import { createSlice } from '@reduxjs/toolkit';
import { AppStatus } from '../../model';

const appStatusSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
  } as AppStatus,
  reducers: {
    setLoading: (state: AppStatus, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

export default appStatusSlice;
