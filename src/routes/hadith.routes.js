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

router.get('/', getAllHadiths);
router.get('/search', searchHadiths);
router.get('/:id', getHadithById);
router.post('/', createHadith);
router.put('/:id', updateHadith);
router.delete('/:id', deleteHadith);

module.exports = router;