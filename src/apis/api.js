import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://68c78c8c5d8d9f5147322273.mockapi.io/api/',
});

export const getTodos = async () => {
    return instance.get('/todos');
};

export const addTodo = async (todo) => {
    return instance.post('/todos', todo);
};

export const deleteTodo = async (id) => {
    return instance.delete(`/todos/${id}`);
};

export const toggleTodoDone = async (id, done) => {
    return instance.put(`/todos/${id}`, { done });
};