/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TableData } from '../types/TableData';

interface SelectedTableDataState {
  data: TableData | null;
}

const initialState: SelectedTableDataState = {
  data: null,
};

const selectedTableDataSlice = createSlice({
  name: 'selectedTableData',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TableData>) => {
      state.data = action.payload;
    },
    clear: (state) => {
      state.data = null;
    },
  },
});

export const { set, clear } = selectedTableDataSlice.actions;
export default selectedTableDataSlice.reducer;
