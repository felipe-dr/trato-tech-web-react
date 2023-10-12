import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUser: (state, { payload }) => payload,
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
