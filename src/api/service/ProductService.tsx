import axios from "axios";

// --------------------------
// Interfaces
// --------------------------
export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  sizes: string[];
  imageBase64: string;
}

// --------------------------
// URLs de la API
// --------------------------
const PUBLIC_API_URL = "http://localhost:8080/products"; // rutas públicas
const ADMIN_API_URL = "http://localhost:8080/admin/products"; // rutas admin

// --------------------------
// Token JWT
// --------------------------
const getToken = () => localStorage.getItem("jwt");

// Configuración de headers
const getAuthConfig = (isMultipart = false) => ({
  headers: {
    Authorization: `Bearer ${getToken() || ""}`,
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
  },
});

// --------------------------
// Helpers
// --------------------------
const normalizeSizes = (sizes: string[] | string): string[] => {
  if (!sizes) return [];
  return Array.isArray(sizes) ? sizes : [sizes];
};

// --------------------------
// Rutas públicas (no requieren token)
// --------------------------
export const getPublicProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(PUBLIC_API_URL);
  return data.map((p) => ({ ...p, sizes: normalizeSizes(p.sizes) }));
};

export const getPublicProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(
    `${PUBLIC_API_URL}/category/${category}`
  );
  return data.map((p) => ({ ...p, sizes: normalizeSizes(p.sizes) }));
};

// --------------------------
// Rutas de administrador (requieren token JWT)
// --------------------------
export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(ADMIN_API_URL, getAuthConfig());
  return data.map((p) => ({ ...p, sizes: normalizeSizes(p.sizes) }));
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  const { data } = await axios.post<Product>(
    ADMIN_API_URL,
    formData,
    getAuthConfig(true)
  );
  return data;
};

export const updateProduct = async (
  id: number,
  formData: FormData
): Promise<Product> => {
  const { data } = await axios.put<Product>(
    `${ADMIN_API_URL}/${id}`,
    formData,
    getAuthConfig(true)
  );
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${ADMIN_API_URL}/${id}`, getAuthConfig());
};
