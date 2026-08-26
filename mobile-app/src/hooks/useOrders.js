import { useState, useEffect, useCallback } from 'react';
import { getMyOrders, getOrderById, cancelOrder } from '../services/orderService';

// Hook to fetch the current user's order history
export const useMyOrders = (statusFilter = null) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await getMyOrders(params);
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const refresh = () => fetchOrders();

  return { orders, loading, error, refresh };
};

// Hook to fetch details of a single order (for tracking screen)
export const useOrderDetails = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchDetails = async () => {
      try {
        const response = await getOrderById(orderId);
        setOrder(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [orderId]);

  return { order, loading, error };
};

// Hook to handle order cancellation
export const useCancelOrder = () => {
  const [loading, setLoading] = useState(false);

  const cancel = async (orderId, reason) => {
    setLoading(true);
    try {
      const response = await cancelOrder(orderId, reason);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { cancel, loading };
};
