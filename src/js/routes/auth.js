const express = require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require(path.join(__dirname, '..', 'models', 'user'));


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    };

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}


router.get('/', checkAuthenticated, (req, res) => {
    res.render('home.ejs', { name: req.user.name });
});


// Register
router.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            id: Date.now().toString(),
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login');

    } catch (e) {
        res.redirect('/signup');
    }
});

// Login
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login', 
    failureFlash: true
}));

// Not there yet
// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;