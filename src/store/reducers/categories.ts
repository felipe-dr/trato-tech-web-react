import { createStandaloneToast } from '@chakra-ui/toast';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoriesService from 'services/categories';

import { CategoryModel } from 'interfaces/categories';

import { resetCart } from './cart';

const { toast } = createStandaloneToast();

const initialState: CategoryModel[] = [];

export const loadCategories = createAction('categories/loadCategories');

export const getCategories = createAsyncThunk(
  'categories/get',
  categoriesService.get
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addAllCategories: (state, { payload }) => payload,
  },
  extraReducers: (builder) => {
    builder
      /**
       * Exemplo de que é possível acessar outros reducers fora do escopo
       */
      .addCase(resetCart.type, () => {
        toast({
          title: 'Sucesso!',
          description: 'Compra finalizada com sucesso!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      });
  },
});

export const { addAllCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
