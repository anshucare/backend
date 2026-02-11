// --- ADMIN AUTHENTICATION CHECK ---
if (localStorage.getItem('anshu-care-admin') !== 'authenticated') {
    window.location.href = 'admin-signin.html';
}

function logout() {
    localStorage.removeItem('anshu-care-admin');
    window.location.href = 'admin-signin.html';
}

// --- SANCTUARY DATA CONFIG ---
const SANCTUARY_SECTIONS = [
    { id: 'trending', name: 'Trending Collections', description: 'Our most loved and effective solutions.', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80' },
    { id: 'pure-essentials', name: 'Our Pure Essentials', description: 'Botanical extracts in their purest form.', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc' },
    { id: 'holistic-wellness', name: 'Wellness & Rituals', description: 'Experience the magic of Ayurvedic rituals.', image: 'https://images.unsplash.com/photo-1547793549-7038dd59b5cf' }
];

const SANCTUARY_CATEGORIES = [
    { id: 'best-sellers', sectionId: 'trending', name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19' },
    { id: 'body-care', sectionId: 'pure-essentials', name: 'Body Care', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b' },
    { id: 'face-masks', sectionId: 'pure-essentials', name: 'Face Packs & Masks', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c' },
    { id: 'face-oils', sectionId: 'pure-essentials', name: 'Face Oils & Serums', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a' },
    { id: 'hair-oils', sectionId: 'holistic-wellness', name: 'Hair Care Oils', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03' }
];

function seedSanctuary() {
    if (!localStorage.getItem('anshu-care-sections')) localStorage.setItem('anshu-care-sections', JSON.stringify(SANCTUARY_SECTIONS));
    if (!localStorage.getItem('anshu-care-categories')) localStorage.setItem('anshu-care-categories', JSON.stringify(SANCTUARY_CATEGORIES));
}
seedSanctuary();

function getSections() {
    const stored = JSON.parse(localStorage.getItem('anshu-care-sections'));
    return (stored && stored.length > 0) ? stored : SANCTUARY_SECTIONS;
}

function getCategories() {
    const stored = JSON.parse(localStorage.getItem('anshu-care-categories'));
    return (stored && stored.length > 0) ? stored : SANCTUARY_CATEGORIES;
}

// Helper for live preview in modals
function handleModalPreview(input, imgId, containerId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById(imgId);
            img.src = e.target.result;
            document.getElementById(containerId).style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// --- NAVIGATION ---
// Image upload helper
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function switchSection(sectionId, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

    const section = document.getElementById(sectionId);
    if (section) section.classList.add('active');

    if (el && el.classList) {
        el.classList.add('active');
    } else {
        // Find matching nav item if el not provided
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(i => {
            if (i.getAttribute('onclick')?.includes(`'${sectionId}'`)) {
                i.classList.add('active');
            }
        });
    }

    if (sectionId === 'dashboard') loadStats();
    if (sectionId === 'orders') loadAllOrders();
    if (sectionId === 'sections') loadSections();
    if (sectionId === 'products') loadProducts();
    if (sectionId === 'content') loadPageContent();
    if (sectionId === 'blogs') loadBlogs();
    if (sectionId === 'categories') loadCategories();
    if (sectionId === 'users') loadUsers();
    if (sectionId === 'settings') loadSecuritySettings();
    if (sectionId === 'payments') loadPaymentsAudit();
    if (sectionId === 'appearance') loadThemeSettings();
}

function loadPaymentsAudit() {
    const orders = JSON.parse(localStorage.getItem('anshu-care-orders')) || [];
    const auditBody = document.querySelector('#auditTable tbody');
    const auditCards = document.getElementById('auditCards');
    if (!auditBody || !auditCards) return;

    // Financial Analysis
    const months = {};
    let totalRev = 0;

    orders.forEach(o => {
        const date = new Date(o.date);
        const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        if (!months[monthKey]) {
            months[monthKey] = { revenue: 0, count: 0 };
        }
        months[monthKey].revenue += o.total;
        months[monthKey].count += 1;
        totalRev += o.total;
    });

    auditCards.innerHTML = `
        <div class="stat-card"><span>Total Lifetime Revenue</span><h2>₹${totalRev.toLocaleString()}</h2></div>
        <div class="stat-card" style="border-left: 4px solid var(--accent);"><span>Current Month Orders</span><h2>${Object.values(months)[0]?.count || 0}</h2></div>
        <div class="stat-card"><span>Average Order Value</span><h2>₹${orders.length ? Math.round(totalRev / orders.length) : 0}</h2></div>
    `;

    auditBody.innerHTML = Object.entries(months).map(([month, data]) => `
        <tr>
            <td><strong>${month}</strong></td>
            <td>${data.count} Orders</td>
            <td>₹${data.revenue.toLocaleString()}</td>
            <td><span class="status delivered">Verified</span></td>
        </tr>
    `).join('');
}

function loadPaymentSettings() {
    const adminUpiId = localStorage.getItem('anshu-care-upi') || '';
    if (document.getElementById('adminUpiId')) {
        document.getElementById('adminUpiId').value = adminUpiId;
    }
}

function savePaymentSettings() {
    const upiId = document.getElementById('adminUpiId').value.trim();
    if (!upiId) return alert('Please enter a valid UPI ID');

    localStorage.setItem('anshu-care-upi', upiId);

    // Also update contact content for QR purposes if needed, but primarily stored separately
    let content = JSON.parse(localStorage.getItem('anshu-care-content')) || {};
    if (!content.contact) content.contact = {};
    // content.contact.upi = upiId; // If we wanted to sync them
    localStorage.setItem('anshu-care-content', JSON.stringify(content));

    alert('Payment settings saved successfully!');
}

function loadShippingSettings() {
    const ship = JSON.parse(localStorage.getItem('anshu-care-shipping')) || { fee: 0, thresh: 0 };
    if (document.getElementById('shippingFee')) document.getElementById('shippingFee').value = ship.fee;
    if (document.getElementById('freeThreshold')) document.getElementById('freeThreshold').value = ship.thresh;
}

function saveShippingSettings() {
    const fee = parseInt(document.getElementById('shippingFee').value) || 0;
    const thresh = parseInt(document.getElementById('freeThreshold').value) || 0;

    localStorage.setItem('anshu-care-shipping', JSON.stringify({ fee, thresh }));
    alert("Shipping rules updated successfully!");
}

// Footer Editor
function openFooterLinksEditor() {
    const content = JSON.parse(localStorage.getItem('anshu-care-content')) || {};
    const footer = content.footer || {};

    // Quick Links
    let quickLinksHtml = '<h3 style="margin: 1.5rem 0 1rem; color: var(--primary);">Quick Links</h3><div style="display:flex; flex-direction:column; gap:10px;">';
    (footer.quickLinks || []).forEach(l => {
        quickLinksHtml += `
            <div class="quick-link-item" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                <input type="text" class="ql-text" value="${l.text}" placeholder="Link Text" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
                <input type="text" class="ql-url" value="${l.url}" placeholder="URL" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
            </div>
        `;
    });
    // Add button for new quick link
    quickLinksHtml += `
        <button onclick="addLinkField(this, 'quick-link-item', 'ql')" style="margin-top:5px; background:#f0f0f0; border:none; padding:5px; cursor:pointer;">+ Add Quick Link</button>
        </div>
    `;

    // Legal Links
    let legalLinksHtml = '<h3 style="margin: 1.5rem 0 1rem; color: var(--primary);">Legal Links</h3><div style="display:flex; flex-direction:column; gap:10px;">';
    (footer.legalLinks || []).forEach(l => {
        legalLinksHtml += `
            <div class="legal-link-item" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                <input type="text" class="ll-text" value="${l.text}" placeholder="Link Text" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
                <input type="text" class="ll-url" value="${l.url}" placeholder="URL" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
            </div>
        `;
    });
    legalLinksHtml += `
        <button onclick="addLinkField(this, 'legal-link-item', 'll')" style="margin-top:5px; background:#f0f0f0; border:none; padding:5px; cursor:pointer;">+ Add Legal Link</button>
        </div>
    `;

    // Social Links
    let socialLinksHtml = '<h3 style="margin: 1.5rem 0 1rem; color: var(--primary);">Social Media</h3><div style="display:flex; flex-direction:column; gap:10px;">';
    (footer.socialLinks || []).forEach(l => {
        socialLinksHtml += `
            <div class="social-link-item" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                <input type="text" class="sl-icon" value="${l.icon}" placeholder="Icon Class (e.g. fab fa-instagram)" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
                <input type="text" class="sl-url" value="${l.url}" placeholder="Profile URL" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
            </div>
        `;
    });
    socialLinksHtml += `
        <button onclick="addLinkField(this, 'social-link-item', 'sl')" style="margin-top:5px; background:#f0f0f0; border:none; padding:5px; cursor:pointer;">+ Add Social Link</button>
        </div>
    `;

    openModal("Edit Footer Links", quickLinksHtml + legalLinksHtml + socialLinksHtml);
    document.getElementById('modalPrimaryBtn').onclick = () => {
        saveFooterSettings();
        closeModal();
    };
}

function addLinkField(btn, itemClass, prefix) {
    const container = btn.previousElementSibling || btn.parentElement;
    // Actually we are appending to the div before the button. The button is naturally inside the main div or after?
    // In my HTML above: </div> (closes the flex col), then button. Wait.
    // The previous loop closed the flex container with `quickLinksHtml += '</div>';`. 
    // I need to correct the structure so the button appends simply.

    // Let's rely on a simpler approach: finding the container by class or just inserting before the button
    const wrapper = document.createElement('div');
    wrapper.className = itemClass;
    wrapper.style.cssText = "display:grid; grid-template-columns: 1fr 1fr; gap:10px;";

    if (prefix === 'sl') {
        wrapper.innerHTML = `
            <input type="text" class="${prefix}-icon" placeholder="Icon Class" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
            <input type="text" class="${prefix}-url" placeholder="URL" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
        `;
    } else {
        wrapper.innerHTML = `
            <input type="text" class="${prefix}-text" placeholder="Link Text" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
            <input type="text" class="${prefix}-url" placeholder="URL" style="padding:10px; border:1px solid #ddd; border-radius:5px;">
        `;
    }

    btn.parentNode.insertBefore(wrapper, btn);
}

function openModal(title, contentHtml) {
    const modal = document.getElementById('adminModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    if (modal && modalTitle && modalContent) {
        modalTitle.innerText = title;
        modalContent.innerHTML = contentHtml;
        modal.style.display = 'flex';
    }
}

function loadFooterSettings() {
    const content = JSON.parse(localStorage.getItem('anshu-care-content')) || {};
    const footer = content.footer || {};

    if (document.getElementById('footerTagline')) document.getElementById('footerTagline').value = footer.tagline || '';
    if (document.getElementById('footerDesc')) document.getElementById('footerDesc').value = footer.description || '';
}

function saveFooterSettings() {
    let content = JSON.parse(localStorage.getItem('anshu-care-content')) || {};
    if (!content.footer) content.footer = {};

    content.footer.tagline = document.getElementById('footerTagline').value;
    content.footer.description = document.getElementById('footerDesc').value;

    // Only update links if the editor modal was actually used (elements exist)
    const qlElements = document.querySelectorAll('.ql-text');
    if (qlElements.length > 0) {
        const quickLinks = [];
        const qlUrls = document.querySelectorAll('.ql-url');
        qlElements.forEach((el, idx) => {
            quickLinks.push({
                text: el.value,
                url: qlUrls[idx].value
            });
        });
        content.footer.quickLinks = quickLinks;
    }

    const llElements = document.querySelectorAll('.ll-text');
    if (llElements.length > 0) {
        const legalLinks = [];
        const llUrls = document.querySelectorAll('.ll-url');
        llElements.forEach((el, idx) => {
            legalLinks.push({
                text: el.value,
                url: llUrls[idx].value
            });
        });
        content.footer.legalLinks = legalLinks;
    }

    const slElements = document.querySelectorAll('.sl-icon');
    if (slElements.length > 0) {
        const socialLinks = [];
        const slUrls = document.querySelectorAll('.sl-url');
        slElements.forEach((el, idx) => {
            socialLinks.push({
                icon: el.value,
                url: slUrls[idx].value
            });
        });
        content.footer.socialLinks = socialLinks;
    }

    localStorage.setItem('anshu-care-content', JSON.stringify(content));
    alert('Footer content updated! Go to home page to see changes.');
    loadFooterSettings(); // Refresh inputs
}

function loadSecuritySettings() {
    const creds = JSON.parse(localStorage.getItem('anshu-care-admin-creds')) || { id: 'admin' };
    const currentIdEl = document.getElementById('currentAdminId');
    if (currentIdEl) currentIdEl.value = creds.id;

    loadShippingSettings();
    loadPaymentSettings();
    loadFooterSettings();
}

function updateAdminCredentials() {
    const newId = document.getElementById('newAdminId').value.trim();
    const newKey = document.getElementById('newAdminKey').value.trim();
    const msg = document.getElementById('securityMessage');

    if (!newKey && !newId) {
        alert("Please enter a new ID or Password to update!");
        return;
    }

    const currentCreds = JSON.parse(localStorage.getItem('anshu-care-admin-creds')) || { id: 'admin', key: 'anshu2026' };
    const updatedCreds = {
        id: newId || currentCreds.id,
        key: newKey || currentCreds.key
    };

    localStorage.setItem('anshu-care-admin-creds', JSON.stringify(updatedCreds));

    if (msg) {
        msg.innerText = "Security credentials updated! Logging out...";
        msg.style.color = "green";
        msg.style.display = "block";
    } else {
        alert("Security credentials updated! Logging out for security...");
    }

    setTimeout(() => {
        logout();
    }, 2000);
}

// --- SECTION MANAGEMENT ---
function loadSections() {
    const sections = getSections();
    const categories = getCategories();
    const tableBody = document.querySelector('#sectionTable tbody');
    const gridBody = document.querySelector('#sectionGrid');
    if (!tableBody || !gridBody) return;

    // Render Grid
    gridBody.innerHTML = sections.map(sec => {
        const count = categories.filter(c => c.sectionId === sec.id).length;
        return `
            <div class="category-card" onclick="switchSectionToCategories('${sec.id}')">
                <img src="${sec.image || 'https://via.placeholder.com/150'}" alt="${sec.name}">
                <h3>${sec.name}</h3>
                <p>${count} Categories</p>
            </div>
        `;
    }).join('');

    // Render Table
    tableBody.innerHTML = sections.map((sec, idx) => {
        const count = categories.filter(c => c.sectionId === sec.id).length;
        return `
            <tr>
                <td><img src="${sec.image || 'https://via.placeholder.com/50'}" style="width:40px; height:40px; border-radius:5px; object-fit:cover;"></td>
                <td><strong>${sec.name}</strong></td>
                <td><code>${sec.id}</code></td>
                <td>${count} items</td>
                <td>
                    <button onclick="openEditSection(${idx})" style="color:var(--primary); background:none; border:none; cursor:pointer; margin-right:15px;" title="Edit Section"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteSection(${idx})" style="color:red; background:none; border:none; cursor:pointer;" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function switchSectionToCategories(secId) {
    switchSection('categories');
    setTimeout(() => {
        const filter = document.getElementById('adminSectionFilter');
        if (filter) {
            filter.value = secId;
            loadCategories();
        }
    }, 100);
}

function openEditSection(idx) {
    const sections = getSections();
    const sec = sections[idx];
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Edit Section Details";

    modalContent.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Section Name</label>
                <input type="text" value="${sec.name}" id="editSecName" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
            </div>
            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Description</label>
                <textarea id="editSecDesc" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd; height:80px;">${sec.description || ''}</textarea>
            </div>
            
            <div class="form-group" style="background:#fcfcfc; padding:1.5rem; border-radius:15px; border:2px dashed #eee; text-align:center;">
                <label style="display:block; font-size:0.9rem; font-weight:700; color:var(--primary); margin-bottom:1rem;">Section Banner Photo</label>
                <div id="secPrevContainer" style="margin-bottom:1.2rem;">
                    <img id="secPrev" src="${sec.image || 'https://via.placeholder.com/300x120'}" style="width:100%; height:120px; object-fit:cover; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                </div>
                <input type="file" id="editSecUploadImg" accept="image/*" style="display:none;" onchange="handleModalPreview(this, 'secPrev', 'secPrevContainer')">
                <button type="button" class="btn" style="background:var(--primary); color:white; padding:0.8rem 1.5rem;" onclick="document.getElementById('editSecUploadImg').click()">
                    <i class="fas fa-camera" style="margin-right:8px;"></i> Change Banner
                </button>
                <input type="hidden" id="editSecImg" value="${sec.image || ''}">
            </div>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const fileInput = document.getElementById('editSecUploadImg');
        let img = document.getElementById('editSecImg').value;
        if (fileInput.files[0]) {
            img = await convertToBase64(fileInput.files[0]);
        }

        const name = document.getElementById('editSecName').value;
        const desc = document.getElementById('editSecDesc').value;
        if (name) {
            sections[idx] = { ...sec, name, description: desc, image: img };
            localStorage.setItem('anshu-care-sections', JSON.stringify(sections));
            loadSections();
            closeModal();
            alert("Section updated!");
        }
    };
    modal.style.display = 'flex';
}

function openAddSection() {
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Add New Section";

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <input type="text" placeholder="Section Name" id="newSecName" style="padding:12px; border-radius:10px; border:1px solid #ddd;">
            <input type="text" placeholder="ID slug (e.g. hair-care)" id="newSecId" style="padding:12px; border-radius:10px; border:1px solid #ddd;">
            <textarea id="newSecDesc" placeholder="Description" style="padding:12px; border-radius:10px; border:1px solid #ddd; height:80px;"></textarea>
            
            <div class="form-group" style="background:#fcfcfc; padding:1.5rem; border-radius:15px; border:2px dashed #eee; text-align:center;">
                <label style="display:block; font-size:0.9rem; font-weight:700; color:var(--primary); margin-bottom:1rem;">Section Banner Photo</label>
                <div id="newSecPrevContainer" style="margin-bottom:1.2rem; display:none;">
                    <img id="newSecPrev" src="" style="width:100%; height:120px; object-fit:cover; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                </div>
                <input type="file" id="newSecUploadImg" accept="image/*" style="display:none;" onchange="handleModalPreview(this, 'newSecPrev', 'newSecPrevContainer')">
                <button type="button" class="btn" style="background:var(--primary); color:white; padding:0.8rem 1.5rem;" onclick="document.getElementById('newSecUploadImg').click()">
                    <i class="fas fa-image" style="margin-right:8px;"></i> Upload Banner
                </button>
            </div>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const name = document.getElementById('newSecName').value;
        const id = document.getElementById('newSecId').value.toLowerCase().trim().replace(/\s+/g, '-');
        const desc = document.getElementById('newSecDesc').value;
        const fileInput = document.getElementById('newSecUploadImg');

        let img = "";
        if (fileInput.files[0]) {
            img = await convertToBase64(fileInput.files[0]);
        }

        if (name && id) {
            const sections = getSections();
            sections.push({ id, name, description: desc, image: img });
            localStorage.setItem('anshu-care-sections', JSON.stringify(sections));
            loadSections();
            closeModal();
            alert("New section added to sanctuary!");
        }
    };
    modal.style.display = 'flex';
}

function deleteSection(idx) {
    const sections = getSections();
    if (confirm(`Delete Section "${sections[idx].name}"? This will leave its categories unassigned.`)) {
        sections.splice(idx, 1);
        localStorage.setItem('anshu-care-sections', JSON.stringify(sections));
        loadSections();
    }
}

// --- CATEGORY MANAGEMENT ---
function loadCategories() {
    let categoriesList = getCategories();
    const sections = getSections();
    const products = JSON.parse(localStorage.getItem('anshu-care-products')) || [];
    const filter = document.getElementById('adminSectionFilter')?.value || 'all';

    // Populate filter if needed
    const filterSelect = document.getElementById('adminSectionFilter');
    if (filterSelect && filterSelect.options.length <= 1) {
        sections.forEach(sec => {
            const opt = document.createElement('option');
            opt.value = sec.id;
            opt.textContent = sec.name;
            filterSelect.appendChild(opt);
        });
    }

    // Update Title
    const titleEl = document.getElementById('categoryViewTitle');
    if (titleEl) {
        if (filter === 'all') {
            titleEl.innerText = 'Global Categories';
        } else {
            const sec = sections.find(s => s.id === filter);
            titleEl.innerText = sec ? sec.name : 'Categories';
        }
    }

    if (filter !== 'all') {
        categoriesList = categoriesList.filter(c => c.sectionId === filter);
    }

    const tableBody = document.querySelector('#categoryTable tbody');
    const gridBody = document.querySelector('#categoryGrid');
    if (!tableBody || !gridBody) return;

    // Render Grid
    gridBody.innerHTML = categoriesList.map(cat => {
        const count = products.filter(p => p.category === cat.id).length;
        return `
            <div class="category-card" onclick="switchSectionToProducts('${cat.id}')">
                <img src="${cat.image || 'https://via.placeholder.com/150'}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p>${count} Products</p>
            </div>
        `;
    }).join('');

    // Render Table
    tableBody.innerHTML = categoriesList.map(cat => {
        const count = products.filter(p => p.category === cat.id).length;
        const fullCategories = getCategories();
        const originalIdx = fullCategories.findIndex(orig => orig.id === cat.id);
        return `
            <tr>
                <td><img src="${cat.image || 'https://via.placeholder.com/50'}" style="width:40px; height:40px; border-radius:5px; object-fit:cover;"></td>
                <td><strong>${cat.name}</strong></td>
                <td><code>${cat.id}</code></td>
                <td>${count} items</td>
                <td>
                    <button onclick="openEditCategory(${originalIdx})" style="color:var(--primary); background:none; border:none; cursor:pointer; margin-right:15px;" title="Edit Name"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteCategory(${originalIdx})" style="color:red; background:none; border:none; cursor:pointer;" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function openEditCategory(idx) {
    const categories = getCategories();
    const cat = categories[idx];
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Edit Category Name";

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <p style="font-size: 0.85rem; color: #666;">Editing category: <strong>${cat.name}</strong></p>
            <input type="text" value="${cat.name}" id="editCatName" placeholder="Category Name" style="padding:12px; border-radius:10px; border:1px solid #ddd;">
            
            <div class="form-group" style="background:#fcfcfc; padding:1.5rem; border-radius:15px; border:2px dashed #eee; text-align:center;">
                <label style="display:block; font-size:0.9rem; font-weight:700; color:var(--primary); margin-bottom:1rem;">Category Display Photo</label>
                <div id="catPrevContainer" style="margin-bottom:1.2rem;">
                    <img id="editCatImgPreview" src="${cat.image || 'https://via.placeholder.com/150'}" style="width:120px; height:120px; object-fit:cover; border-radius:15px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                </div>
                <input type="file" id="editCatUploadImg" accept="image/*" style="display:none;" onchange="handleModalPreview(this, 'editCatImgPreview', 'catPrevContainer')">
                <button type="button" class="btn" style="background:var(--primary); color:white; padding:0.8rem 1.5rem;" onclick="document.getElementById('editCatUploadImg').click()">
                    <i class="fas fa-image" style="margin-right:8px;"></i> Change Photo
                </button>
                <input type="hidden" id="editCatImg" value="${cat.image || ''}">
            </div>
            <p style="font-size: 0.75rem; color: #999;">Note: The internal ID (${cat.id}) remains same for link stability.</p>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const newName = document.getElementById('editCatName').value;
        const file = document.getElementById('editCatUploadImg').files[0];
        let newImg = document.getElementById('editCatImg').value;

        if (file) {
            newImg = await convertToBase64(file);
        }

        if (newName) {
            categories[idx].name = newName;
            categories[idx].image = newImg;
            localStorage.setItem('anshu-care-categories', JSON.stringify(categories));
            loadCategories();
            closeModal();
            if (typeof applySiteContent === 'function') applySiteContent();
            alert("Category updated successfully!");
        }
    };
    modal.style.display = 'flex';
}

function deleteCategory(idx) {
    const categories = getCategories();
    if (confirm(`Are you sure you want to delete the "${categories[idx].name}" category? Products in this category will become unassigned.`)) {
        categories.splice(idx, 1);
        localStorage.setItem('anshu-care-categories', JSON.stringify(categories));
        loadCategories();
        if (typeof applySiteContent === 'function') applySiteContent();
    }
}

function openAddCategory() {
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Add New Category Bloom";

    const activeSecFilter = document.getElementById('adminSectionFilter')?.value || 'all';
    const sections = getSections();

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1rem;">
            <input type="text" placeholder="Category Name" id="newCatName" style="padding:10px; border-radius:8px; border:1px solid #ddd;">
            <input type="text" placeholder="Slug (e.g. face-wash)" id="newCatId" style="padding:10px; border-radius:8px; border:1px solid #ddd;">
            <label style="font-size:0.8rem; font-weight:700; color:#666;">Parent Section</label>
            <select id="newCatSec" style="padding:10px; border-radius:8px; border:1px solid #ddd;">
                 ${sections.map(s => `<option value="${s.id}" ${s.id === activeSecFilter ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
                <label style="font-size:0.8rem; font-weight:700;">Category Image</label>
                <input type="file" id="newCatUploadImg" accept="image/*" style="padding:8px; border:1px solid #ddd; border-radius:5px;">
                <input type="text" placeholder="...or enter Image URL" id="newCatImg" oninput="document.getElementById('newCatPrev').src=this.value" style="padding:10px; border-radius:8px; border:1px solid #ddd;">
            </div>
            <img id="newCatPrev" src="https://via.placeholder.com/150" style="width:80px; height:80px; object-fit:cover; border-radius:8px;">
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const name = document.getElementById('newCatName').value;
        const id = document.getElementById('newCatId').value.toLowerCase().trim().replace(/\s+/g, '-');
        const secId = document.getElementById('newCatSec').value;
        const file = document.getElementById('newCatUploadImg').files[0];
        let img = document.getElementById('newCatImg').value;

        if (file) {
            img = await convertToBase64(file);
        }

        if (name && id) {
            const categories = getCategories();
            categories.push({ id, sectionId: secId, name, image: img });
            localStorage.setItem('anshu-care-categories', JSON.stringify(categories));
            loadCategories();
            closeModal();
            alert("New Category Bloom added!");
        }
    };
    modal.style.display = 'flex';
}

// --- BLOG MANAGEMENT ---
function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem('anshu-care-blogs')) || [];
    const tableBody = document.querySelector('#blogTable tbody');
    if (!tableBody) return;
    tableBody.innerHTML = blogs.map((b, idx) => `
        <tr>
            <td><img src="${b.image}" style="width:40px; height:40px; border-radius:5px; object-fit:cover;"></td>
            <td><strong>${b.title}</strong></td>
            <td>${b.date}</td>
            <td>
                <button onclick="deleteBlog(${idx})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function deleteBlog(idx) {
    const blogs = JSON.parse(localStorage.getItem('anshu-care-blogs'));
    blogs.splice(idx, 1);
    localStorage.setItem('anshu-care-blogs', JSON.stringify(blogs));
    loadBlogs();
}

function openAddBlog() {
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Create New Blog Entry";

    modalContent.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
                <div class="form-group">
                    <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.5rem;">Blog Title</label>
                    <input type="text" id="bTitle" placeholder="Blog Title" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                </div>
                <div class="form-group">
                    <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.5rem;">Date</label>
                    <input type="text" id="bDate" value="${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}" placeholder="Date" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                </div>
            </div>
            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.5rem;">Short Excerpt</label>
                <textarea id="bExcerpt" placeholder="Short Excerpt" style="width:100%; height:80px; padding:12px; border-radius:10px; border:1px solid #ddd;"></textarea>
            </div>
            <div class="form-group" style="background:#fcfcfc; padding:1.5rem; border-radius:15px; border:2px dashed #eee; text-align:center;">
                <label style="display:block; font-size:0.9rem; font-weight:700; color:var(--primary); margin-bottom:1rem;">Blog Cover Photo</label>
                <div id="bPreviewContainer" style="margin-bottom:1rem; display:none;">
                    <img id="bImgPreview" src="" style="width:120px; height:120px; object-fit:cover; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                </div>
                <input type="file" id="bUploadImg" accept="image/*" style="display:none;" onchange="handleModalPreview(this, 'bImgPreview', 'bPreviewContainer')">
                <button type="button" class="btn" style="background:var(--primary); color:white; padding:0.8rem 1.5rem;" onclick="document.getElementById('bUploadImg').click()">
                    <i class="fas fa-cloud-upload-alt" style="margin-right:8px;"></i> Choose Photo
                </button>
                <p style="font-size:0.75rem; color:#999; margin-top:0.8rem;">JPG, PNG or WEBP. Max 2MB recommended.</p>
                <input type="text" id="bImg" placeholder="...or paste Image URL" style="width:100%; padding:8px; border-radius:8px; border:1px solid #eee; margin-top:1rem; font-size:0.8rem; text-align:center;">
            </div>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const file = document.getElementById('bUploadImg').files[0];
        let imageUrl = document.getElementById('bImg').value;
        if (file) imageUrl = await convertToBase64(file);

        if (!imageUrl) { alert('Please upload a photo'); return; }

        const blogs = JSON.parse(localStorage.getItem('anshu-care-blogs')) || [];
        const newBlog = {
            id: Date.now(),
            title: document.getElementById('bTitle').value,
            date: document.getElementById('bDate').value,
            excerpt: document.getElementById('bExcerpt').value,
            image: imageUrl
        };
        blogs.push(newBlog);
        localStorage.setItem('anshu-care-blogs', JSON.stringify(blogs));
        loadBlogs();
        closeModal();
        alert("New wisdom shared to the world!");
    };
    modal.style.display = 'flex';
}

// --- PAGE CONTENT MANAGEMENT ---
function loadPageContent() {
    const content = JSON.parse(localStorage.getItem('anshu-care-content'));
    if (!content) return;

    // Fill Hero Fields
    document.getElementById('editHeroTitle').value = content.hero.title;
    document.getElementById('editHeroSub').value = content.hero.subtitle;
    document.getElementById('editHeroDesc').value = content.hero.description;
    const heroImgEl = document.getElementById('editHeroImg');
    heroImgEl.value = content.hero.image;
    const heroPrev = document.getElementById('heroPrev');
    if (heroPrev && content.hero.image) {
        heroPrev.src = content.hero.image;
        heroPrev.style.display = 'block';
    }

    // Fill About Fields
    document.getElementById('editAboutTitle').value = content.about.title;
    document.getElementById('editAboutText1').value = content.about.text;
    document.getElementById('editAboutText2').value = content.about.text2 || '';
    const aboutImgEl = document.getElementById('editAboutImg');
    aboutImgEl.value = content.about.image;
    const aboutPrev = document.getElementById('aboutHPrev');
    if (aboutPrev && content.about.image) {
        aboutPrev.src = content.about.image;
        aboutPrev.style.display = 'block';
    }

    // Fill Header Fields
    if (content.categoriesHeader) {
        document.getElementById('editCatHeaderTitle').value = content.categoriesHeader.title;
        document.getElementById('editCatHeaderSub').value = content.categoriesHeader.subtitle;
    }
    if (content.bestSellersHeader) {
        document.getElementById('editBSHeaderTitle').value = content.bestSellersHeader.title;
        document.getElementById('editBSHeaderSub').value = content.bestSellersHeader.subtitle;
    }
    if (content.testimonialsHeader) {
        document.getElementById('editTestiHeaderTitle').value = content.testimonialsHeader.title || '';
        document.getElementById('editTestiHeaderSub').value = content.testimonialsHeader.subtitle || '';
    }

    // Fill Footer Fields
    if (content.footer) {
        document.getElementById('editFooterTagline').value = content.footer.tagline;
        document.getElementById('editFooterDesc').value = content.footer.description;
    }

    // Fill Features
    const featuresList = document.getElementById('admin-features-list');
    if (featuresList && content.features) {
        featuresList.innerHTML = content.features.map((f, i) => `
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:0.5rem; background:#f9f9f9; padding:10px; border-radius:8px;">
                <input type="text" value="${f.icon}" class="feat-icon" placeholder="FontAwesome Icon" style="padding:5px; border-radius:5px; border:1px solid #ddd;">
                <input type="text" value="${f.text}" class="feat-text" placeholder="Text" style="padding:5px; border-radius:5px; border:1px solid #ddd;">
            </div>
        `).join('');
    }

    // Fill Home Categories
    const homeCatsList = document.getElementById('admin-home-cats-list');
    if (homeCatsList && content.homeCategories) {
        homeCatsList.innerHTML = content.homeCategories.map((c, i) => `
            <div style="display:flex; flex-direction:column; gap:0.5rem; background:#f9f9f9; padding:15px; border-radius:12px; border:1px solid #eee;">
                <label style="font-size:0.7rem; font-weight:bold;">Card ${i + 1}</label>
                <input type="text" value="${c.title}" class="hc-title" placeholder="Title" style="padding:8px; border-radius:5px; border:1px solid #ddd;">
                <input type="text" value="${c.subtitle}" class="hc-sub" placeholder="Subtitle" style="padding:8px; border-radius:5px; border:1px solid #ddd;">
                <div style="display:flex; flex-direction:column; gap:2px;">
                    <input type="file" id="hc-upload-img-${i}" accept="image/*" style="font-size:0.7rem;">
                    <input type="text" value="${c.image}" class="hc-img" placeholder="Image URL" style="padding:8px; border-radius:5px; border:1px solid #ddd;">
                </div>
                <input type="text" value="${c.link}" class="hc-link" placeholder="Link (e.g. products.html#...)" style="padding:8px; border-radius:5px; border:1px solid #ddd;">
            </div>
        `).join('');
    }

    // Fill Detailed About Page Fields
    if (content.aboutPage) {
        document.getElementById('editApLabel').value = content.aboutPage.header.label || '';
        document.getElementById('editApTitle').value = content.aboutPage.header.title || '';
        document.getElementById('editApText1').value = content.aboutPage.header.text1 || '';
        document.getElementById('editApText2').value = content.aboutPage.header.text2 || '';
        const apImgEl = document.getElementById('editApImage');
        apImgEl.value = content.aboutPage.header.image || '';
        const apPrev = document.getElementById('apHeaderPrev');
        if (apPrev && content.aboutPage.header.image) {
            apPrev.src = content.aboutPage.header.image;
            apPrev.style.display = 'block';
        }
        document.getElementById('editApStat1Val').value = content.aboutPage.header.stat1Value || '';
        document.getElementById('editApStat1Lbl').value = content.aboutPage.header.stat1Label || '';
        document.getElementById('editApStat2Val').value = content.aboutPage.header.stat2Value || '';
        document.getElementById('editApStat2Lbl').value = content.aboutPage.header.stat2Label || '';
        document.getElementById('editApVisionTitle').value = content.aboutPage.vision.title || '';
        document.getElementById('editApVisionText').value = content.aboutPage.vision.text || '';
        document.getElementById('editApMissionTitle').value = content.aboutPage.mission.title || '';
        document.getElementById('editApMissionText').value = content.aboutPage.mission.text || '';
    }

    // Fill Contact Fields
    document.getElementById('editContactTitle').value = content.contact.title || '';
    document.getElementById('editContactDesc').value = content.contact.description || '';
    document.getElementById('editEmail').value = content.contact.email;
    document.getElementById('editPhoneLabel').value = content.contact.phoneLabel || '';
    document.getElementById('editPhone').value = content.contact.phone;
    document.getElementById('editAddressLabel').value = content.contact.addressLabel || '';
    document.getElementById('editAddress').value = content.contact.address;
    document.getElementById('editWhatsapp').value = content.contact.whatsapp || '';
    document.getElementById('editInstagram').value = content.contact.instagram || '';
    document.getElementById('editYoutube').value = content.contact.youtube || '';

    loadTestimonials();
}

function loadTestimonials() {
    const content = JSON.parse(localStorage.getItem('anshu-care-content'));
    const tableBody = document.querySelector('#testimonialTable tbody');
    if (!tableBody || !content || !content.testimonials) return;

    tableBody.innerHTML = content.testimonials.map((t, idx) => `
        <tr>
            <td><strong>${t.name}</strong></td>
            <td>${t.comment}</td>
            <td>${t.rating} <i class="fas fa-star" style="color:var(--accent);"></i></td>
            <td>
                <button onclick="deleteTestimonial(${idx})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function openAddTestimonial() {
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Add New Testimonial";

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1rem;">
            <input type="text" placeholder="Client Name" id="testiName" style="padding:10px; border-radius:8px; border:1px solid #ddd;">
            <textarea id="testiComment" placeholder="Client Comment" style="padding:10px; border-radius:8px; border:1px solid #ddd; height:80px;"></textarea>
            <select id="testiRating" style="padding:10px; border-radius:8px; border:1px solid #ddd;">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
            </select>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = () => {
        const name = document.getElementById('testiName').value;
        const comment = document.getElementById('testiComment').value;
        const rating = parseInt(document.getElementById('testiRating').value);

        if (name && comment) {
            const siteContent = JSON.parse(localStorage.getItem('anshu-care-content'));
            if (!siteContent.testimonials) siteContent.testimonials = [];
            siteContent.testimonials.push({ name, comment, rating });
            localStorage.setItem('anshu-care-content', JSON.stringify(siteContent));
            loadTestimonials();
            closeModal();
            alert("Testimonial added!");
        }
    };
    modal.style.display = 'flex';
}

function deleteTestimonial(idx) {
    if (confirm("Delete this testimonial?")) {
        const siteContent = JSON.parse(localStorage.getItem('anshu-care-content'));
        siteContent.testimonials.splice(idx, 1);
        localStorage.setItem('anshu-care-content', JSON.stringify(siteContent));
        loadTestimonials();
    }
}

async function savePageContent(type) {
    const content = JSON.parse(localStorage.getItem('anshu-care-content'));

    if (type === 'hero') {
        // Assuming there's an input for file upload for hero image, e.g., id="uploadHeroImg"
        const heroFile = document.getElementById('uploadHeroImg')?.files[0];
        let heroImg = document.getElementById('editHeroImg').value;
        if (heroFile) {
            heroImg = await convertToBase64(heroFile);
        }

        content.hero = {
            title: document.getElementById('editHeroTitle').value,
            subtitle: document.getElementById('editHeroSub').value,
            description: document.getElementById('editHeroDesc').value,
            image: heroImg
        };
    } else if (type === 'about') {
        const aboutFile = document.getElementById('uploadAboutImg')?.files[0];
        let aboutImg = document.getElementById('editAboutImg').value;
        if (aboutFile) {
            aboutImg = await convertToBase64(aboutFile);
        }
        content.about.title = document.getElementById('editAboutTitle').value;
        content.about.text = document.getElementById('editAboutText1').value;
        content.about.text2 = document.getElementById('editAboutText2').value;
        content.about.image = aboutImg;
    } else if (type === 'contact') {
        content.contact.title = document.getElementById('editContactTitle').value;
        content.contact.description = document.getElementById('editContactDesc').value;
        content.contact.email = document.getElementById('editEmail').value;
        content.contact.phoneLabel = document.getElementById('editPhoneLabel').value;
        content.contact.phone = document.getElementById('editPhone').value;
        content.contact.addressLabel = document.getElementById('editAddressLabel').value;
        content.contact.address = document.getElementById('editAddress').value;
        content.contact.whatsapp = document.getElementById('editWhatsapp').value;
        content.contact.instagram = document.getElementById('editInstagram').value;
        content.contact.youtube = document.getElementById('editYoutube').value;

        // Auto-sync to Footer Social Links for convenience
        if (content.footer && content.footer.socialLinks) {
            content.footer.socialLinks.forEach(link => {
                if (link.icon.includes('instagram')) link.url = content.contact.instagram || '#';
                if (link.icon.includes('youtube')) link.url = content.contact.youtube || '#';
                if (link.icon.includes('whatsapp')) {
                    const waNum = content.contact.whatsapp.replace(/\+/g, '').replace(/\s/g, '');
                    link.url = waNum ? `https://wa.me/${waNum}` : '#';
                }
            });
        }
    } else if (type === 'headers') {
        content.categoriesHeader = {
            title: document.getElementById('editCatHeaderTitle').value,
            subtitle: document.getElementById('editCatHeaderSub').value
        };
        content.bestSellersHeader = {
            title: document.getElementById('editBSHeaderTitle').value,
            subtitle: document.getElementById('editBSHeaderSub').value
        };
        content.testimonialsHeader = {
            title: document.getElementById('editTestiHeaderTitle').value,
            subtitle: document.getElementById('editTestiHeaderSub').value
        };
    } else if (type === 'footer') {
        content.footer = {
            tagline: document.getElementById('editFooterTagline').value,
            description: document.getElementById('editFooterDesc').value
        };
    } else if (type === 'features') {
        const icons = document.querySelectorAll('.feat-icon');
        const texts = document.querySelectorAll('.feat-text');
        content.features = Array.from(icons).map((icon, i) => ({
            icon: icon.value,
            text: texts[i].value
        }));
    } else if (type === 'homeCats') {
        const titles = document.querySelectorAll('.hc-title');
        const subs = document.querySelectorAll('.hc-sub');
        const imgs = document.querySelectorAll('.hc-img');
        const links = document.querySelectorAll('.hc-link');
        content.homeCategories = await Promise.all(Array.from(titles).map(async (t, i) => {
            const fileInput = document.getElementById(`hc-upload-img-${i}`); // Assuming dynamic IDs for file inputs
            let imageUrl = imgs[i].value;
            if (fileInput && fileInput.files[0]) {
                imageUrl = await convertToBase64(fileInput.files[0]);
            }
            return {
                title: t.value,
                subtitle: subs[i].value,
                image: imageUrl,
                link: links[i].value
            };
        }));
    } else if (type === 'aboutPage') {
        const apFile = document.getElementById('uploadApImage')?.files[0];
        let apImg = document.getElementById('editApImage').value;
        if (apFile) {
            apImg = await convertToBase64(apFile);
        }
        content.aboutPage = {
            header: {
                label: document.getElementById('editApLabel').value,
                title: document.getElementById('editApTitle').value,
                text1: document.getElementById('editApText1').value,
                text2: document.getElementById('editApText2').value,
                image: apImg,
                stat1Value: document.getElementById('editApStat1Val').value,
                stat1Label: document.getElementById('editApStat1Lbl').value,
                stat2Value: document.getElementById('editApStat2Val').value,
                stat2Label: document.getElementById('editApStat2Lbl').value
            },
            vision: {
                title: document.getElementById('editApVisionTitle').value,
                text: document.getElementById('editApVisionText').value
            },
            mission: {
                title: document.getElementById('editApMissionTitle').value,
                text: document.getElementById('editApMissionText').value
            }
        };
    }

    localStorage.setItem('anshu-care-content', JSON.stringify(content));
    if (typeof applySiteContent === 'function') applySiteContent();
    alert('Changes saved! The sanctuary pages have been updated.');
}

// --- DASHBOARD ANALYTICS ---
function loadStats() {
    const orders = JSON.parse(localStorage.getItem('anshu-care-orders')) || [];
    const users = JSON.parse(localStorage.getItem('anshu-care-user')) ? 1 : 0;

    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

    const salesEl = document.getElementById('totalSales');
    const orderEl = document.getElementById('orderCount');
    const userEl = document.getElementById('userCount');

    if (salesEl) salesEl.innerText = `₹${totalSales}`;
    if (orderEl) orderEl.innerText = orders.length;
    if (userEl) userEl.innerText = users;

    const categories = getCategories();
    const catCountEl = document.getElementById('categoryCount');
    if (catCountEl) catCountEl.innerText = categories.length;

    renderRecentOrders(orders);
    renderCategorySummary(categories);
    populateAdminCategoryFilter(categories);
}

function renderCategorySummary(categories) {
    const tableBody = document.querySelector('#dashboardCategorySummary tbody');
    if (!tableBody) return;
    const products = JSON.parse(localStorage.getItem('anshu-care-products')) || [];
    const sections = getSections();

    tableBody.innerHTML = sections.map(sec => {
        const catList = categories.filter(c => c.sectionId === sec.id);
        const prodCount = products.filter(p => catList.some(c => c.id === p.category)).length;
        return `
            <tr>
                <td><strong>${sec.name}</strong></td>
                <td>${catList.length} Categories (${prodCount} Items)</td>
                <td><button onclick="switchSectionToCategories('${sec.id}')" style="cursor:pointer; color:var(--primary); border:none; background:none; text-decoration:underline;">Manage Section</button></td>
            </tr>
        `;
    }).join('');
}

function switchSectionToProducts(catId) {
    // Switch to products section and highlight nav
    switchSection('products');

    // Set filter
    setTimeout(() => {
        const filter = document.getElementById('adminCategoryFilter');
        if (filter) {
            filter.value = catId;
            loadProducts();
        }
    }, 100);
}

function populateAdminCategoryFilter(categories) {
    const filterSelect = document.getElementById('adminCategoryFilter');
    if (!filterSelect) return;

    // Clear and re-populate to avoid duplicates or empty lists
    filterSelect.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.name;
        filterSelect.appendChild(opt);
    });
}

function renderRecentOrders(orders) {
    const tableBody = document.querySelector('#recentOrdersTable tbody');
    if (!tableBody) return;

    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No recent data available.</td></tr>';
        return;
    }

    tableBody.innerHTML = orders.slice(0, 5).map(o => `
        <tr>
            <td><strong>#${o.id.slice(-6)}</strong></td>
            <td>₹${o.total}</td>
            <td><span class="status ${o.status.toLowerCase().replace(' ', '')}">${o.status}</span></td>
            <td>${o.date}</td>
        </tr>
    `).join('');
}

// --- ORDER MANAGEMENT ---
function loadAllOrders() {
    const orders = JSON.parse(localStorage.getItem('anshu-care-orders')) || [];
    const tableBody = document.querySelector('#allOrdersTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = orders.map(o => {
        const isVerified = o.paymentVerified === true;
        const rowColor = isVerified ? 'background: rgba(45, 90, 39, 0.05);' : '';

        return `
            <tr style="${rowColor}">
                <td>#${o.id}</td>
                <td>User: ${o.id.split('-')[1]}</td>
                <td>${o.items.length} Product(s)</td>
                <td><strong>₹${o.total}</strong></td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div>
                            <span style="display:block; font-size: 0.8rem; font-weight: 700; color: var(--primary);">${o.paymentMethod?.toUpperCase() || 'COD'}</span>
                            ${o.transactionId && o.transactionId !== 'N/A' ? `<span style="font-size: 0.7rem; color: #666; background: #eee; padding: 2px 5px; border-radius: 4px;">ID: ${o.transactionId}</span>` : ''}
                        </div>
                        ${o.paymentMethod === 'upi' ? `
                            <button onclick="verifyOrderPayment('${o.id}')" style="background: ${isVerified ? 'var(--primary)' : '#ddd'}; color: white; border: none; padding: 4px 8px; border-radius: 5px; cursor: pointer; font-size: 0.65rem;" title="Mark as Received">
                                <i class="fas ${isVerified ? 'fa-check-circle' : 'fa-circle'}"></i> ${isVerified ? 'Verified' : 'Verify'}
                            </button>
                        ` : ''}
                    </div>
                </td>
                <td>
                    <select onchange="updateOrderStatus('${o.id}', this.value)" style="padding:5px; border-radius:5px;">
                        <option value="Order Placed" ${o.status === 'Order Placed' ? 'selected' : ''}>Placed</option>
                        <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
                <td>
                    <div style="display: flex; gap: 5px;">
                        <input type="text" placeholder="Shiprocket URL" id="track-${o.id}" value="${o.trackingUrl || ''}" style="padding: 5px; border: 1px solid #ddd; border-radius: 5px; font-size: 0.8rem; width: 120px;">
                        <button onclick="updateOrderTracking('${o.id}')" style="background: var(--primary); color: white; border: none; padding: 5px 8px; border-radius: 5px; cursor: pointer; font-size: 0.7rem;" title="Save Tracking"><i class="fas fa-save"></i></button>
                    </div>
                </td>
                <td>
                    <button onclick="deleteOrder('${o.id}')" style="background:none; border:none; color:#e53e3e; cursor:pointer; font-size: 1.1rem;" title="Delete Order">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function deleteOrder(id) {
    if (confirm(`Are you sure you want to permanently delete order #${id}? This action cannot be undone.`)) {
        let orders = JSON.parse(localStorage.getItem('anshu-care-orders')) || [];
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('anshu-care-orders', JSON.stringify(orders));
        loadAllOrders();
        loadStats();
    }
}

function verifyOrderPayment(id) {
    let orders = JSON.parse(localStorage.getItem('anshu-care-orders'));
    orders = orders.map(o => {
        if (o.id === id) o.paymentVerified = !o.paymentVerified;
        return o;
    });
    localStorage.setItem('anshu-care-orders', JSON.stringify(orders));
    loadAllOrders();
}

function updateOrderTracking(id) {
    const url = document.getElementById(`track-${id}`).value;
    let orders = JSON.parse(localStorage.getItem('anshu-care-orders'));
    orders = orders.map(o => {
        if (o.id === id) o.trackingUrl = url;
        return o;
    });
    localStorage.setItem('anshu-care-orders', JSON.stringify(orders));
    alert(`Tracking URL for Order #${id} has been saved.`);
}

function updateOrderStatus(id, newStatus) {
    let orders = JSON.parse(localStorage.getItem('anshu-care-orders'));
    orders = orders.map(o => {
        if (o.id === id) o.status = newStatus;
        return o;
    });
    localStorage.setItem('anshu-care-orders', JSON.stringify(orders));

    // Simulate Email Alert logic
    const statusMsg = newStatus === 'Shipped' ? "has been dispatched with a tracking link" :
        newStatus === 'Delivered' ? "has been successfully delivered" : "is being processed";

    alert(`Order #${id} status updated to ${newStatus}. \n\n[SIMULATED EMAIL SENT]: Dear Customer, your order ${statusMsg}. Thank you!`);
}

// --- PRODUCT MANAGEMENT ---
function loadProducts() {
    let productsList = JSON.parse(localStorage.getItem('anshu-care-products')) || [];
    const categories = getCategories();
    const filter = document.getElementById('adminCategoryFilter')?.value || 'all';

    // Update Section Title
    const titleEl = document.getElementById('productViewTitle');
    if (titleEl) {
        if (filter === 'all') {
            titleEl.innerText = 'All Collections';
        } else {
            const cat = categories.find(c => c.id === filter);
            titleEl.innerText = cat ? cat.name : 'Products';
        }
    }

    if (filter !== 'all') {
        productsList = productsList.filter(p => p.category === filter);
    }

    const tableBody = document.querySelector('#productTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = productsList.map((p, idx) => {
        const originalIdx = (JSON.parse(localStorage.getItem('anshu-care-products')) || []).findIndex(origP => origP.id === p.id);
        const catName = categories.find(c => c.id === p.category)?.name || p.category;
        return `
            <tr>
                <td><img src="${p.image}" style="width:40px; height:40px; border-radius:5px; object-fit:cover;"></td>
                <td><strong>${p.name}</strong></td>
                <td>₹${p.price}</td>
                <td>${catName}</td>
                <td>
                    <button onclick="openEditProduct(${originalIdx})" style="color:var(--primary); background:none; border:none; cursor:pointer; margin-right:15px;" title="Edit Product"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteProduct(${originalIdx})" style="color:red; background:none; border:none; cursor:pointer;" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join('');
}

function openEditProduct(idx) {
    const products = JSON.parse(localStorage.getItem('anshu-care-products'));
    const p = products[idx];
    const categories = getCategories();
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Edit Product Details";

    modalContent.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
                <div class="form-group">
                    <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Product Name</label>
                    <input type="text" value="${p.name}" id="editProdName" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                </div>
                <div class="form-group">
                    <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Price (₹)</label>
                    <input type="number" value="${p.price}" id="editProdPrice" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                </div>
            </div>
            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Category</label>
                <select id="editProdCat" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    ${categories.map(cat => `<option value="${cat.id}" ${cat.id === p.category ? 'selected' : ''}>${cat.name}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group" style="background:#fcfcfc; padding:1.5rem; border-radius:15px; border:2px dashed #eee; text-align:center;">
                <label style="display:block; font-size:0.9rem; font-weight:700; color:var(--primary); margin-bottom:1rem;">Main Product Image</label>
                <div id="editPPreviewContainer" style="margin-bottom:1.5rem;">
                    <img id="editPImgPreview" src="${p.image}" style="width:140px; height:140px; object-fit:cover; border-radius:15px; box-shadow:0 8px 25px rgba(0,0,0,0.12); border:3px solid #fff;">
                </div>
                <input type="file" id="editPUploadImg" accept="image/*" style="display:none;" onchange="handleModalPreview(this, 'editPImgPreview', 'editPPreviewContainer')">
                <button type="button" class="btn" style="background:var(--primary); color:white; padding:0.8rem 2rem; border-radius:12px; font-weight:600;" onclick="document.getElementById('editPUploadImg').click()">
                    <i class="fas fa-image" style="margin-right:8px;"></i> Upload New Photo
                </button>
                <input type="hidden" id="editProdImg" value="${p.image}">
            </div>

            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Product Description</label>
                <textarea id="editProdDesc" placeholder="Enter product details..." style="width:100%; height:80px; padding:12px; border-radius:10px; border:1px solid #ddd; margin-bottom:1rem;">${p.description || ''}</textarea>
                
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Ingredients (Comma separated)</label>
                <textarea id="editProdIng" placeholder="e.g. Organic Saffron, Almond Oil, Vitamin E" style="width:100%; height:60px; padding:12px; border-radius:10px; border:1px solid #ddd;">${p.ingredients ? p.ingredients.join(', ') : ''}</textarea>
            </div>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const file = document.getElementById('editPUploadImg').files[0];
        let img = document.getElementById('editProdImg').value;
        if (file) img = await convertToBase64(file);

        if (img) {
            products[idx] = {
                ...p,
                name: document.getElementById('editProdName').value,
                price: parseInt(document.getElementById('editProdPrice').value),
                category: document.getElementById('editProdCat').value,
                image: img,
                description: document.getElementById('editProdDesc').value,
                ingredients: document.getElementById('editProdIng').value.split(',').map(s => s.trim()).filter(s => s !== '')
            };
            localStorage.setItem('anshu-care-products', JSON.stringify(products));
            loadProducts();
            closeModal();
            alert("Product details updated!");
        }
    };
    modal.style.display = 'flex';
}

function deleteProduct(idx) {
    const products = JSON.parse(localStorage.getItem('anshu-care-products'));
    products.splice(idx, 1);
    localStorage.setItem('anshu-care-products', JSON.stringify(products));
    loadProducts();
}

function openAddProduct() {
    const modal = document.getElementById('adminModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = "Add New Product";

    const categories = getCategories();
    const activeFilter = document.getElementById('adminCategoryFilter')?.value || 'all';

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1.2rem;">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
                <div class="form-group">
                    <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Product Name</label>
                    <input type="text" id="newName" placeholder="e.g. Lavender Gel" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                </div>
                <div class="form-group">
                    <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Price (₹)</label>
                    <input type="number" id="newPrice" placeholder="500" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                </div>
            </div>
            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Category</label>
                <select id="newCat" style="width:100%; padding:12px; border-radius:10px; border:1px solid #ddd;">
                    ${categories.map(cat => `<option value="${cat.id}" ${cat.id === activeFilter ? 'selected' : ''}>${cat.name}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group" style="background:#fcfcfc; padding:1.5rem; border-radius:15px; border:2px dashed #eee; text-align:center;">
                <label style="display:block; font-size:0.9rem; font-weight:700; color:var(--primary); margin-bottom:1rem;">Main Product Photo</label>
                <div id="newPPreviewContainer" style="margin-bottom:1.5rem; display:none;">
                    <img id="newPImgPreview" src="" style="width:140px; height:140px; object-fit:cover; border-radius:15px; box-shadow:0 8px 25px rgba(0,0,0,0.12); border:3px solid #fff;">
                </div>
                <input type="file" id="newPUploadImg" accept="image/*" style="display:none;" onchange="handleModalPreview(this, 'newPImgPreview', 'newPPreviewContainer')">
                <button type="button" class="btn" style="background:var(--primary); color:white; padding:0.8rem 2rem; border-radius:12px; font-weight:600;" onclick="document.getElementById('newPUploadImg').click()">
                    <i class="fas fa-camera" style="margin-right:8px;"></i> Choose Photo
                </button>
                <input type="text" id="newImg" placeholder="...or Image URL" style="width:100%; padding:8px; border-radius:8px; border:1px solid #eee; margin-top:1.2rem; font-size:0.75rem; text-align:center; color:#999;">
            </div>

            <div class="form-group">
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Description</label>
                <textarea id="newDesc" placeholder="Describe clinical benefits..." style="width:100%; height:60px; padding:12px; border-radius:10px; border:1px solid #ddd; margin-bottom:1rem;"></textarea>
                
                <label style="display:block; font-size:0.8rem; font-weight:600; margin-bottom:0.4rem;">Ingredients (Comma separated)</label>
                <textarea id="newIng" placeholder="e.g. Rose Water, Aloe Vera, Neem" style="width:100%; height:60px; padding:12px; border-radius:10px; border:1px solid #ddd;"></textarea>
            </div>
        </div>
    `;

    document.getElementById('modalPrimaryBtn').onclick = async () => {
        const file = document.getElementById('newPUploadImg').files[0];
        let img = document.getElementById('newImg').value;
        if (file) img = await convertToBase64(file);

        if (img) {
            const products = JSON.parse(localStorage.getItem('anshu-care-products')) || [];
            products.push({
                id: Date.now(),
                name: document.getElementById('newName').value,
                price: parseInt(document.getElementById('newPrice').value),
                category: document.getElementById('newCat').value,
                image: img,
                description: document.getElementById('newDesc').value,
                ingredients: document.getElementById('newIng').value.split(',').map(s => s.trim()).filter(s => s !== '')
            });
            localStorage.setItem('anshu-care-products', JSON.stringify(products));
            loadProducts();
            closeModal();
            alert("New product added successfully!");
        } else {
            alert("Please upload an image first!");
        }
    };
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function resetSystemData() {
    if (confirm("Are you sure you want to reset all sanctuary data? This will restore original categories and products, clearing all your custom changes.")) {
        localStorage.removeItem('anshu-care-categories');
        localStorage.removeItem('anshu-care-products');
        localStorage.removeItem('anshu-care-blogs');
        localStorage.removeItem('anshu-care-content');
        window.location.reload();
    }
}

// --- USER MANAGEMENT ---
function loadUsers() {
    const tableBody = document.querySelector('#userTable tbody');
    if (!tableBody) return;

    // Simulate user data since it's typically local
    const users = JSON.parse(localStorage.getItem('anshu-care-users')) || [
        { id: 'U1001', email: 'sanctuary@anshucare.com', joined: '2026-01-15', totalOrders: 3 },
        { id: 'U1002', email: 'wellness@example.com', joined: '2026-01-20', totalOrders: 1 }
    ];

    tableBody.innerHTML = users.map(u => `
        <tr>
            <td><code>${u.id}</code></td>
            <td>${u.email}</td>
            <td>${u.joined}</td>
            <td>${u.totalOrders} Sessions</td>
        </tr>
    `).join('');
}

// --- PDF EXPORT LOGIC ---
function exportPaymentsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add Brand Header
    doc.setFontSize(22);
    doc.setTextColor(26, 58, 50); // var(--primary)
    doc.text("Anshu Care - Financial Audit", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    const date = new Date().toLocaleString();
    doc.text(`Report Generated: ${date}`, 14, 28);

    // Get Table Data
    const orders = JSON.parse(localStorage.getItem('anshu-care-orders')) || [];
    const months = {};
    let totalRev = 0;

    orders.forEach(o => {
        const d = new Date(o.date);
        const key = d.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!months[key]) months[key] = { revenue: 0, count: 0 };
        months[key].revenue += o.total;
        months[key].count += 1;
        totalRev += o.total;
    });

    const tableRows = Object.entries(months).map(([month, data]) => [
        month,
        data.count.toString(),
        `RS. ${data.revenue.toLocaleString()}`,
        "Verified"
    ]);

    // Summary Section
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Lifetime Total Revenue: RS. ${totalRev.toLocaleString()}`, 14, 45);
    doc.text(`Total Orders Processed: ${orders.length}`, 14, 52);

    // Generate Table
    doc.autoTable({
        startY: 60,
        head: [['Audit Month', 'Orders Held', 'Total Revenue', 'Status']],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [26, 58, 50] }
    });

    doc.save(`Anshu_Care_Audit_${new Date().getMonth() + 1}_2026.pdf`);
}

function exportSettingsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(26, 58, 50);
    doc.text("Anshu Care - Platform Configuration", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Configuration Manifest: ${new Date().toLocaleDateString()}`, 14, 28);

    const ship = JSON.parse(localStorage.getItem('anshu-care-shipping')) || { fee: 0, thresh: 0 };
    const creds = JSON.parse(localStorage.getItem('anshu-care-admin-creds')) || { id: 'admin' };

    const settingsData = [
        ["Administrator ID", creds.id],
        ["Security Status", "Encrypted & Active"],
        ["Standard Shipping Fee", `RS. ${ship.fee}`],
        ["Free Delivery Threshold", ship.thresh > 0 ? `RS. ${ship.thresh}` : "Disabled (Always Paid)"],
        ["Platform Status", "Live - 2026 Internal Portal"]
    ];

    doc.autoTable({
        startY: 40,
        head: [['Configuration Key', 'Active Value']],
        body: settingsData,
        theme: 'grid',
        headStyles: { fillColor: [180, 140, 72] } // var(--accent)
    });

    doc.save("Anshu_Care_Settings_Backup.pdf");
}

/* --- THEME CUSTOMIZATION --- */
function loadThemeSettings() {
    const theme = JSON.parse(localStorage.getItem('anshu-care-theme')) || {};

    // Default fallback values from style.css
    const defaults = {
        primary: '#1a3a32',
        secondary: '#f4f1ea',
        accent: '#b48c48',
        bg: '#fafafa',
        text: '#1f2937'
    };

    const rgbToHex = (rgb) => {
        if (!rgb) return null;
        if (rgb.startsWith('#')) return rgb;
        const vals = rgb.match(/\d+/g);
        if (vals && vals.length >= 3) {
            return "#" + vals.slice(0, 3).map(x => ('0' + parseInt(x, 10).toString(16)).slice(-2)).join('');
        }
        return null;
    };

    const getVal = (key, cssVar, fallback) => {
        if (theme[key]) return theme[key];
        const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
        const hex = rgbToHex(computed);
        return hex || fallback;
    };

    const set = (id, val) => {
        const el = document.getElementById(id);
        const txt = document.getElementById(id + 'Text');
        if (el && val) el.value = val;
        if (txt && val) txt.value = val;
    };

    set('themePrimary', getVal('primary', '--primary', defaults.primary));
    set('themeSecondary', getVal('secondary', '--secondary', defaults.secondary));
    set('themeAccent', getVal('accent', '--accent', defaults.accent));
    set('themeBg', getVal('bg', '--bg-color', defaults.bg));
    set('themeText', getVal('text', '--text-color', defaults.text));

    if (typeof applyTheme === 'function' && Object.keys(theme).length > 0) applyTheme();
}

function updateColorInput(colorId, textId) {
    const colorVal = document.getElementById(colorId).value;
    document.getElementById(textId).value = colorVal;
}

function updateColorPicker(colorId, textId) {
    const textVal = document.getElementById(textId).value;
    if (textVal && textVal.match(/^#[0-9A-F]{6}$/i)) {
        document.getElementById(colorId).value = textVal;
    }
}

function saveThemeSettings() {
    const theme = {
        primary: document.getElementById('themePrimary').value,
        secondary: document.getElementById('themeSecondary').value,
        accent: document.getElementById('themeAccent').value,
        bg: document.getElementById('themeBg').value,
        text: document.getElementById('themeText').value,
    };

    localStorage.setItem('anshu-care-theme', JSON.stringify(theme));
    if (typeof applyTheme === 'function') applyTheme();

    const status = document.getElementById('themeStatus');
    if (status) {
        status.innerText = "Theme saved successfully! Changes are live.";
        setTimeout(() => status.innerText = "", 3000);
    }
}

function resetThemeSettings() {
    if (confirm("Reset all theme colors to default?")) {
        localStorage.removeItem('anshu-care-theme');
        location.reload();
    }
}

// Ensure theme settings are loaded when admin panel opens
document.addEventListener('DOMContentLoaded', loadThemeSettings);

// --- INITIALIZATION ---
window.onload = () => {
    seedSanctuary();
    loadStats();
};
