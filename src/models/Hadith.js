const mongoose = require('mongoose');

const hadithSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    // যেমন: "Sahih Bukhari", "Sahih Muslim"
  },
  chapterName: String,
  hadithNumber: Number,
  arabic: {
    type: String,
    required: true,
  },
  bangla: String,
  english: String,
  narrator: String, // রাবি
  grade: {
    type: String,
    enum: ['Sahih', 'Hasan', 'Daif', 'Maudu'],
  },
  tags: [String], // ["prayer", "fasting", "charity"]
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
}, { timestamps: true });

module.exports = mongoose.model('Hadith', hadithSchema);