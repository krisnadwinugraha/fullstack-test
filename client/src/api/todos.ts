import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

axios.interceptors.request.use((config) => {
  config.headers['x-user-id'] = 'candidate-123'; 
  return config;
});

export interface Todo {
  id: string;
  title: string;
  status: 'CREATED' | 'ON_GOING' | 'COMPLETED' | 'PROBLEM';
  problem_desc?: string;
  ai_recommendation?: string;
}

export const getTodos = async (search?: string) => {
  const params = search ? { search } : {};
  const res = await axios.get<Todo[]>(API_URL, { params });
  return res.data;
};

export const createTodo = async (title: string) => {
  const res = await axios.post<Todo>(API_URL, { title });
  return res.data;
};

export const updateTodo = async (id: string, data: Partial<Todo>) => {
  const res = await axios.patch<Todo>(`${API_URL}/${id}`, data);
  return res.data;
};