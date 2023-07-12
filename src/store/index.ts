import { configureStore } from '@reduxjs/toolkit';

import categoriesSlice from './reducers/categories';
import itemsSlice from './reducers/items';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
