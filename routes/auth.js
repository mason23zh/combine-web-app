const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));


router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }), (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get('/verify', (req, res) => {
    if (req.user) {
        console.log(req.user);
    } else {
        console.log('not auth');
    }
})

router.get('/logout', (req, res) => {
    req.logOut();
    console.log('log out');
    res.redirect('/');
});

router.get('/testAuth', (req, res) => {
    if (req.user) {
        res.send(req.user);
    }
})


module.exports = router;