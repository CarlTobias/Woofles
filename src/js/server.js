if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// Letting the file know that you will be using express and path
const express = require('express');
const path = require('path');
const app = express();


const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require(path.join(__dirname, 'models', 'user'));
const userAuth = require(path.join(__dirname, 'routes', 'auth'));


const postRoute = require(path.join(__dirname, 'routes', 'uploadPosts'));


app.use(express.static(path.join(__dirname, '..', '..', 'public')));



const initializePassport = require('./passport')
initializePassport(
    passport, 
    async email => await User.findOne({ email }), 
    async id => await User.findById(id)
)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}));

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());


app.use('/', userAuth);

app.use('/', postRoute);










app.listen(3000);