import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UUID } from 'crypto';

interface Cart {
  id: UUID;
  quantity: number;
}

const initialState: Cart[] = [];

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
      const hasItem = state.some((item) => item.id === action.payload);

      if (!hasItem) {
        return [
          ...state,
          {
            id: action.payload,
            quantity: 1,
          },
        ];
      }

      return state.filter((item) => item.id !== action.payload);
    },

    changeQuantity: (state, action: PayloadAction<Cart>) => {
      state.map((item) => {
        const cartItem = item;

        if (item.id === action.payload.id) {
          cartItem.quantity += action.payload.quantity;
        }

        return cartItem;
      });
    },

    resetCart: () => initialState,
  },
});

export const { changeCart, changeQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
