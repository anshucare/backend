# Anshu Care Final Deployment Structure

Great job! Your project is now organized into two main folders for simple deployment.

## Folder Structure
1.  **`frontend/`**: Contains the main website (customer facing) AND the admin panel (hidden at `/admin`).
2.  **`backend/`**: Contains the API server.

---

## 🚀 Step 1: Deploy Backend (Render + MongoDB)

1.  **Create a GitHub Repository** named `anshu-care-backend`.
2.  Upload the contents of the `backend` folder.
3.  **Deploy on Render**:
    *   Connect your `anshu-care-backend` repo.
    *   Set `MONGO_URI` environment variable (from MongoDB Atlas).
    *   Copy the backend URL (e.g., `https://anshu-backend.onrender.com`).

---

## 🚀 Step 2: Configure Frontend API

1.  **Open two files**:
    *   `frontend/db.js`
    *   `frontend/admin/db.js`
2.  **Update Config**:
    *   Change `const APP_MODE = 'LOCAL';` to `'API'`.
    *   Change `const API_BASE_URL = "..."` to your Render Backend URL.

---

## 🚀 Step 3: Deploy Frontend (Netlify)

1.  **Create a GitHub Repository** named `anshu-care-frontend`.
2.  Upload the contents of the `frontend` folder.
3.  **Deploy on Netlify**:
    *   Connect your `anshu-care-frontend` repo.
    *   Deploy!
    *   Your site will be live at `https://anshu-care.netlify.app`.
    *   Your Admin Panel will be at `https://anshu-care.netlify.app/admin`.

---

## Local Testing
1.  **Backend**: `cd backend` -> `npm install` -> `npm start`.
2.  **Frontend**: Open `frontend/index.html` in browser.
3.  **Admin**: Open `frontend/admin/index.html` in browser.
