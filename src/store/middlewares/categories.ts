import { createListenerMiddleware } from '@reduxjs/toolkit';

import categoriesService from 'services/categories';

import {
  addAllCategories,
  addCategory,
  loadCategories,
  loadCategory,
} from 'store/reducers/categories';

import { CategoryModel } from 'interfaces/categories';

import createTask from './utils/create-task';

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: loadCategories,
  effect: async (_action, { fork, dispatch, unsubscribe }) => {
    const response = await createTask<CategoryModel>({
      fork,
      dispatch,
      get: categoriesService.get,
      action: addAllCategories,
      loadingText: 'Carregando categorias',
      successText: 'Categorias carregadas com sucesso',
      errorText: 'Erro ao carregar as categorias',
    });

    if (response.status === 'ok') {
      unsubscribe();
    }
  },
});

listener.startListening({
  actionCreator: loadCategory,
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    const { categories } = getState() as { categories: CategoryModel[] };
    const categoryName = action.payload;
    const loadedCategory = categories.some(
      (category) => category.id === categoryName
    );

    if (loadedCategory) {
      return;
    }

    if (categories.length === 5) {
      // eslint-disable-next-line consistent-return
      return unsubscribe();
    }

    if (categoryName) {
      await createTask<CategoryModel>({
        fork,
        dispatch,
        action: addCategory,
        get: () => categoriesService.getCategory(categoryName as string),
        loadingText: `Carregando categoria ${categoryName}`,
        successText: `Categoria ${categoryName} carregada com sucesso`,
        errorText: `Erro ao carregar a categoria ${categoryName}`,
      });
    }
  },
});
