const express = require('express');
const router = express.Router();
router.get('/tictactoe', (req, res) => {
    res.render('games/tictactoe');
})


module.exports = router;