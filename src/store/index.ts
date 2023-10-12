import { TypedStartListening, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { categoriesListener } from './middlewares/categories';
import { itemsListener } from './middlewares/items';
import cartSlice from './reducers/cart';
import categoriesSlice from './reducers/categories';
import itemsSlice from './reducers/items';
import searchSlice from './reducers/search';
import { cartSaga } from './sagas/cart';
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
      categoriesListener.middleware,
      itemsListener.middleware,
      sagaMiddleware
    ),
});

sagaMiddleware.run(categoriesSaga);
sagaMiddleware.run(cartSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export default store;
