const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParse = require('cookie-parser');
const session = require('express-session');
const expresHBS = require('express-handlebars');
const path = require('path');
const bodyParse = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const revGeocode = require('./utils/reverseGeocode');
const forecast = require('./utils/forecast');
const moment = require('moment');

//*keys
const keys = require('../config/keys');

//*user model load
require('../models/User');

//*Passport config
require('../config/passport')(passport);

//* load ROUTES
const auth = require('../routes/auth');
const index = require('../routes/index');
const todolist = require('../routes/todolist');
const files = require('../routes/files');

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

app.use(
  express.json({
    limit: '1mb'
  })
);

app.use(flash());

app.use(express.static(path.join(__dirname, '../public')));

//*handlebar setup
//*Custom helper to display live time.
app.engine(
  'handlebars',
  expresHBS({
    defaultLayout: 'main',
    helpers: {
      displayTime: function() {
        const today = new Date();
        const hour = today.getHours();
        const minute = today.getMinutes();
        const seconds = today.getSeconds();
        const timeString = hour + ':' + minute + ':' + seconds;
        console.log('call back');
        setInterval(() => {
          (function() {})();
        }, 1000);

        return timeString;
      },

      displayTimeV2: function() {
        var timeString = '';
        setInterval(() => {
          const today = new Date();
          const hour = today.getHours();
          const minute = today.getMinutes();
          const seconds = today.getSeconds();
          timeString = hour + ':' + minute + ':' + seconds;
        }, 1000);
        return timeString;
      },
      displayTimeV3: function() {
        setTimeout(() => {
          return moment().format();
        }, 1000);
      }
    }
  })
);
app.set('view engine', 'handlebars');

//*body parser middleware
app.use(
  bodyParse.urlencoded({
    enteded: false
  })
);
app.use(bodyParse.json());

//*method-overide help PUT request
app.use(methodOverride('_method'));

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

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//*set global vers
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//*use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/todolist', todolist);
app.use('/files', files);

//* 404 and 500 Error
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((req, res) => {
  res.status(500);
  res.render('500');
});

app.listen(port, () => {
  console.log('server started on port: ' + port);
});
