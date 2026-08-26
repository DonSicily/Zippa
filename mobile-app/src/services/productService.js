import { api } from './api';

// Fetch all products with pagination and filters
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch products' };
  }
};

// Fetch single product details
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch product details' };
  }
};

// Fetch trending products for the home screen
export const getTrendingProducts = async () => {
  try {
    const response = await api.get('/products/trending');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch trending products' };
  }
};

// Fetch exclusive "Campus Drops"
export const getCampusDrops = async () => {
  try {
    const response = await api.get('/products/drops');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch campus drops' };
  }
};

// Search products by text
export const searchProducts = async (query) => {
  try {
    const response = await api.get('/products', { params: { search: query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Search failed' };
  }
};
