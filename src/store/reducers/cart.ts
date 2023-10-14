import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { UUID } from 'crypto';

import { FinishCartModel } from 'interfaces/finish-cart';

interface Cart {
  id: UUID;
  quantity: number;
}

const initialState: { data: Cart[]; total: number } = { data: [], total: 0 };

export const loadPayment = createAction('carrinho/carregarPagamento');
export const finishPayment = createAction<FinishCartModel>(
  'carrinho/finalizarPagamento'
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Não é possível retornar um push do novo item no carrinho diretamente
     * no state, devido ao Immer esperar um novo estado caso se utilize o return,
     * e retornar uma mudança não condiz com os padrões do Immer, por isso
     * ele não aceita.
     */
    changeCart: (state, action: PayloadAction<UUID>) => {
      const hasItem = state.data.some((item) => item.id === action.payload);

      if (!hasItem) {
        return {
          total: state.total,
          data: [
            ...state.data,
            {
              id: action.payload,
              quantity: 1,
            },
          ],
        };
      }

      return {
        total: state.total,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    },

    changeQuantity: (state, action: PayloadAction<Cart>) => {
      state.data.map((item) => {
        const cartItem = item;

        if (item.id === action.payload.id) {
          cartItem.quantity += action.payload.quantity;
        }

        return cartItem;
      });
    },

    resetCart: () => initialState,
    changeTotal: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.total = payload;
    },
  },
});

export const { changeCart, changeQuantity, resetCart, changeTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
