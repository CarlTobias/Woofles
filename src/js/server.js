if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// Letting the file know that you will be using express and path
const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const initializePassport = require('./passport')
initializePassport(
    passport, 
    email => users.find(user => user.email === email), 
    id => users.find(user => user.id === id)
)

const users = []

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');





app.get('/', checkAuthenticated, (req, res) => {
    res.render('home.ejs', { name: req.user.name })
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/', 
    failureRedirect: '/login', 
    failureFlash: true
}))

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs')
});

app.post('/signup', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        users.push({
            id: Date.now().toString(), 
            name: req.body.username, 
            email: req.body.email, 
            password: hashedPassword
        });

        res.redirect('/login');
    } catch {
        res.redirect('/signup');
    }
    console.log(users);
});

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

app.listen(3000);