// Real-time communication using Socket.io.
// Allows instant updates without the client having to refresh or poll the API.

const { Server } = require('socket.io');

let io;

const initWebSockets = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 New WebSocket connection: ${socket.id}`);

    // Join specific rooms based on user role
    socket.on('join_room', (data) => {
      if (data.userId) socket.join(`user_${data.userId}`);
      if (data.vendorId) socket.join(`vendor_${data.vendorId}`);
      if (data.admin) socket.join('admin_room');
    });

    socket.on('disconnect', () => {
      console.log(`❌ WebSocket disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Helper functions to emit events from controllers
const emitOrderUpdate = (userId, orderData) => {
  if (io) io.to(`user_${userId}`).emit('order_status_changed', orderData);
};

const emitNewOrderToVendor = (vendorId, orderData) => {
  if (io) io.to(`vendor_${vendorId}`).emit('new_order_received', orderData);
};

const emitAdminAlert = (alertData) => {
  if (io) io.to('admin_room').emit('admin_alert', alertData);
};

module.exports = { initWebSockets, emitOrderUpdate, emitNewOrderToVendor, emitAdminAlert };
