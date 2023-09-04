import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriesService from 'services/categories';

import { CategoryModel } from 'interfaces/categories';

const initialState: CategoryModel[] = [];

export const getCategories = createAsyncThunk(
  'categories/get',
  categoriesService.get
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (state, { payload }) => {
      state.push(...payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.push(...payload);
    });
  },
});

export const { addCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
