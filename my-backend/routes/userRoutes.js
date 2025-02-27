const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User GET route');
});

router.post('/', (req, res) => {
  res.send('User POST route');
});

module.exports = router;