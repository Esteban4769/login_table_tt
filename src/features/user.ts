import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData } from '../types/UserData';

const initialState: UserData | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<UserData>) => {
      return action.payload;
    },
    clear: () => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { set, clear } = userSlice.actions;
