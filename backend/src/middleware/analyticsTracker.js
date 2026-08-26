// Server-side analytics middleware.
// Tracks high-value backend events that the mobile app might miss 
// (e.g., background order status changes, vendor payouts, webhook verifications).

const SystemEvent = require('../models/SystemEvent'); // Assuming a model for raw server events

exports.trackServerEvent = (eventType) => {
  return async (req, res, next) => {
    // We override res.json to capture the response and log the event AFTER the request succeeds
    const originalJson = res.json;
    
    res.json = function (data) {
      // Only track if the request was successful (2xx)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        
        // Fire and forget: Log to database for aggregation
        SystemEvent.create({
          eventType,
          userId: req.user?._id || null,
          vendorId: req.user?.companyName ? req.user._id : null,
          metadata: {
            path: req.originalUrl,
            method: req.method,
            orderId: data?.data?.orderNumber || null,
            amount: data?.data?.pricing?.total || null,
          },
          timestamp: new Date(),
        }).catch(err => console.error('Analytics Log Error:', err));
        
        // Optional: Send to external service like Mixpanel/Segment here via API
      }
      
      // Call the original res.json to send the response to the client
      return originalJson.call(this, data);
    };
    
    next();
  };
};

// Usage in routes:
// router.post('/orders/verify-payment', trackServerEvent('PAYMENT_VERIFIED'), verifyOrderPayment);
