#!/bin/bash
# ==========================================
# BESTIEZ PRODUCTION BUILD SCRIPT
# Run this script to lint, test, and build all apps for production.
# Usage: chmod +x scripts/production-build.sh && ./scripts/production-build.sh
# ==========================================

echo " Starting Bestiez Production Build..."

# 1. Backend Linting & Testing
echo "🔍 Linting and Testing Backend..."
cd backend
npm run lint
npm run test
if [ $? -ne 0 ]; then
  echo "❌ Backend tests failed. Aborting build."
  exit 1
fi
cd ..

# 2. Build Web Portals
echo "️ Building Vendor Portal..."
cd vendor-portal
npm run build
cd ..

echo "🏗️ Building Admin Dashboard..."
cd admin-dashboard
npm run build
cd ..

# 3. Mobile App Production Build (Expo EAS)
echo "📱 Triggering Expo EAS Mobile Build..."
cd mobile-app
# Ensure you are logged in: eas login
# Build for both platforms
eas build --profile production --platform all
cd ..

echo "✅ Bestiez Production Build Complete!"
echo " Check your Expo dashboard for mobile build status."
echo "👉 Web portals are ready in their respective /build directories."
