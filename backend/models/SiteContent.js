const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'main' },
    hero: {
        title: String,
        subtitle: String,
        description: String,
        image: String
    },
    about: {
        title: String,
        text: String,
        text2: String,
        image: String,
        values: [{ icon: String, text: String }]
    },
    contact: {
        title: String,
        description: String,
        email: String,
        phone: String,
        phoneLabel: String,
        address: String,
        addressLabel: String,
        whatsapp: String,
        instagram: String,
        youtube: String
    },
    testimonials: [{
        name: String,
        comment: String,
        rating: Number
    }],
    features: [{
        icon: String,
        text: String
    }],
    categoriesHeader: {
        title: String,
        subtitle: String
    },
    footer: {
        tagline: String,
        description: String,
        quickLinks: [{ text: String, url: String }],
        legalLinks: [{ text: String, url: String }],
        socialLinks: [{ icon: String, url: String }]
    },
    theme: {
        primary: String,
        secondary: String,
        accent: String,
        bg: String,
        text: String
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
