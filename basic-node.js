// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end('Hello Backend, We gonna rock!!!');
// });

// server.listen(3000, () => {
//     console.log('Server running on port 3000 😈');
// });

const http = require('http');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.end('Home Page 😈');
    }

    else if (req.url === '/about') {
        res.end('About Page 😏');
    }

    else {
        res.end('Page Not Found 😭');
    }

});

server.listen(3000, () => {
    console.log('Server running on port 3000 😈');
});

const math = require('./math');

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));