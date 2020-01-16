const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//*Passport config
require('../config/passport')(passport);

//* load ROUTES
const auth = require('../routes/auth');

const app = express();

//*port set
const port = process.env.PORT || 5000;


//*router
app.get('/', (req, res) => {
    res.send('first page');
});

app.use('/auth', auth)





app.listen(port, () => {
    console.log('server started on port: ' + port);
});