# Bestiez Codebase Audit Report

**Date:** August 2026
**Scope:** Full audit of the 197-file monorepo extracted from the original build conversation, covering `backend`, `mobile-app`, `vendor-portal`, `admin-dashboard`, `wechat-vendor`, and `database`.

This document lists every issue found, what was fixed, what was newly created, and what's intentionally left as a follow-up. Every fix is also marked inline in the code with a `// FIX:` or `<!-- FIX: -->` comment so it's easy to find later.

---

## 1. Critical bugs (would break the app in production)

| # | Issue | File(s) | Fix |
|---|---|---|---|
| 1 | **Vendor & WeChat-vendor login was completely broken.** JWTs never carried a role, and `protect` middleware always looked the token's `id` up in the `User` collection — but vendors live in a separate `Vendor` collection with their own ID space. Every vendor/WeChat request would 401. | `utils/generateToken.js`, `middleware/auth.js`, `controllers/authController.js`, `controllers/vendorController.js` | Token now embeds `role`; `protect` branches on it and queries the right collection; `vendorProtect`/`adminProtect` simplified to check `req.userRole` instead of re-querying. |
| 2 | **Vendor passwords stored in plaintext.** `Vendor` model had no pre-save hashing hook (unlike `User`), so `bcrypt.compare()` in `loginVendor` could never succeed. | `models/Vendor.js` | Added the same bcrypt pre-save hook + `comparePassword` method that `User.js` already had. |
| 3 | `dataSanitizer.js` **defined its sanitize middleware, then discarded it** in the final `module.exports`. | `utils/dataSanitizer.js` | Fixed the export to include `sanitizeRequest`. |
| 4 | `cronJobs.js` **referenced an undefined variable in `module.exports`**, which throws immediately on `require()`. | `jobs/cronJobs.js` | Wrapped the scheduling logic in an `initCronJobs()` function with a correct export; called explicitly from `server.js` after the DB connects. |
| 5 | Two models were `require()`'d but **never created**: `models/SystemEvent.js` (used by `analyticsTracker.js`) and `models/DailyMetric.js` (used by `analyticsAggregator.js`). Importing either file would crash. | `middleware/analyticsTracker.js`, `jobs/analyticsAggregator.js` | Created both models. |
| 6 | `server.js` **never wired in** the rate limiter, custom security headers, CORS allow-list, request sanitizer, real error handler, WebSocket service, or cron/analytics jobs — all of these existed as standalone files but had zero effect on the running app. It used bare `helmet()`, permissive default `cors()`, and an inline 500 handler instead. | `server.js` | Rewritten to import and use every one of these modules; switched to `http.createServer` so Socket.IO can attach. |
| 7 | **Missing Expo entry point.** `mobile-app` had no `App.js` at all — `expo start` would fail immediately since `package.json`'s `main` points at Expo's `AppEntry.js`, which loads `App.js` by convention. | `mobile-app/App.js` | Created, wiring `AuthProvider`, `CartProvider`, `ErrorBoundary`, `CustomSplashScreen`, `OfflineBanner`, and `AppNavigator` together — all of which existed but were never assembled. |
| 8 | **`admin-dashboard/package.json` did not exist.** `npm install`/`docker build` would fail on step one. | `admin-dashboard/package.json` | Created, based on the actual imports used across `admin-dashboard/src` (`react`, `axios`, `zustand`). |
| 9 | **`vendor-portal` and `admin-dashboard` were both missing `public/index.html` and `src/index.js`.** Create-React-App (`react-scripts`) requires both to build or run. | both apps | Created for each. |
| 10 | Three screens used React Native components **without importing them** — a guaranteed runtime crash the moment that screen renders: `TouchableOpacity` in `PaymentScreen.js` and `ProductListScreen.js`; `Alert` in `CampusSelectorScreen.js`. | mobile-app screens | Added the missing named imports. |
| 11 | **Entire "wallet" feature existed on the frontend with nothing behind it.** `walletService.js` called `GET /wallet/balance`, `GET /wallet/transactions`, `POST /wallet/fund`, `POST /wallet/withdraw` — none of which existed on the backend. | backend | Created `models/WalletTransaction.js`, `controllers/walletController.js`, `routes/wallet.js`; added `walletBalance` to `User`; mounted at `/api/wallet`; wired Paystack webhook to credit wallet-funding transactions server-side. |
| 12 | `paymentService.js` called `POST /payments/initialize` and `POST /payments/verify` — **generic, order-agnostic endpoints that never existed** (only the order-specific flow in `orderController.js` did). | backend | Added both to `paymentController.js`, mounted in `routes/payments.js`. |
| 13 | **`Review` model existed with no controller or routes at all** — completely unreachable from the API. The mobile `ReviewsScreen.js` renders hardcoded `MOCK_REVIEWS` as a result. | backend | Created `controllers/reviewController.js`, nested under `GET/POST /api/products/:productId/reviews`. |
| 14 | WeChat vendor mini-program called `POST /vendors/wechat-login`, which **did not exist**. | `controllers/vendorController.js`, `routes/vendors.js` | Added `wechatLogin` (exchanges WeChat's `code` for an openid via `jscode2session`, looks up the linked vendor). Added a `wechatOpenId` field to the `Vendor` model. |
| 15 | WeChat vendor mini-program's `updateOrderStatus()` called `PUT /vendors/orders/:id` — **no matching route existed**, and it also sent a human-readable status string (`'Shipped to Hub'`) that doesn't match the backend's `snake_case` enum. | `controllers/vendorController.js`, `routes/vendors.js`, `wechat-vendor/utils/api.js`, `wechat-vendor/pages/orders/orders.vue` | Added `PUT /vendors/orders/:id/status` + `updateOrderItemStatus` controller; fixed the frontend call site and status value. |
| 16 | `admin-dashboard`'s `adminService.js` called `GET /admin/vendors`, which **did not exist**. | `controllers/adminController.js`, `routes/admin.js` | Added `getAllVendors`. |
| 17 | `usePushNotifications()` calls `useNavigation()`, which only works inside `NavigationContainer` — but nothing in the app called the hook at all, and `App.js` (which wraps `NavigationContainer`) is the wrong place for it. | `mobile-app/src/navigation/TabNavigator.js` | Hook is now called inside `TabNavigator` (only rendered once a user is authenticated), and `PUT /auth/push-token` was added on the backend to receive the token. |
| 18 | `wechat-vendor/pages.json` referenced `pages/products/products` and `pages/profile/profile` — **neither file existed**, so those tabs would fail to load. The `privacy` page existed on disk but was **never registered** in `pages.json`, so it was unreachable via `<navigator>`. | `wechat-vendor/pages/` | Created both missing pages; registered `privacy` in `pages.json`. |

## 2. Dependency / configuration gaps

- `backend/package.json` was missing **five packages actually required by the code**: `express-rate-limit`, `node-cron`, `socket.io`, `expo-server-sdk`, `nodemailer`. Added all five.
- Root `.env.example` was missing variables the code reads directly: `ENCRYPTION_KEY`, `CLIENT_URL`/`VENDOR_URL`/`ADMIN_URL` (used by `config/cors.js`), `WECHAT_APPID`/`WECHAT_SECRET`, and the full `EMAIL_HOST`/`EMAIL_PORT`/`EMAIL_USER` set (`sendEmail.js` reads these individually, not just `EMAIL_SERVICE`). All added with inline comments.

## 3. Known limitations / recommended follow-ups

These were **not** fixed, either because they're genuine product decisions rather than bugs, or because fixing them properly requires infrastructure decisions beyond what's in the codebase:

- **Wallet withdrawals are recorded as `pending` and require manual confirmation** rather than an automated bank payout. Wiring this to Paystack's [Transfers API](https://paystack.com/docs/transfers/) requires a funded Paystack "Transfer" balance and business-side KYC that's outside this codebase's scope — see the note in `walletController.js`.
- **Several admin-dashboard components (`AuditLogs`, `Financials`, `CampusHub`, `Notifications`, `OrderTracker`, `QualityGate`, `Settings`, `VendorManager`) still render local/mock state** rather than calling the backend, beyond the two endpoints (`getAllVendors`, dashboard) that were already wired up. Wiring every admin screen to a live endpoint (several of which — e.g. audit logs, notifications — have no backing model yet either) is a substantial follow-up project, not a bug fix, and is flagged here so it isn't mistaken for "done."
- **`mobile-app/src/screens/cart/PaymentScreen.js` still simulates payment success with a `setTimeout`** rather than calling `paymentService.initializePayment/verifyPayment` or rendering the existing (unused) `PaystackWebView.js` component. The backend side of this flow is now real (see item 12 above); connecting the screen to it is a UI task, not a backend bug.
- `middleware/analyticsTracker.js`'s `trackServerEvent()` is available but **not yet attached to any route** — it's an opt-in middleware, exactly as its own inline comment describes (`router.post('/orders/verify-payment', trackServerEvent('PAYMENT_VERIFIED'), ...)`). Attaching it to specific routes is a product decision about which events matter, not a fix.
- Real assets (app icon, splash image, adaptive icon, fonts) are still placeholders per the `README.md` files left in `mobile-app/src/assets/`.

---

*Every change above is also marked with an inline `// FIX:` (or `<!-- FIX: -->` in `.vue` files) comment at the change site, explaining what was wrong and why the fix works.*
