import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://technical-task-api.icapgroupgmbh.com/api',
});
