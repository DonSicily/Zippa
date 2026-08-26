# 🎓 Bestiez - Campus Marketplace Monorepo

**Direct Factory-to-Student Marketplace for Nigerian Universities.**
Bestiez bridges the gap between top Chinese factories and 2.5 million university/polytechnic students in Nigeria, offering curated, high-quality goods at factory-direct prices.

## 🏗️ Architecture & Tech Stack

This is a **Monorepo** containing four distinct applications:

1. **`/backend`**: Node.js/Express REST API (The Brain)
2. **`/mobile-app`**: React Native (Expo) Student App (The Gen-Z Storefront)
3. **`/vendor-portal`**: React.js Web App for Chinese Factories (The Supply Side)
4. **`/admin-dashboard`**: React.js Super Admin Panel (God Mode)
5. **`/database`**: MongoDB Migrations and Seed Scripts

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB (Local or Atlas)
- Docker & Docker Compose (Optional, for containerized setup)

### 1. Environment Setup
Copy the root `.env.example` to `/backend/.env` and fill in your credentials (Paystack, Cloudinary, SPEEDAF, etc.).

### 2. Install Dependencies
