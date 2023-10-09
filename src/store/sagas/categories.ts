import { takeEvery } from 'redux-saga/effects';

import { getCategories } from 'store/reducers/categories';

function* observerCategories() {
  yield console.log('observando');
}

export function* categoriesSaga() {
  yield takeEvery<any>(getCategories, observerCategories);
}
