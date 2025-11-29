import axios from "axios";
import api from "../axios";

const API_URL = "http://localhost:8080/admin/products";

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  size: string;
  imageBase64: string;
}

// Obtener todos
export async function getAllProducts() {
  return await api.get<Product[]>(API_URL);
}

// Obtener por ID
export async function getProductById(id: number) {
  return await api.get<Product>(`${API_URL}/${id}`);
}

// Crear
export async function createProduct(formData: FormData) {
  return await api.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Actualizar
export async function updateProduct(id: number, formData: FormData) {
  return await api.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Eliminar
export async function deleteProduct(id: number) {
  return await api.delete(`${API_URL}/${id}`);
}
