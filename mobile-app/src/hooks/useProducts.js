import { useState, useEffect, useCallback } from 'react';
import { getProducts, getTrendingProducts, getCampusDrops, searchProducts } from '../services/productService';

// Hook for fetching standard product lists with pagination
export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProducts({ ...initialParams, page: pageNum });
      if (append) {
        setProducts((prev) => [...prev, ...response.data]);
      } else {
        setProducts(response.data);
      }
      setHasMore(pageNum < response.pagination.totalPages);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // Initial load
  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(page + 1, true);
    }
  };

  const refresh = () => fetchProducts(1, false);

  return { products, loading, error, hasMore, loadMore, refresh };
};

// Hook specifically for the Home Screen "Trending" section
export const useTrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await getTrendingProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch trending:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return { products, loading };
};

// Hook specifically for the "Campus Drops" section
export const useCampusDrops = () => {
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const response = await getCampusDrops();
        setDrops(response.data);
      } catch (error) {
        console.error('Failed to fetch drops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrops();
  }, []);

  return { drops, loading };
};

// Hook for Search functionality
export const useSearchProducts = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const response = await searchProducts(query);
        setResults(response.data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  return { results, loading };
};
