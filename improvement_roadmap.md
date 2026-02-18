# Campwork – Improvement & Optimization Roadmap

This document outlines strategic and technical improvements to elevate **Campwork** from an MVP to a robust, scalable product.

---

## 🛠 1. Technical Enhancements

### A. Performance & Data Fetching
- [x] **Server-Side Rendering (SSR)**: Transition from purely client-side fetching (`useEffect`) to Next.js Server Components for Job and Product listings. This improves SEO and eliminates initial loading flickers.
- [ ] **SWR/React Query**: Implement a caching layer for client-side data. This will make navigation between categories and search results feel instantaneous.
- [x] **Image Optimization**: Use Cloudinary's dynamic transformations to deliver appropriately sized images based on the user's device, significantly reducing bandwidth.

### B. Type Safety & Architecture
- [x] **Stricter Types**: Move away from `any` in components (e.g., `currentUser` in `MessagesContent`).
- [x] **Zod Validation**: Implement `zod` for form validation in "Create Job" and "Sell Item" flows to prevent malformed data from reaching Supabase.
- [x] **Centralized API Layer**: Create a dedicated `services/` directory to abstract Supabase calls, making the frontend logic cleaner and easier to test.

---

## 💬 2. Messaging & Communication (Phase 4 Refinement)

### A. Advanced Chat Features
- **Typing Indicators**: Show when the other participant is typing using Supabase real-time presence.
- **Read Receipts**: Visual indicators (single vs. double checks) to confirm when a message has been seen.
- **Media Sharing**: Allow students to send images (via Cloudinary) directly in the chat to share item conditions or project proofs.

### B. Notifications
- **In-App Alerts**: Live toast notifications using `sonner` or `react-hot-toast` when a new message arrives while the user is on another page.
- **Email Notifications**: Trigger emails via Supabase Edge Functions when a user receives a message while offline.

---

## 🛍 3. Marketplace & Product Features

### A. Discovery & Search
- **Fuzzy Search**: Implement full-text search in Supabase to handle typos or partial matches in job/product titles.
- **Advanced Filters**: Add price range sliders, location-based sorting, and "Recently Viewed" history.

### B. Trust & Safety
- **Verified University Emails**: Enforce `.edu` or specific university email domains during signup to ensure a closed community.
- **Report System**: Add a "Flag" button on jobs/products to allow the community to moderate suspicious listings.
- **Escrow Logic (Phase 5 Prep)**: Design the DB schema to hold funds in a "pending" state until a student marks a job as "Accepted & Complete."

---

## 🎨 4. Design & UX Refinements

### A. Micro-interactions
- **Skeleton Loaders**: Replace generic "Loading..." text with animated skeleton cards that match the layout of Jobs/Products.
- **Haptic Feedback**: Add subtle CSS/JS transitions for mobile users when interacting with cards.

### B. SEO & Accessibility
- **Dynamic Metadata**: Generate unique page titles and descriptions for every Job and Product for better social sharing (OG tags).
- **Aria Labels**: Ensure all interactive elements (Filter menus, Send buttons) are fully accessible to screen readers.

---

## 📈 5. Monitoring & Analytics
- **Vercel Analytics**: Track page views and user drop-off points in the registration/posting flows.
- **Error Tracking**: Integrate **Sentry** to capture and debug client-side crashes in real-time.

---

**Date**: 2026-02-16  
