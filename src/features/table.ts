/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTable } from '../api/table';
import { TableData } from '../types/TableData';

interface TableApiResponse {
  count: number,
  next: string,
  previous: string,
  results: TableData[],
}

interface TableState {
  data: TableApiResponse | null,
  loading: boolean,
  error: string,
}

const initialState: TableState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchTable = createAsyncThunk('table/fetch', (offset: number) => {
  return getTable(offset);
});

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TableState>) => {
      state.data?.results.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTable.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchTable.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });

    builder.addCase(fetchTable.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default tableSlice.reducer;
export const { add } = tableSlice.actions;
