const express = require('express');
const router = express.Router();

// API Index
router.get('/', (req, res) => {
  res.json({ message: 'API Index' });
});

module.exports = router;