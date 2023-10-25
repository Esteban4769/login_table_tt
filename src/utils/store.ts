import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import tableReducer from '../features/table';
import selectedTableDataReducer from '../features/selectedTableData';

export const store = configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
    selectedTableData: selectedTableDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
