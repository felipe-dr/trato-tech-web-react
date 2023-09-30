import { createListenerMiddleware } from '@reduxjs/toolkit';

import itemsService from 'services/items';

import { loadCategory } from 'store/reducers/categories';
import { addItems } from 'store/reducers/items';

import { ItemModel } from 'interfaces/item';

import createTask from './utils/create-task';

export const itemsListener = createListenerMiddleware();

itemsListener.startListening({
  actionCreator: loadCategory,
  // eslint-disable-next-line consistent-return
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    const { items } = getState() as { items: ItemModel[] };

    if (items.length === 25) {
      return unsubscribe();
    }

    const categoryName = action.payload;
    const loadedItems = items.some((item) => item.category === categoryName);

    if (loadedItems) {
      // eslint-disable-next-line consistent-return
      return;
    }

    await createTask<ItemModel>({
      fork,
      dispatch,
      get: () => itemsService.getFromCategories(categoryName),
      action: addItems,
      loadingText: `Carregando itens da categoria ${categoryName}`,
      successText: `Itens da categoria ${categoryName} carregadas com sucesso`,
      errorText: 'Erro ao carregar os itens',
    });
  },
});
