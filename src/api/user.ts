import { UserData } from '../types/UserData';
import { client } from './client';

export const login = (userData: UserData) => {
  return client.post<UserData>('login/', userData);
};
