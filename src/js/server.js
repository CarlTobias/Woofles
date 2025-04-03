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

const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

const User = require(path.join(__dirname, 'models', 'user'));
const userRoute = require(path.join(__dirname, 'routes', 'auth'));
const postRoute = require(path.join(__dirname, 'routes', 'posts'));

const Post = require('./models/post');





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
app.use(fileUpload());
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

app.use(fileUpload());
app.use('/', userRoute);
app.use('/posts', postRoute);


app.get('/', async (req, res) => {
    res.render('home', { posts }); // Passing 'posts' to home.ejs
    
    try {
        const posts = await Post.find(); // Fetch posts from MongoDB
        console.log("Posts variable before rendering:", posts);

        console.log("Posts fetched:", posts); // Debugging

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send("Error loading posts");
    }
});




app.listen(3000);