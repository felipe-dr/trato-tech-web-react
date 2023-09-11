import { createStandaloneToast } from '@chakra-ui/toast';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoriesService from 'services/categories';

import { CategoryModel } from 'interfaces/categories';

import { resetCart } from './cart';

const { toast } = createStandaloneToast();

const initialState: CategoryModel[] = [];

export const getCategories = createAsyncThunk(
  'categories/get',
  categoriesService.get
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (_state, { payload }) => {
        toast({
          title: 'Sucesso!',
          description: 'Categorias carregadas com sucesso',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        return payload;
      })
      .addCase(getCategories.pending, () => {
        toast({
          title: 'Carregando!',
          description: 'Carregando categorias',
          status: 'loading',
          duration: 2000,
          isClosable: true,
        });
      })
      .addCase(getCategories.rejected, () => {
        toast({
          title: 'Erro!',
          description: 'Erro ao carregar as categorias',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      })
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

export default categoriesSlice.reducer;
