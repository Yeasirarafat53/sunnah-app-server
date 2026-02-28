const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    bangla: { type: String, required: true },
    english: { type: String, required: true },
  },
  type: {
    type: String,
    enum: ['hadith', 'dua', 'both'],
    default: 'both',
  },
  icon: String,
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);