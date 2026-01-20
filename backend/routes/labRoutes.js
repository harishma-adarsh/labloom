const express = require('express');
const router = express.Router();
const { getLabs, getLabTests, addTest } = require('../controllers/labController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getLabs);
router.get('/:id/tests', getLabTests);
router.post('/tests', protect, addTest);
router.put('/availability', protect, require('../controllers/labController').updateAvailability);

module.exports = router;
