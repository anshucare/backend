// Apply Theme Settings immediately to prevent flash of default colors
function applyTheme() {
    const theme = JSON.parse(localStorage.getItem('anshu-care-theme'));
    if (theme) {
        const root = document.documentElement;
        if (theme.primary) root.style.setProperty('--primary', theme.primary);
        if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
        if (theme.accent) root.style.setProperty('--accent', theme.accent);
        if (theme.bg) root.style.setProperty('--bg-color', theme.bg);
        if (theme.text) root.style.setProperty('--text-color', theme.text);
    }
}
applyTheme();

const DEFAULT_SITE_CONTENT = {
    hero: {
        title: "Nature care \nfor your Soul",
        subtitle: "Luxury Inspired by Nature",
        description: "Experience the purity of ancient Ayurveda with Anshu Care. Our handcrafted herbal solutions bring you the best of nature for holistic wellness.",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    about: {
        title: "Rooted in Tradition, Crafted for Today",
        text: "Anshu Care was born from a simple belief: Nature has all the answers. Our journey started in the heart of traditional Ayurvedic practices, where we discovered the transformative power of botanical extracts.",
        text2: "Each product in our collection is a tribute to the earth, crafted with 100% natural ingredients, zero harsh chemicals, and a promise of purity.",
        image: "https://images.unsplash.com/photo-1512850183-6d7990f42385?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        values: [
            { icon: "fas fa-leaf", text: "Organic Sourcing" },
            { icon: "fas fa-hand-holding-heart", text: "Cruelty Free" },
            { icon: "fas fa-recycle", text: "Eco Packaging" }
        ]
    },
    contact: {
        title: "Get in Touch",
        description: "",
        email: "hello@anshucare.com",
        phone: "",
        phoneLabel: "",
        address: "",
        addressLabel: "",
        whatsapp: "917337082606",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com"
    },
    testimonials: [
        { name: "Priya S.", comment: "The Keshajyoti shampoo has completely transformed my hair texture. It feels so much lighter and healthier now!", rating: 5 },
        { name: "Rahul M.", comment: "I've been using the face serum for a month and the glow is real. Highly recommended!", rating: 5 },
        { name: "Anjali K.", comment: "Love the packaging and the scent. Feels like a spa at home.", rating: 4 }
    ],
    features: [
        { icon: "fas fa-leaf", text: "100% Organic" },
        { icon: "fas fa-hand-holding-heart", text: "Cruelty Free" },
        { icon: "fas fa-earth-asia", text: "Ayurvedic Wisdom" }
    ],
    categoriesHeader: {
        title: "Our Pure Essentials",
        subtitle: "Carefully formulated products for every part of your beauty ritual."
    },
    homeCategories: [
        { id: 'best-sellers', name: 'Best Sellers', icon: 'fas fa-star' },
        { id: 'body-care', name: 'Body Care', icon: 'fas fa-spa' },
        { id: 'hair-oils', name: 'Hair Care', icon: 'fas fa-pump-soap' },
        { id: 'face-masks', name: 'Face Care', icon: 'fas fa-mask' }
    ],
    aboutPage: {
        heroTitle: "About Anshu Care",
        heroSubtitle: "Our Roots",
        vision: {
            title: "Our Vision",
            text: "To be a global beacon of holistic wellness, reconnecting people with the healing power of nature."
        },
        mission: {
            title: "Our Mission",
            text: "To provide authentic, high-quality Ayurvedic products that nurture the body, mind, and soul."
        }
    },
    footer: {
        tagline: "Nature care",
        description: "Nature care for your holistic wellbeing. Premium ayurvedic solutions delivered to your doorstep.",
        quickLinks: [
            { text: "Home", url: "index.html" },
            { text: "Products", url: "products.html" },
            { text: "About Us", url: "about.html" },
            { text: "Contact Us", url: "contact.html" }
        ],
        legalLinks: [
            { text: "Privacy Policy", url: "privacy-policy.html" },
            { text: "Terms & Conditions", url: "terms-conditions.html" },
            { text: "Refund Policy", url: "refund-policy.html" },
            { text: "Sitemap", url: "#" }
        ],
        socialLinks: [
            { icon: "fab fa-instagram", url: "https://instagram.com" },
            { icon: "fab fa-whatsapp", url: "https://wa.me/919876543210" },
            { icon: "fab fa-youtube", url: "https://youtube.com" }
        ]
    }
};

