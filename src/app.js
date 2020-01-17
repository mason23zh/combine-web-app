const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParse = require('cookie-parser');
const session = require('express-session');
const expresHBS = require('express-handlebars');
const path = require('path');

//*keys
const keys = require('../config/keys');

//*user model load
require('../models/User');

//*Passport config
require('../config/passport')(passport);

//* load ROUTES
const auth = require('../routes/auth');
const index = require('../routes/index');

//* Global promises
mongoose.Promise = global.Promise;

//*Database connection
const dbURL =
  'mongodb://zhengyang:Zzy1229!@ds263808.mlab.com:63808/multifunctionweb-dev?connect=replicaSet';

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log('Smthing is wrong with MDB:' + err));

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

//*handlebar setup
app.engine(
  'handlebars',
  expresHBS({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

//*port set
const port = process.env.PORT || 5000;

//*set up cookie and session
app.use(cookieParse());
app.use(
  session({
    secret: 'scret',
    resave: false,
    saveUninitialized: false
  })
);

//*passport middleware
app.use(passport.initialize());
app.use(passport.session());

//*set global vers
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//*use routes
app.use('/', index);
app.use('/auth', auth);

app.listen(port, () => {
  console.log('server started on port: ' + port);
});
