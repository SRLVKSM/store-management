import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

const getHeader = token => ({
  headers: {
    'Authorization': `Bearer ${token}`,
  }
})

export const registerUser = payload => axios.post(`${BASE_URL}/users/register`, payload);
export const loginUser = payload => axios.post(`${BASE_URL}/users/login`, payload);

export const getUser = token => axios.get(`${BASE_URL}/user-info`, getHeader(token));
export const addItem = (payload, token) => axios.post(`${BASE_URL}/store-items`, payload, getHeader(token));
export const getItem = (id, token) => axios.get(`${BASE_URL}/store-items/${id}`, getHeader(token));
export const getItems = token => axios.get(`${BASE_URL}/store-items`, getHeader(token));
export const updateItem = (id, payload, token) => axios.put(`${BASE_URL}/store-items/${id}`, payload, getHeader(token));
export const deleteItem = (id, token) => axios.delete(`${BASE_URL}/store-items/${id}`, getHeader(token));