const DEFAULT_SECTIONS = [
    { id: 'trending', name: 'Trending Now', description: 'Most loved products', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19' },
    { id: 'pure-essentials', name: 'Our Pure Essentials', description: 'Botanical extracts in their purest form.', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc' },
    { id: 'holistic-wellness', name: 'Wellness & Rituals', description: 'Experience the magic of Ayurvedic rituals.', image: 'https://images.unsplash.com/photo-1547793549-7038dd59b5cf' }
];

const DEFAULT_CATEGORIES = [
    { id: 'best-sellers', sectionId: 'trending', name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19' },
    { id: 'body-care', sectionId: 'pure-essentials', name: 'Body Care', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b' },
    { id: 'face-masks', sectionId: 'pure-essentials', name: 'Face Packs & Masks', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c' },
    { id: 'face-oils', sectionId: 'pure-essentials', name: 'Face Oils & Serums', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a' },
    { id: 'gels', sectionId: 'pure-essentials', name: 'Gels', image: 'https://images.unsplash.com/photo-1590136631351-3ec758652611' },
    { id: 'soaps', sectionId: 'pure-essentials', name: 'Soaps', image: 'https://images.unsplash.com/photo-1605264964528-06403738d6dc' },
    { id: 'hair-oils', sectionId: 'holistic-wellness', name: 'Hair Care Oils', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03' },
    { id: 'hair-products', sectionId: 'holistic-wellness', name: 'Hair Products', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f' },
    { id: 'wellness-rituals', sectionId: 'holistic-wellness', name: 'Wellness & Rituals', image: 'https://images.unsplash.com/photo-1547793549-7038dd59b5cf' },
    { id: 'lip-care', sectionId: 'pure-essentials', name: 'Lip Care', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' },
    { id: 'face-creams', sectionId: 'pure-essentials', name: 'Face Creams', image: 'https://images.unsplash.com/photo-1556228578-8c7c2f1f6c77' },
    { id: 'makeup', sectionId: 'pure-essentials', name: 'Eye & Makeup', image: 'https://images.unsplash.com/photo-1591360236480-9c6a4cb3a6de' }
];

const DEFAULT_PRODUCTS = [
    { id: 1, name: "Kumkumadi Face Oil", price: 890, category: "best-sellers", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "24K Gold Gel", price: 750, category: "best-sellers", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Premium Hair Oil", price: 950, category: "best-sellers", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Rose Face Wash (Mild)", price: 320, category: "pure-essentials", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "99% Pure Aloe Vera Gel", price: 350, category: "pure-essentials", image: "https://images.unsplash.com/photo-1590136631351-3ec758652611?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Sandalwood Face Serum", price: 950, category: "pure-essentials", image: "https://images.unsplash.com/photo-1547793549-7038dd59b5cf?auto=format&fit=crop&w=800&q=80" },
    { id: 7, name: "Rose Body Lotion", price: 450, category: "body-care", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "Vanilla Body Butter", price: 650, category: "body-care", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" },
    { id: 9, name: "24K Gold Face Oil", price: 1250, category: "face-oils", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80" },
    { id: 10, name: "Trifla Lip Scrub", price: 280, category: "lip-care", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80" },
    { id: 11, name: "Lavender Lip Balm", price: 180, category: "lip-care", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=800&q=80" }
];

const DEFAULT_BLOGS = [
    { id: 1, title: "Rituals of Radiance", date: "Feb 10, 2026", excerpt: "Discover the ancient secrets of Kumkumadi oil for a timeless glow.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800" },
    { id: 2, title: "The Power of Brahmi", date: "Feb 15, 2026", excerpt: "How this mystical herb transforms hair health from root to tip.", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800" }
];

let siteContent = JSON.parse(localStorage.getItem('anshu-care-content')) || DEFAULT_SITE_CONTENT;

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

siteContent = deepMerge(siteContent, DEFAULT_SITE_CONTENT);

// Migration: Fix default social links
if (siteContent.contact) {
    if (siteContent.contact.instagram === '#') siteContent.contact.instagram = "https://instagram.com";
    if (siteContent.contact.youtube === '#') siteContent.contact.youtube = "https://youtube.com";
}
if (siteContent.features && siteContent.features.length) {
    siteContent.features = siteContent.features.filter(f => f.text !== "Lab Tested");
}
if (siteContent.footer && siteContent.footer.socialLinks) {
    let modified = false;
    siteContent.footer.socialLinks.forEach(l => {
        if (l.url === '#') {
            if (l.icon.includes('instagram')) { l.url = "https://instagram.com"; modified = true; }
            if (l.icon.includes('youtube')) { l.url = "https://youtube.com"; modified = true; }
        }
    });
    // We don't necessarily need to save to LS here as we use siteContent in memory, but good practice if persisted
}
localStorage.setItem('anshu-care-content', JSON.stringify(siteContent));

let storedSections = JSON.parse(localStorage.getItem('anshu-care-sections'));
let siteSections = (storedSections && storedSections.length > 0) ? storedSections : DEFAULT_SECTIONS;
let storedCats = JSON.parse(localStorage.getItem('anshu-care-categories'));
let siteCategories = (storedCats && storedCats.length > 0) ? storedCats : DEFAULT_CATEGORIES;
let products = JSON.parse(localStorage.getItem('anshu-care-products')) || DEFAULT_PRODUCTS;
let blogs = JSON.parse(localStorage.getItem('anshu-care-blogs')) || DEFAULT_BLOGS;

if (!localStorage.getItem('anshu-care-sections')) localStorage.setItem('anshu-care-sections', JSON.stringify(DEFAULT_SECTIONS));
if (!localStorage.getItem('anshu-care-categories')) {
    localStorage.setItem('anshu-care-categories', JSON.stringify(DEFAULT_CATEGORIES));
    siteCategories = DEFAULT_CATEGORIES;
}
if (!localStorage.getItem('anshu-care-products')) localStorage.setItem('anshu-care-products', JSON.stringify(DEFAULT_PRODUCTS));
if (!localStorage.getItem('anshu-care-blogs')) localStorage.setItem('anshu-care-blogs', JSON.stringify(DEFAULT_BLOGS));

function applySiteContent() {
    siteContent = JSON.parse(localStorage.getItem('anshu-care-content')) || DEFAULT_SITE_CONTENT;
    siteSections = JSON.parse(localStorage.getItem('anshu-care-sections')) || DEFAULT_SECTIONS;
    siteCategories = JSON.parse(localStorage.getItem('anshu-care-categories')) || DEFAULT_CATEGORIES;
    products = JSON.parse(localStorage.getItem('anshu-care-products')) || DEFAULT_PRODUCTS;
    blogs = JSON.parse(localStorage.getItem('anshu-care-blogs')) || DEFAULT_BLOGS;

    // Inject Hero Data
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSub = document.querySelector('.hero-content span');
    const heroDesc = document.querySelector('.hero-content p');
    const heroImg = document.querySelector('.hero-img-main');

    if (heroTitle && siteContent.hero.title) heroTitle.innerText = siteContent.hero.title;
    if (heroSub && siteContent.hero.subtitle) heroSub.innerText = siteContent.hero.subtitle;
    if (heroDesc && siteContent.hero.description) heroDesc.innerText = siteContent.hero.description;
    if (heroImg && siteContent.hero.image) heroImg.src = siteContent.hero.image;

    // Inject Features
    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer && siteContent.features) {
        featuresContainer.innerHTML = siteContent.features.map(f => `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="${f.icon}"></i>
                <span>${f.text}</span>
            </div>
        `).join('');
    }

    // Inject Home Categories
    const homeCatGrid = document.getElementById('home-categories-grid');
    const homeCatTitle = document.getElementById('categories-title');
    const homeCatSub = document.getElementById('categories-subtitle');

    if (homeCatTitle && siteContent.categoriesHeader) homeCatTitle.innerText = siteContent.categoriesHeader.title;
    if (homeCatSub && siteContent.categoriesHeader) homeCatSub.innerText = siteContent.categoriesHeader.subtitle;

    if (homeCatGrid && siteCategories) {
        // Filter for "Pure Essentials" if strictly following design, or show top categories
        // We'll show top 4 from siteCategories for simple "Home Categories"
        // Or if siteContent.homeCategories exists, use that? 
        // Logic in admin.js suggests we manage siteCategories which are linked to sections.
        // Let's just render the first 4 siteCategories or specific ones.
        const catsToShow = siteCategories.slice(0, 4);
        homeCatGrid.innerHTML = catsToShow.map(c => `
            <div class="category-card" onclick="window.location.href='products.html#${c.id}'">
                 <div class="category-overlay">
                     <h3>${c.name}</h3>
                     <i class="fas fa-arrow-right" style="color:var(--accent);"></i>
                 </div>
                 <img src="${c.image}" class="category-img" alt="${c.name}">
             </div>
        `).join('');
    }

    // Inject Best Sellers
    const bestSellerTitle = document.getElementById('best-sellers-title');
    const bestSellerSub = document.getElementById('best-sellers-subtitle');
    const homeBestSellers = document.getElementById('home-best-sellers');

    // Inject About Section
    const aboutTitle = document.getElementById('about-title');
    const aboutText1 = document.getElementById('about-text-1');
    const aboutText2 = document.getElementById('about-text-2');
    const aboutImg = document.querySelector('#about img');

    if (aboutTitle) aboutTitle.innerText = siteContent.about.title;
    if (aboutText1) aboutText1.innerText = siteContent.about.text;
    if (aboutText2) aboutText2.innerText = siteContent.about.text2;
    if (aboutImg && siteContent.about.image) aboutImg.src = siteContent.about.image;


    // Inject Contact Data
    const contactTitle = document.getElementById('contact-title');
    const contactDesc = document.getElementById('contact-desc');
    const contactPhone = document.querySelector('#contact-phone-display');
    const contactPhoneLabel = document.getElementById('contact-phone-label');
    const contactAddress = document.getElementById('contact-address');
    const contactAddressLabel = document.getElementById('contact-address-label');

    if (contactTitle) contactTitle.innerText = siteContent.contact.title;
    if (contactDesc) contactDesc.innerText = siteContent.contact.description;
    if (contactPhone) contactPhone.innerText = siteContent.contact.phone;
    if (contactPhoneLabel) contactPhoneLabel.innerText = siteContent.contact.phoneLabel;
    if (contactAddress) contactAddress.innerHTML = siteContent.contact.address.replace(/\n/g, '<br>');
    if (contactAddressLabel) contactAddressLabel.innerText = siteContent.contact.addressLabel;


    // Inject Testimonials
    const testimonialContainer = document.getElementById('testimonials-container');
    const testimonialTitle = document.getElementById('testimonials-title');
    if (testimonialContainer && siteContent.testimonials) {
        testimonialContainer.innerHTML = siteContent.testimonials.map(t => `
            <div style="background: var(--white); padding: 2rem; border-radius: 20px; box-shadow: var(--shadow);">
                <div style="color: var(--accent); margin-bottom: 1rem;">
                    ${Array(t.rating).fill('<i class="fas fa-star"></i>').join('')}
                </div>
                <p style="font-style: italic; margin-bottom: 1.5rem; color:#555;">"${t.comment}"</p>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--secondary); display:flex; align-items:center; justify-content:center; color:var(--primary); font-weight:bold;">${t.name.charAt(0)}</div>
                    <strong>${t.name}</strong>
                </div>
            </div>
        `).join('');
    }

    // Inject Footer Data
    const footerDesc = document.getElementById('footer-description');
    const footerBottomTagline = document.getElementById('footer-bottom-tagline');
    const footerContent = document.querySelector('.footer-content');

    if (footerContent && siteContent.footer) {
        // Using selector logic to update parts efficiently
        if (footerDesc) footerDesc.innerText = siteContent.footer.description;
        if (footerBottomTagline) footerBottomTagline.innerText = siteContent.footer.tagline;

        const socialContainer = footerContent.querySelector('.footer-col:last-child div');
        if (socialContainer && siteContent.footer.socialLinks) {
            socialContainer.innerHTML = siteContent.footer.socialLinks.map(l =>
                `<a href="${l.url}" target="_blank" rel="noopener noreferrer" style="color: var(--white); transition: var(--transition);"><i class="${l.icon}"></i></a>`
            ).join('');
        }
    }

    // Update Floating WhatsApp
    const waFloat = document.querySelector('.whatsapp-float');
    if (waFloat && siteContent.contact.whatsapp) {
        // Sanitize: remove all non-digits (spaces, dashes, +, brackets)
        waFloat.href = `https://wa.me/${siteContent.contact.whatsapp.replace(/\D/g, '')}`;
    }

    // Best Sellers List
    if (homeBestSellers) {
        const bestSellers = products.filter(p => p.category === 'best-sellers').slice(0, 4);
        homeBestSellers.innerHTML = bestSellers.map(p => `
            <div class="product-card">
                <a href="product-detail.html?id=${p.id}" style="text-decoration: none; color: inherit; display: block;">
                    <div class="product-img-wrapper">
                        <img src="${p.image}" alt="${p.name}" class="product-img">
                        <button class="add-to-cart" onclick="event.preventDefault(); event.stopPropagation(); addToCart('${p.id}')"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="product-info">
                        <h4>${p.name}</h4>
                        <span class="price">₹${p.price}</span>
                    </div>
                </a>
            </div>
        `).join('');
    }

    // Dynamic Product Listing if on products.html
    const productGrid = document.querySelector('.product-listing .product-grid'); // Assumption based on previous knowledge or standard
    if (document.querySelector('.products-layout')) {
        renderDynamicCatalog();
    }
}

function renderDynamicCatalog() {
    const sidebar = document.querySelector('.filter-list');
    const grid = document.querySelector('.product-listing .product-grid') || document.querySelector('.products-layout .product-grid');

    if (sidebar && siteCategories) {
        sidebar.innerHTML = `
            <li><a href="#" class="active" onclick="event.preventDefault(); filterProducts('all', this)">All Collections</a></li>
            ${siteCategories.map(c => `<li><a href="#${c.id}" onclick="event.preventDefault(); filterProducts('${c.id}', this)">${c.name}</a></li>`).join('')}
        `;
    }

    if (grid && products) {
        grid.innerHTML = products.map(p => `
            <div class="product-card" data-category="${p.category}" onclick="window.location.href='product-detail.html?id=${p.id}'" style="cursor:pointer;">
                 <div class="product-img-wrapper">
                     <img src="${p.image}" class="product-img" alt="${p.name}">
                     <button class="add-to-cart" onclick="event.stopPropagation(); addToCart('${p.id}')"><i class="fas fa-plus"></i></button>
                 </div>
                 <div class="product-info">
                     <h4>${p.name}</h4>
                     <span class="price">₹${p.price}</span>
                 </div>
            </div>
        `).join('');

        const hash = window.location.hash.replace('#', '');
        if (hash) filterProducts(hash);
    }
}

window.filterProducts = function (catId, el) {
    document.querySelectorAll('.filter-list a').forEach(a => a.classList.remove('active'));

    if (el) {
        el.classList.add('active');
    } else {
        const link = document.querySelector(`.filter-list a[href="#${catId}"]`);
        if (link) link.classList.add('active');
    }

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (!card.dataset.category) return;
        if (catId === 'all' || card.dataset.category === catId) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem('anshu-care-cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        const existing = cart.find(item => item.id == product.id);
        if (existing) existing.quantity++;
        else cart.push({ ...product, quantity: 1 });
        localStorage.setItem('anshu-care-cart', JSON.stringify(cart));
        updateCartUI();
        alert('Added to cart');
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCountBtns = document.querySelectorAll('.cart-btn');

    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    cartCountBtns.forEach(btn => btn.innerHTML = `<i class="fas fa-shopping-cart" style="margin-right: 8px;"></i> Cart (${count})`);

    if (cartItems) {
        if (cart.length === 0) cartItems.innerHTML = '<p style="text-align:center; color:#777; margin-top:2rem;">Your cart is empty.</p>';
        else {
            cartItems.innerHTML = cart.map((item, idx) => `
                <div class="cart-item">
                    <img src="${item.image}" class="cart-item-img">
                    <div class="cart-item-info">
                        <span class="cart-item-title">${item.name}</span>
                        <div style="display:flex; justify-content:space-between;">
                            <span class="cart-item-price">₹${item.price}</span>
                            <span>x${item.quantity}</span>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${idx})" style="border:none; background:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');
        }
    }
    if (cartTotal) cartTotal.innerText = `₹${total}`;
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    localStorage.setItem('anshu-care-cart', JSON.stringify(cart));
    updateCartUI();
}

function updateAuthUI() {
    // Logic to toggle Sign In / Sign Out links based on localStorage user
    const user = localStorage.getItem('anshu-care-user');
    const signinTab = document.getElementById('nav-signin-tab');
    const signupTab = document.getElementById('nav-signup-tab');

    if (user) {
        if (signinTab) signinTab.style.display = 'none';
        if (signupTab) signupTab.innerText = 'My Account';
        if (signupTab) signupTab.href = 'account.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applySiteContent();
    updateCartUI();
    updateAuthUI();

    // Cart Modal Events
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn) cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cartOverlay.classList.add('active');
        cartModal.classList.add('active');
    });

    if (closeCart) closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        cartModal.classList.remove('active');
    });

    if (cartOverlay) cartOverlay.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        cartModal.classList.remove('active');
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
});
