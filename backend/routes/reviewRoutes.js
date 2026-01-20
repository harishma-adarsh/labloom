const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitReview);
router.get('/:targetId', getReviews);

module.exports = router;
