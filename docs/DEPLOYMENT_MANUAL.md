# Bestiez — Deployment Manual

This is the single reference for taking every piece of the Bestiez monorepo from a laptop to production. It assumes the stack described in `README.md`: **Railway** for hosting the backend + web apps, **Cloudflare** for DNS, **MongoDB Atlas** for the database, **Paystack** for payments, **Cloudinary** for images, **SPEEDAF** for logistics, and **Expo/EAS** for the mobile app.

> See `docs/CODEBASE_AUDIT.md` first if you're picking this project back up — it documents every bug that was found and fixed, and what's intentionally left as a follow-up.

---

## 0. Prerequisites

- Node.js 18.x and npm
- A MongoDB Atlas cluster (or self-hosted MongoDB 6+)
- Accounts/API keys for: Paystack, Cloudinary, SPEEDAF, an SMTP provider (SendGrid recommended), Railway, Cloudflare
- For the mobile app: an Expo account + `eas-cli` (`npm i -g eas-cli`)
- For the WeChat mini-program: a registered WeChat Official/Mini-Program account (see §6)

Copy the root `.env.example` to `backend/.env` and fill in every value — it's the single source of truth for which secrets the backend needs. Double-check these five, since they were previously undocumented gaps:

```
ENCRYPTION_KEY=      # openssl rand -hex 32
CLIENT_URL=          # your mobile app's dev/prod origin, used by CORS
VENDOR_URL=          # vendor-portal's deployed URL
ADMIN_URL=           # admin-dashboard's deployed URL
WECHAT_APPID=        # only needed if you're shipping the WeChat vendor mini-program
WECHAT_SECRET=
```

---

## 1. Backend (Node/Express API)

```bash
cd backend
npm install
npm run dev     # local dev, nodemon
```

**Before deploying, run a smoke test locally:**
```bash
npm run dev
curl http://localhost:5000/health
# → {"status":"OK","message":"Bestiez API is running"}
```

