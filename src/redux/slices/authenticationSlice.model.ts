import { createSlice } from '@reduxjs/toolkit';
import { Authentication } from '../../model';

const initialState = {
  auth: {},
  db: {},
  userFirebase:  {}
} as Authentication;

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    createAuthentication: (state: Authentication, action) => {
      return { ...state, ...action.payload };
    },
    resetAuthentication: (state: Authentication) => {
      return {...state, userFirebase: {}};
    }
  },
});

export default authenticationSlice;
