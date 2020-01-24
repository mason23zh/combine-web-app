const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../helper/auth');

require('../models/Todolist');
const Todolist = mongoose.model('todolist');

router.get('/', ensureAuthenticated, (req, res) => {
  Todolist.find({
      user: req.user._id
    })
    .sort({
      date: 'desc'
    })
    .then(todolist => {
      console.log('display todolist: ' + todolist);
      res.render('todolist/index', {
        todolist
      });
    });
});

router.get('/add', (req, res) => {
  res.render('todolist/add');
});

//*display edit to-do list
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  //console.log('display req user from edit get router::::::' + req.user);
  //console.log('NEXT:' + req.params);
  Todolist.findOne({
    _id: req.params.id
  }).then(todolist => {
    if (todolist.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized');
      res.redirect('/todolist');
    } else {
      //console.log('render edit page.');
      res.render('todolist/edit', {
        todolist: todolist
      });
    }
  });
});

router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({
      text: 'Please add a title'
    });
  }
  if (!req.body.details) {
    errors.push({
      text: 'Please add some details'
    });
  }

  if (errors.length > 0) {
    res.render('/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user._id
    };
    new Todolist(newUser).save().then(todolist => {
      req.flash('success_msg', 'to-do list added');
      res.redirect('/todolist');
    });
    //console.log('new massage saved.');
  }
});

//* make change to edit
router.put('/:id', ensureAuthenticated, (req, res) => {
  Todolist.findById(req.params.id)
    .then(todolist => {
      console.log('NEW TO DO LIST::::' + todolist);
      // new values
      todolist.title = req.body.title;
      todolist.details = req.body.details;

      todolist.save().then(todolist => {
        req.flash('success_msg', 'To-do list updated');
        res.redirect('/todolist');
      });
    })
    .catch(() => {
      res.redirect('/todolist');
    });
});

// Delete list
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Todolist.remove({
    _id: req.params.id
  }).then(() => {
    req.flash('success_msg', 'To-do list removed');
    res.redirect('/todolist');
  });
});

module.exports = router;