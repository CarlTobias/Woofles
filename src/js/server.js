// Letting the file know that you will be using express and path
const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const users = []

app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render('home.ejs', { name: users[1]})
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});

app.post('/login'), (req, res) => {

}

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
});

app.post('/signup', async (req, res) => {
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

app.listen(3000);