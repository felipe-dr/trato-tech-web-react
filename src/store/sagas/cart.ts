import {
  ForkEffect,
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import cardsService from 'services/cards';
import flagsService from 'services/flags';
import usersService from 'services/users';

import {
  changeCart,
  changeQuantity,
  changeTotal,
  loadPayment,
} from 'store/reducers/cart';
import { addUser } from 'store/reducers/user';

import { CardModel } from 'interfaces/card';
import { CartModel } from 'interfaces/cart';
import { FlagModel } from 'interfaces/flag';
import { UserModel } from 'interfaces/user';

const loggedUser = 1;

function* loadPaymentSaga(): unknown {
  try {
    const user: UserModel[] = yield call(usersService.getById, loggedUser);
    const cards: CardModel[] = yield call(cardsService.getByIdUser, loggedUser);
    const flagIds = cards.map((card: CardModel) => card.flagId);
    const flags: FlagModel[] = yield call(flagsService.getById, flagIds);
    const cardsWithFlags = cards.map((card) => {
      const cardFlag = flags.find((flag) => flag.id === card.flagId);
      return {
        ...card,
        rate: cardFlag?.rate,
        flag: cardFlag?.name,
      };
    });
    yield put(addUser({ ...user, cards: cardsWithFlags }));
  } catch (error: unknown) {
    throw new Error(error as string);
  }
}

function* calcTotal(): unknown {
  yield delay(500);
  const state = yield select();
  const total = state.cart.data.reduce(
    (totalValue: number, cartItem: CartModel) => {
      const item = state.items.find(
        (stateItem: { id: number }) => stateItem.id === cartItem.id
      );

      return totalValue + item.price * cartItem.quantity;
    },
    0
  );
  yield put(changeTotal(total));
}

export function* cartSaga(): Generator<ForkEffect<CartModel>> {
  yield takeLatest(loadPayment, loadPaymentSaga);
  yield takeEvery([changeQuantity, changeCart], calcTotal);
}
