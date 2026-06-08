const express = require('express');

const app = express();

const mongoose = require('mongoose');

const usersRouter = require('./routes/users');

const authRouter = require('./routes/auth');

const auth = require('./middleware/auth');

const logger = require('./middleware/logger');

const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use(logger);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.send('Welcome Home 😈');
});

app.get('/about', (req, res) => {
    res.send('About Page 😏');
});

app.get('/user/:name', (req, res) => {

    console.log(req.params);

    res.send(`Hello ${req.params.name} 😈`);
});

app.get('/search', (req, res) => {

    console.log(req.query);

    res.send(`Hello ${req.query.name}, age ${req.query.age}`);

});

app.use('/auth', authRouter);

app.use('/users', auth, usersRouter);

// fallback route (keep last)
app.use((req, res) => {
    res.status(404).send('Karunya 😈 Page Not Found 😭');
});

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/familycare')
.then(() => {

    console.log('MongoDB Connected 😈');

    app.listen(3000, () => {
        console.log('Express server running on port 3000 😏');
    });

})
.catch((error) => {
    console.log(error);
});