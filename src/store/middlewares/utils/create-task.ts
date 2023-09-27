import { createStandaloneToast } from '@chakra-ui/toast';
import {
  AnyAction,
  ForkedTask,
  ForkedTaskExecutor,
  ThunkDispatch,
} from '@reduxjs/toolkit';

const { toast } = createStandaloneToast();

interface CreateTaskParams<T> {
  fork: (executor: ForkedTaskExecutor<T>) => ForkedTask<T>;
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
  get: () => Promise<T>;
  action: any;
  loadingText: string;
  successText: string;
  errorText: string;
}

export default async function createTask<T>({
  fork,
  dispatch,
  get,
  action,
  loadingText,
  successText,
  errorText,
}: CreateTaskParams<T>) {
  toast({
    title: 'Carregando!',
    description: loadingText,
    status: 'loading',
    duration: 2000,
    isClosable: true,
  });

  const task = fork(async (api) => {
    await api.delay(1000);

    return get();
  });
  const response = await task.result;

  if (response.status === 'ok') {
    toast({
      title: 'Sucesso!',
      description: successText,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    dispatch(action(response.value));
  }

  if (response.status === 'rejected') {
    toast({
      title: 'Erro!',
      description: errorText,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }

  return response;
}
