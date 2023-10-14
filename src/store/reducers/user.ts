import { createSlice } from '@reduxjs/toolkit';

import { CardModel } from 'interfaces/card';
import { UserModel } from 'interfaces/user';

const initialState: {
  cards: Partial<CardModel[]>;
} & UserModel = {
  cards: [],
  id: 0,
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, { payload }) => payload,
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
