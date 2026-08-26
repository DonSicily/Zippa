# ️ Bestiez Backend API

The central REST API powering the Bestiez ecosystem. Built with Node.js, Express, and MongoDB (Mongoose).

## 📁 Folder Structure
- `src/config/`: External service configurations (Cloudinary, Paystack, SPEEDAF, DB).
- `src/models/`: Mongoose schemas (User, Vendor, Product, Order, Campus, Ambassador).
- `src/controllers/`: Business logic for each domain.
- `src/routes/`: Express route definitions mapping to controllers.
- `src/middleware/`: Auth (JWT), file uploads (Multer), validation, and error handling.
- `src/utils/`: Helper functions (Token generation, Shipping calculations, QC checks).

## 🔑 Authentication & Roles
The API uses JWT (JSON Web Tokens). There are three distinct roles:
1. **Student (`role: 'student'`)**: Can browse, order, and review.
2. **Vendor (`role: 'vendor'`)**: Can manage their own products, view their orders, and track payouts.
3. **Admin (`role: 'admin'`)**: Full access to approve products/vendors, process payouts, and view global analytics.

*Note: Vendor and Admin routes are protected by specific middleware (`vendorProtect`, `adminProtect`).*

## 🧪 Testing
Run the test suite using Jest:
