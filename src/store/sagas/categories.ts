import { createStandaloneToast } from '@chakra-ui/toast';
import { ForkEffect, call, delay, put, takeLatest } from 'redux-saga/effects';

import categoriesService from 'services/categories';

import { addAllCategories, loadCategories } from 'store/reducers/categories';

import { CategoryModel } from 'interfaces/category';

const { toast } = createStandaloneToast();

// Worker
function* observerCategories(): unknown {
  toast({
    title: 'Carregando!',
    description: 'Carregando categorias',
    status: 'loading',
    duration: 2000,
    isClosable: true,
  });

  try {
    yield delay(1000);
    const categories = yield call(categoriesService.getCategories);
    yield put(addAllCategories(categories));
    toast({
      title: 'Sucesso!',
      description: 'Categorias carregadas com sucesso',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  } catch (error: unknown) {
    toast({
      title: 'Erro!',
      description: 'Erro ao carregar as categorias',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }
}

// Watcher
export function* categoriesSaga(): Generator<ForkEffect<CategoryModel>> {
  const task: any = yield takeLatest(loadCategories, observerCategories);
  yield takeLatest(addAllCategories, () => task.cancel());
}
