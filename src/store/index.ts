import { TypedStartListening, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { itemsListener } from './middlewares/items';
import cartSlice from './reducers/cart';
import categoriesSlice from './reducers/categories';
import itemsSlice from './reducers/items';
import searchSlice from './reducers/search';
import { categoriesSaga } from './sagas/categories';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    cart: cartSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      // categoriesListener.middleware,
      itemsListener.middleware,
      sagaMiddleware
    ),
});

sagaMiddleware.run(categoriesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export default store;
