import axios from "axios";

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  size: string;
  imageBase64: string;
}

const API_URL = "http://localhost:8080/admin/products";

const getToken = () => localStorage.getItem("jwt");

const getConfig = (isMultipart = false) => ({
  headers: {
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

// CRUD
export const getAllProducts = async () =>
  axios.get<Product[]>(API_URL, getConfig());
export const createProduct = async (formData: FormData) =>
  axios.post(API_URL, formData, getConfig(true));
export const updateProduct = async (id: number, formData: FormData) =>
  axios.put(`${API_URL}/${id}`, formData, getConfig(true));
export const deleteProduct = async (id: number) =>
  axios.delete(`${API_URL}/${id}`, getConfig());
