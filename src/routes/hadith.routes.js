const express = require('express');
const router = express.Router();
const {
  getAllHadiths,
  getHadithById,
  createHadith,
  updateHadith,
  deleteHadith,
  searchHadiths,
} = require('../controllers/hadith.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.get('/', getAllHadiths);
router.get('/search', searchHadiths);
router.get('/:id', getHadithById);

router.post('/',authMiddleware, createHadith);
router.put('/:id',authMiddleware, updateHadith);
router.delete('/:id',authMiddleware, deleteHadith);

module.exports = router;