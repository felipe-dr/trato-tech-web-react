import { createListenerMiddleware } from '@reduxjs/toolkit';

import categoriesService from 'services/categories';

import { addCategory, loadCategory } from 'store/reducers/categories';

import { CategoryModel } from 'interfaces/category';

import createTask from './utils/create-task';

export const categoriesListener = createListenerMiddleware();

categoriesListener.startListening({
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

    await createTask<CategoryModel>({
      fork,
      dispatch,
      action: addCategory,
      get: () => categoriesService.getCategory(categoryName as string),
      loadingText: `Carregando categoria ${categoryName}`,
      successText: `Categoria ${categoryName} carregada com sucesso`,
      errorText: `Erro ao carregar a categoria ${categoryName}`,
    });
  },
});
