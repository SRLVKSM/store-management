import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

export const registerUser = payload => axios.post(`${BASE_URL}/users/register`, payload);
export const loginUser = payload => axios.post(`${BASE_URL}/users/login`, payload);
export const addItem = payload => axios.post(`${BASE_URL}/grocery-items`, payload);
export const getItem = id => axios.get(`${BASE_URL}/grocery-items/${id}`);
export const getItems = () => axios.get(`${BASE_URL}/grocery-items`);
export const updateItem = (id, payload) => axios.put(`${BASE_URL}/grocery-items/${id}`, payload);
export const deleteItem = id => axios.delete(`${BASE_URL}/grocery-items/${id}`);