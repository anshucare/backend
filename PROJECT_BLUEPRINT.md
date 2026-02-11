# Anshu Care - Project Blueprint & AI Regeneration Guide

**Project Name:** Anshu Care E-Commerce Platform
**Version:** 1.0.0
**Date:** October 2026
**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Node.js, Express, MongoDB

---

## 1. Project Overview
Anshu Care is a complete e-commerce solution for ayurvedic/wellness products. It features a customer-facing storefront, a secure admin dashboard, and a RESTful API backend. The system is designed for modular deployment (Frontend on Netlify, Backend on Render).

---

## 2. Architecture & Deployment
*   **Frontend (`/frontend`)**: Static HTML/JS app hosting the customer shopping experience. Connects to Backend via API.
*   **Admin Panel (`/admin-panel`)**: Separate dashboard for business owners to manage inventory, orders, and site appearance. Connects to Backend via API.
*   **Backend (`/backend`)**: Node.js/Express server providing REST API endpoints and connecting to MongoDB Atlas.

---

## 3. File Structure
```
anshu-care/
├── frontend/                  # Public Website
│   ├── index.html             # Home Page
│   ├── products.html          # Shop Page (Dynamic Loading)
│   ├── product-detail.html    # Product View
│   ├── cart.html / checkout.html
│   ├── style.css              # Global Styles
│   ├── main.js                # Frontend Logic (Cart, API calls)
│   └── assets/                # Images/Icons
│
├── admin-panel/               # Admin Dashboard
│   ├── admin.html             # Main Dashboard (SPA)
│   ├── admin-signin.html      # Login Page
│   ├── admin.js               # Admin Logic (CRUD, Auth)
│   ├── db.js                  # Database Config
│   └── style.css              # Shared Styles
│
└── backend/                   # API Server
    ├── server.js              # Main Entry Point & Routes
    ├── package.json           # Dependencies
    └── .env                   # Environment Variables (MONGO_URI)
```

---

## 4. Database Schema (MongoDB)

**Product Schema:**
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String, // e.g., 'hair-care'
  image: String,    // URL or Base64
  stock: Number
}
```

**Order Schema:**
```javascript
{
  user: String,
  email: String,
  items: [
    { product: ObjectId, quantity: Number, price: Number }
  ],
  total: Number,
  status: String, // 'pending', 'shipped'
  address: String
}
```

---

## 5. Key Features & Logic

### A. Frontend (`main.js`)
*   **Dynamic Rendering**: Fetches products from API and renders HTML grids.
*   **Cart System**: Uses `localStorage` to persist cart items. Updates API on checkout.
*   **Theme Engine**: Reads CSS variables from API/Storage to apply brand colors dynamically.

### B. Admin Panel (`admin.js`)
*   **Authentication**: Simple token-based or hardcoded check (upgradable).
*   **Product CRUD**: Forms to Add/Edit/Delete products. Images converted to Base64 (up to 50MB).
*   **Order Management**: View all orders, update status (Pending -> Shipped).
*   **Appearance Editor**: Live color pickers update `style.css` variables.

### C. Backend API (`server.js`)
*   `GET /api/products`: List all products.
*   `POST /api/products`: Create new product.
*   `POST /api/orders`: Place new order.
*   `GET /api/orders`: List orders (Admin only).

---

## 6. AI Regeneration Prompt
*To recreate this project using an AI agent, copy and paste the following prompt:*

> "Create a full-stack e-commerce application called 'Anshu Care'.
>
> **Requirements:**
> 1.  **Frontend:** Create an `index.html` with a modern, green/gold ayurvedic theme. Include a Product Listing page that fetches data from an API. Implement a Shopping Cart using LocalStorage.
> 2.  **Admin Panel:** Create a separate `admin.html` dashboard. Include sections for 'Products', 'Orders', and 'Appearance'. Allow admins to upload images (Base64) and change the site's primary colors.
> 3.  **Backend:** Build a Node.js Express server with Mongoose. Create schemas for 'Product' and 'Order'. Expose REST endpoints (`GET/POST /products`, `POST /orders`).
> 4.  **Deployment:** Structure the folders into `frontend` and `backend` so they can be deployed to Netlify and Render respectively.
>
> **Design Style:** Clean, minimal, using 'Inter' font. Colors: Deep Green (#1a3a32) and Gold (#b48c48)."

---

## 7. Setup Instructions
1.  **Install Node.js**.
2.  **Backend:** Run `npm install` inside `/backend`. Create `.env` with `MONGO_URI`. Run `npm start`.
3.  **Frontend:** Update `api.js` (or config) to point to your backend URL. Open `index.html` in browser.
