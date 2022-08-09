import { createSlice } from '@reduxjs/toolkit';
import { Filter } from '../../model';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    search: '',
    status: 'all',
    priority: [],
  } as Filter,
  reducers: {
    setFilter: (state: Filter, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export default filterSlice;
