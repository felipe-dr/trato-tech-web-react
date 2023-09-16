import { createListenerMiddleware } from '@reduxjs/toolkit';

import { getCategories } from 'store/reducers/categories';

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: getCategories.pending,
  effect: async (action) => {
    console.log('buscando categorias: ', action);
  },
});
