const mongoose = require('mongoose');

const duaSchema = new mongoose.Schema({
  title: {
    bangla: { type: String, required: true },
    english: { type: String, required: true },
  },
  arabic: {
    type: String,
    required: true,
  },
  transliteration: {
    bangla: String,
    english: String,
  },
  translation: {
    bangla: String,
    english: String,
  },
  benefit: {
    bangla: String,
    english: String,
  },
  reference: String,
  occasion: {
    bangla: String,
    english: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  audioUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Dua', duaSchema);