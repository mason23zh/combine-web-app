const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('../views/index/welcome');
});

router.get('/dashboard', (req, res) => {
  res.render('../views/index/dashboard');
});

module.exports = router;