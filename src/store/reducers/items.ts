import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UUID } from 'crypto';

import { ItemModel } from 'interfaces/item';

const initialState: ItemModel[] = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    changeFavorite: (state, action: PayloadAction<UUID>) => {
      state.map((item) => {
        const favoriteItem = item;

        if (favoriteItem.id === action.payload) {
          favoriteItem.favorite = !item.favorite;
        }

        return favoriteItem;
      });
    },
    registerItem: (state, action: PayloadAction<ItemModel>) => {
      state.push(action.payload);
    },
    changeItem: (
      state,
      action: PayloadAction<{ id: UUID; item: { title: string } }>
    ) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      Object.assign(state[index], action.payload.item);
    },
    deleteItem: (state, action: PayloadAction<UUID>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
    addItems: (state, { payload }) => {
      state.push(...payload);
    },
  },
});

export const {
  changeFavorite,
  registerItem,
  changeItem,
  deleteItem,
  addItems,
} = itemsSlice.actions;
export default itemsSlice.reducer;