### Deploy to Railway
1. Create a new Railway project, link the `backend/` directory (or the repo root with `railway.json`'s root set to `backend`).
2. Add every variable from `backend/.env` into Railway's environment variables UI.
3. Railway will use `backend/Dockerfile` automatically. It exposes the port from `process.env.PORT` — Railway sets this for you.
4. Once deployed, hit `https://<your-railway-domain>/health` to confirm.
5. In Cloudflare, add a CNAME (or use Railway's provided domain) for `api.bestiez.com` → your Railway service.

### What's now running that wasn't before
The rewritten `server.js` wires up things that existed in the codebase but were previously inert — you'll see this in the logs on boot:
```
✅ MongoDB Connected
⏰ Cron jobs initialized (auto-cancel, payouts, daily summary)
🔌 New WebSocket connection: ...   (once a client connects)
```
Rate limiting, strict CORS (only `CLIENT_URL`/`VENDOR_URL`/`ADMIN_URL` + the two production domains are allowed), and request sanitization are active on every request — if something that used to work locally now gets blocked, check that its origin is in `config/cors.js`'s `allowedOrigins` list.

### Database migrations & seed data
```bash
npm run db:setup     # from the repo root — runs all 5 migrations then seeds sample data
```

---

## 2. Vendor Portal (React, served via Nginx)

```bash
cd vendor-portal
npm install
npm start        # local dev on :3000
npm run build    # production build
```

`public/index.html` and `src/index.js` (the CRA entry point) did not exist in the original extraction — they're now in place, so `npm start`/`npm run build` work out of the box.

### Deploy
Build with the included multi-stage `Dockerfile` (React build → Nginx serve):
```bash
docker build -t bestiez-vendor-portal .
```
Deploy the resulting image to Railway (or any container host) with `REACT_APP_API_URL` set to your backend's public URL at build time (CRA inlines env vars at build, not runtime — set it before `npm run build` / as a Railway build-arg). Point `vendor.bestiez.com` at it via Cloudflare.

---

## 3. Admin Dashboard (React, served via Nginx)

Same pattern as the Vendor Portal. **Note:** `admin-dashboard/package.json` did not exist in the original extraction and has been created — run `npm install` fresh here even if you previously tried to install and it failed.

```bash
cd admin-dashboard
npm install
npm start
```

Deploy identically to the Vendor Portal, pointing `admin.bestiez.com` at it. Because `config/cors.js` on the backend only allows the exact `ADMIN_URL` you configure, set that env var on the backend to this app's real production URL before going live.

---

## 4. Mobile App (React Native / Expo)

```bash
cd mobile-app
npm install
npx expo start
```

`App.js` — the actual Expo entry point — did not exist in the original extraction and has been created. If you'd tried `expo start` before, it would have failed immediately with no App component found; that's now fixed.

### Build for app stores (EAS)
```bash
eas login
eas build:configure          # links to your EAS project — update the placeholder
                              # projectId in app.config.js's extra.eas.projectId first
eas build --profile staging      # internal testing
eas build --profile production   # store submission
```

Set `API_URL` and `PAYSTACK_PUBLIC_KEY` as EAS secrets (`eas secret:create`) rather than committing them — `app.config.js` reads them from `process.env` at build time.

### Known UI gap
`screens/cart/PaymentScreen.js` currently simulates a successful payment with a timer rather than calling the (now-real) `/payments/initialize` and `/payments/verify` endpoints or the existing `PaystackWebView` component. The backend is ready for this; wiring the screen up is a short follow-up (see `docs/CODEBASE_AUDIT.md` §3).

---

## 5. Database (MongoDB Atlas)

1. Create a cluster, add a database user, and whitelist Railway's outbound IPs (or `0.0.0.0/0` if you're comfortable relying on the connection string's credentials alone).
2. Set `MONGODB_URI` in the backend's environment to the Atlas connection string.
3. Run migrations/seed as in §1.

---

## 6. WeChat Vendor Mini-Program

This is for onboarding vendors based in China who prefer WeChat over the web-based Vendor Portal.

1. Register a WeChat Mini-Program account (the full step-by-step registration walkthrough from the original build conversation is preserved separately if you need it — search your records for "WeChat Account Registration Guide").
2. Once approved, get your **AppID** and **AppSecret** from `mp.weixin.qq.com` → 开发 → 开发管理 → 开发设置.
3. Set `WECHAT_APPID` and `WECHAT_SECRET` on the **backend** (these are used server-side by `vendorController.wechatLogin` to call WeChat's `jscode2session` API — never expose the secret to the client).
4. In `wechat-vendor/utils/api.js`, update `BASE_URL` to your production API domain.
5. Build and upload via WeChat DevTools, pointing it at the `wechat-vendor/` directory (it's a `uni-app` / Vue 3 project — `npm install` first).
6. **Linking existing vendors:** a vendor's first login must still be email/password through the Vendor Portal (or a linking screen you build) so their `wechatOpenId` gets attached to their existing `Vendor` document — `wechatLogin` alone can't create new vendor accounts, by design, to avoid unverified WeChat accounts bypassing the approval flow.
7. Submit for Tencent review — the privacy policy page (`pages/privacy/privacy.vue`) is now correctly registered in `pages.json` and linked from the Profile tab, which reviewers check for.

---

## 7. Post-deploy checklist

- [ ] `GET /health` returns 200 on the production backend URL
- [ ] Student registration → login → browse products → checkout flow works end-to-end against production
- [ ] Vendor registration → (admin approves) → vendor login → product upload works
- [ ] Admin dashboard: login, approve a pending product, approve a pending vendor
- [ ] Paystack webhook URL (`https://api.bestiez.com/api/payments/webhook`) is registered in your Paystack dashboard
- [ ] Wallet: fund a test wallet, confirm the webhook credits the balance (check `WalletTransaction` status flips to `completed`)
- [ ] Push notifications: log in on a real device, confirm a `pushToken` gets saved (`PUT /auth/push-token`)
- [ ] CORS: confirm the deployed Vendor Portal and Admin Dashboard domains are reachable (and that `localhost` is *not* still in the allow-list for a production build)
- [ ] Cron logs show the auto-cancel/payout/daily-summary jobs firing on schedule

---

*For what's fixed vs. what's a deliberate follow-up, see `docs/CODEBASE_AUDIT.md`. For day-to-day operations (vendor onboarding, order fulfillment, ambassador program), see `docs/OPERATIONS_MANUAL.md`. For API endpoints, see `docs/API_REFERENCE.md`.*
