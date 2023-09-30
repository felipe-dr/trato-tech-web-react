import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UUID } from 'crypto';

import itemsService from 'services/items';

import { ItemModel } from 'interfaces/item';

const initialState: ItemModel[] = [];

export const getItems = createAsyncThunk('items/get', itemsService.get);

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
    addItems: (state, action: PayloadAction<ItemModel[]>) => {
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, { payload }) => payload);
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
