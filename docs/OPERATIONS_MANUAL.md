# 📋 Bestiez Internal Operations Manual

This document outlines the standard operating procedures (SOPs) for the Bestiez operations team.

## 1. Vendor Onboarding & Sourcing
We do not buy bulk. We use a **Managed Multi-Vendor Marketplace** model.
1. **Sourcing:** We identify factories on **1688.com** or Alibaba that support "一件代发" (Single-piece dropshipping).
2. **Onboarding:** We give the factory a login to the Bestiez Vendor Portal.
3. **Quality Gate:** Every product uploaded by the factory goes to the Admin "Quality Gate". The Ops team must verify images, descriptions, and pricing before it goes live on the student app.

## 2. Order Fulfillment Workflow (The "First-Mile" Problem)
When a student places an order, the following happens:
1. **Order Split:** The system notifies the respective factories.
2. **Domestic Shipping:** Factories ship individual items via cheap domestic Chinese couriers (ZTO, YTO) to our **Consolidation Hub** in Guangzhou/Yiwu.
3. **Hub QC & Repacking:** Our sourcing agent receives the items, performs a 30-second physical QC check, removes Chinese invoices, and repacks them into a single **Bestiez Branded Box**.
4. **International Freight:** The consolidated box is handed to **SPEEDAF** for air freight to Lagos.

## 3. Campus Logistics & Last-Mile
1. **Arrival:** SPEEDAF clears customs and delivers the bulk consolidated boxes to our designated **Campus Pickup Hubs** (e.g., UNILAG Faculty of Engineering Hub).
2. **Notification:** The student receives a push notification: *"Your drip has arrived at the UNILAG Hub!"*
3. **Pickup:** The student shows their order QR code to our Campus Ambassador and collects their package.

## 4. Campus Ambassador Program
Ambassadors are the face of Bestiez on campus.
- **Recruitment:** We target highly social students (Societal Presidents, Influencers).
- **Compensation:** They earn a **5% lifetime commission** on any order placed using their unique referral code.
- **Marketing:** We provide them with physical posters, stickers, and exclusive "Flash Drop" codes to share on WhatsApp class groups.

## 5. Financials & Payouts
- **Customer Payment:** Collected via Paystack (Cards, Transfers, USSD).
- **Escrow:** Funds are held in the Bestiez Paystack balance until the order is marked "Delivered".
- **Vendor Payout:** We take a **15% platform commission**. The remaining 85% is automatically batched and sent to the vendor's Alipay/WeChat Pay every Friday (T+14 cycle to account for returns).
