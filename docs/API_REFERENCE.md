# 📡 Bestiez API Reference

Base URL: `https://api.bestiez.com/api` (or `http://localhost:5000/api` locally)

## 🔐 Authentication
### `POST /auth/register`
Registers a new student.
- **Body:** `{ firstName, lastName, email, phone, password, campus }`

### `POST /auth/login`
Authenticates a user and returns a JWT.
- **Body:** `{ email, password }`

---

## 📦 Products (Public & Vendor)
### `GET /products`
Fetches approved products with pagination and filtering.
- **Query Params:** `category`, `minPrice`, `maxPrice`, `search`, `page`, `limit`

### `POST /products` *(Vendor Only)*
Uploads a new product. Requires `multipart/form-data` for images.
- **Auth:** Bearer Token (Vendor)

---

## 🛒 Orders (Student)
### `POST /orders`
Creates a new order and initializes a Paystack payment.
- **Body:** `{ items: [{ product, quantity }], shippingAddress, paymentMethod }`
- **Response:** Returns the Paystack `authorization_url` for the client to redirect to.

### `POST /orders/verify-payment`
Verifies the Paystack transaction reference and confirms the order.
- **Body:** `{ reference }`

---

## 🏭 Vendor Management
### `GET /vendors/dashboard`
Returns vendor-specific stats (Revenue, Orders, Payout Balance).

### `GET /vendors/orders`
Fetches orders containing the vendor's products that need fulfillment.

---

## ️ Admin Operations
### `PUT /admin/products/:id/approve`
Approves or rejects a product in the Quality Gate.
- **Body:** `{ action: 'approve' | 'reject', rejectionReason: 'string' }`

### `POST /admin/vendors/:id/payout`
Manually triggers a payout to a vendor.
- **Body:** `{ amount }`
