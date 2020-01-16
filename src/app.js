const express = require('express');
const mongoose = require('mongoose');

const app = express();

//*port set
const port = process.env.PORT || 5000;


//*router
app.get('/', (req, res) => {
    res.send('first page');
});





app.listen(port, () => {
    console.log('server started on port: ' + port);
});