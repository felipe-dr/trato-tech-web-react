import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './reducers/cart';
import categoriesSlice from './reducers/categories';
import itemsSlice from './reducers/items';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
