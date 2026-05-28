const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/check', (req, res) => {
   res.json({
      success: true,
      message: "Auth Routes Working"
   });
});

router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router;
