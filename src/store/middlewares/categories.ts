import { createStandaloneToast } from '@chakra-ui/toast';
import { createListenerMiddleware } from '@reduxjs/toolkit';

import categoriesService from 'services/categories';

import { addAllCategories, loadCategories } from 'store/reducers/categories';

export const listener = createListenerMiddleware();
const { toast } = createStandaloneToast();

listener.startListening({
  actionCreator: loadCategories,
  effect: async (_action, { dispatch, fork, unsubscribe }) => {
    toast({
      title: 'Carregando!',
      description: 'Carregando categorias',
      status: 'loading',
      duration: 2000,
      isClosable: true,
    });

    const task = fork(async (api) => {
      await api.delay(1000);

      return categoriesService.get();
    });
    const response = await task.result;

    if (response.status === 'ok') {
      toast({
        title: 'Sucesso!',
        description: 'Categorias carregadas com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      dispatch(addAllCategories(response.value));
      unsubscribe();
    }

    if (response.status === 'rejected') {
      toast({
        title: 'Erro!',
        description: 'Erro ao carregar as categorias',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  },
});
