const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String, required: true },
    userInfo: { type: String, required: true }
});

module.exports = mongoose.model('Ad', adSchema);