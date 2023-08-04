import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '';

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearch: (_state, action: PayloadAction<string>) => action.payload,
    resetSearch: () => initialState,
  },
});

export const { changeSearch, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
