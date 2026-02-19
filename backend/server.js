require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Import Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');
const Section = require('./models/Section');
const Blog = require('./models/Blog');
const SiteContent = require('./models/SiteContent');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Sync
sequelize.authenticate()
    .then(() => {
        console.log('SQL Database Connected');
        return sequelize.sync({ alter: true }); // Sync models to DB
    })
    .catch(err => console.log('Database Connection Error:', err));

// API Routes

// --- SITE CONTENT & THEME ---
app.get('/api/content', async (req, res) => {
    try {
        let [content, created] = await SiteContent.findOrCreate({
            where: { key: 'main' },
            defaults: { key: 'main' }
        });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/content', async (req, res) => {
    try {
        await SiteContent.update(req.body, { where: { key: 'main' } });
        const updated = await SiteContent.findByPk('main');
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- SECTIONS ---
app.get('/api/sections', async (req, res) => {
    try {
        const sections = await Section.findAll();
        res.json(sections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/sections', async (req, res) => {
    try {
        const section = await Section.create(req.body);
        res.status(201).json(section);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/sections/:id', async (req, res) => {
    try {
        await Section.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Section removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CATEGORIES ---
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/categories/:id', async (req, res) => {
    try {
        await Category.update(req.body, { where: { id: req.params.id } });
        const updated = await Category.findByPk(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        await Category.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Category removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- BLOGS ---
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await Blog.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        await Product.update(req.body, { where: { id: req.params.id } });
        const updated = await Product.findByPk(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- ORDERS ---
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/api/orders/:id', async (req, res) => {
    try {
        await Order.update(req.body, { where: { id: req.params.id } });
        const updated = await Order.findByPk(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Order removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
