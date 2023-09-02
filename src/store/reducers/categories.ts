import { createSlice } from '@reduxjs/toolkit';

import { CategoryModel } from 'interfaces/categories';

const initialState: CategoryModel[] = [];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (state, { payload }) => {
      state.push(...payload);
    },
  },
});

export const { addCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
