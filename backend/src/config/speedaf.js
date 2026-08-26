const axios = require('axios');

const SPEEDAF_BASE_URL = process.env.SPEEDAF_BASE_URL || 'https://api.speedaf.com/v1';

const speedafApi = axios.create({
  baseURL: SPEEDAF_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.SPEEDAF_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Create shipment
const createShipment = async (shipmentData) => {
  try {
    const response = await speedafApi.post('/shipments', shipmentData);
    return response.data;
  } catch (error) {
    console.error('SPEEDAF create shipment error:', error.response?.data || error.message);
    throw error;
  }
};

// Track shipment
const trackShipment = async (trackingNumber) => {
  try {
    const response = await speedafApi.get(`/shipments/track/${trackingNumber}`);
    return response.data;
  } catch (error) {
    console.error('SPEEDAF tracking error:', error.response?.data || error.message);
    throw error;
  }
};

// Get shipping rates
const getShippingRates = async (origin, destination, weight) => {
  try {
    const response = await speedafApi.post('/rates', {
      origin,
      destination,
      weight,
    });
    return response.data;
  } catch (error) {
    console.error('SPEEDAF rates error:', error);
    throw error;
  }
};

// Cancel shipment
const cancelShipment = async (shipmentId) => {
  try {
    const response = await speedafApi.delete(`/shipments/${shipmentId}`);
    return response.data;
  } catch (error) {
    console.error('SPEEDAF cancellation error:', error);
    throw error;
  }
};

module.exports = {
  createShipment,
  trackShipment,
  getShippingRates,
  cancelShipment,
};
