import { configureStore } from '@reduxjs/toolkit';

import { listener } from './middlewares/categories';
import cartSlice from './reducers/cart';
import categoriesSlice from './reducers/categories';
import itemsSlice from './reducers/items';
import searchSlice from './reducers/search';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    cart: cartSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
