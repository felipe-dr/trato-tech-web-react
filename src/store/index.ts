import { configureStore } from '@reduxjs/toolkit';

import categoriesSlice from './reducers/categories';
import itensSlice from './reducers/itens';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    itens: itensSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
