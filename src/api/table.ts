import { NewTableData } from '../types/NewTableData';
import { client } from './client';

export const getTable = (offset = 0) => {
  return client.get(`/table/?offset=${offset}`);
};

export const removeDataByIde = (id: number) => {
  return client.delete(`/table/${id}/`);
};

export const updateDataById = (id: number, data: NewTableData) => {
  return client.patch(`/table/${id}/`, data);
};
