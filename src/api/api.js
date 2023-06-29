import axios from "axios";

const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = token;
}

export const userSingUp = async (name, email, password) => {
  const response = await instance.post("/users/signup", { name, email, password });
  if (response.data.token) {
    setToken(`Bearer ${response.data.token}`)
  }
  return response.data;
};

export const userLogIn = async (email, password) => {
  const response = await instance.post("/users/login", { email, password });
  if (response.data.token) {
    setToken(`Bearer ${response.data.token}`)
  }
  return response.data;
};

export const userLogOut = async () => {
  const response = await instance.post("/users/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await instance.get("users/current");
  return response.data;
};

export const getContacts = async () => {
  const response = await instance.get("/contacts");
  return response.data;
};

export const addContact = async (name, number) => {
  const response = await instance.post("/contacts", { name, number });
  return response.data;
};

export const editContact = async (contactId, name, number) => {
  const response = await instance.patch(`/contacts/${contactId}`, { name, number });
  return response.data;
};

export const deleteContact = async (contactId) => {
  const response = await instance.delete(`/contacts/${contactId}`);
  return response.data
};