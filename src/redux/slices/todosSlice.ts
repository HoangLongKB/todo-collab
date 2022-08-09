import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../model';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    createTodos: (_, action) => {
      return [ ...action.payload ];
    },
    resetTodos: () => {
      return [];
    }
  },
});

export default todosSlice;
