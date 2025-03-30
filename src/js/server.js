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
const mongoose = require('mongoose');

const User = require(path.join(__dirname, 'models', 'user'));
const userRoute = require(path.join(__dirname, 'routes', 'userRoute'));



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


app.use('/', userRoute);
app.listen(3000);