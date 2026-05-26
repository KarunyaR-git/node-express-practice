const express = require('express');

const app = express();

const usersRouter = require('./routes/users');

const auth = require('./middleware/auth');

const logger = require('./middleware/logger');

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

app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        //return res.status(400).send('Username and Password required 😭');

        return res.status(400).json({
            success: false,
            message: 'Username and Password required 😭'
        });
    }

    if (username === 'karunya' && password === '1234') {

        //return res.status(200).send('Login Success 😈');  // .send is for text/html

        return res.status(200).json({        // .send is for object/JSON
            success: true,
            message: 'Login Success 😈'
        });

    } 
    
    else {

        //return res.status(401).send('Invalid Credentials 😭');

        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials 😭'
        });

    }

});

app.use('/users', auth, usersRouter);

// fallback route (keep last)
app.use((req, res) => {
    res.status(404).send('Karunya 😈 Page Not Found 😭');
});

app.listen(3000, () => {
    console.log('Express server running on port 3000 😈');
});