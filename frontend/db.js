// DATABASE CONFIGURATION
const APP_MODE = 'API'; // Change to 'API' for production
const API_BASE_URL = "https://backend-jwra.onrender.com/api"; // Pointing to Render backend

const DB = {
    // READ Data (List)
    async get(collection) {
        if (APP_MODE === 'API') {
            try {
                // Map collection names to API endpoints if needed
                // e.g., 'products' -> '/products'
                const res = await fetch(`${API_BASE_URL}/${collection}`);
                return await res.json();
            } catch (err) {
                console.error("API Error:", err);
                return [];
            }
        } else {
            // Local Storage Fallback
            return JSON.parse(localStorage.getItem(`anshu-care-${collection}`)) || [];
        }
    },

    // ADD Item (Create)
    async add(collection, item) {
        if (APP_MODE === 'API') {
            try {
                const res = await fetch(`${API_BASE_URL}/${collection}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
                return await res.json();
            } catch (err) {
                console.error("API Error:", err);
                return null;
            }
        } else {
            // Local Storage Logic
            const current = await this.get(collection);
            // Assign ID if missing
            if (!item.id) item.id = Date.now().toString();
            current.push(item);
            localStorage.setItem(`anshu-care-${collection}`, JSON.stringify(current));
            return item;
        }
    },

    // UPDATE Item
    async update(collection, id, updates) {
        if (APP_MODE === 'API') {
            try {
                const res = await fetch(`${API_BASE_URL}/${collection}/${id}`, {
                    method: 'PUT', // or PATCH
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                return await res.json();
            } catch (err) {
                console.error("API Error:", err);
                return null;
            }
        } else {
            // Local Storage Logic
            const current = await this.get(collection);
            const index = current.findIndex(i => i.id == id);
            if (index !== -1) {
                current[index] = { ...current[index], ...updates };
                localStorage.setItem(`anshu-care-${collection}`, JSON.stringify(current));
                return current[index];
            }
            return null;
        }
    },

    // PARTIAL UPDATE (PATCH)
    async patch(collection, id, updates) {
        if (APP_MODE === 'API') {
            try {
                const res = await fetch(`${API_BASE_URL}/${collection}/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                return await res.json();
            } catch (err) {
                console.error("API Error:", err);
                return null;
            }
        } else {
            const current = await this.get(collection);
            const index = current.findIndex(i => i.id == id);
            if (index !== -1) {
                current[index] = { ...current[index], ...updates };
                localStorage.setItem(`anshu-care-${collection}`, JSON.stringify(current));
                return current[index];
            }
            return null;
        }
    },

    // DELETE Item
    async remove(collection, id) {
        if (APP_MODE === 'API') {
            try {
                await fetch(`${API_BASE_URL}/${collection}/${id}`, { method: 'DELETE' });
                return true;
            } catch (err) {
                console.error("API Error:", err);
                return false;
            }
        } else {
            const current = await this.get(collection);
            const filtered = current.filter(i => i.id != id);
            localStorage.setItem(`anshu-care-${collection}`, JSON.stringify(filtered));
            return true;
        }
    },

    // Auth Logic
    async login(email, password) {
        // Local simulation
        const stored = JSON.parse(localStorage.getItem('anshu-care-admin-creds')) || { id: 'admin', key: 'anshu2026' };
        if (email === stored.id && password === stored.key) return { user: { email } };
        throw new Error("Invalid credentials");
    }
};
