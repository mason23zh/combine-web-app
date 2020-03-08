const express = require('express');
const router = express.Router();
const expressHBS = require('express-handlebars');

router.get('/', (req, res) => {
    res.render('../views/games/index');
})

router.get('/tictactoe', (req, res) => {
    res.render('../views/games/tictactoe');
})







module.exports = router;