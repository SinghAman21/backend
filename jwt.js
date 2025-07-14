const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const sk = 'nodesk';

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form data from POST requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Render the login page
app.get('/login', (req, res) => {
    res.render('jwt');
});

// Handle login form submission
app.post('/login', (req, res) => {
    // In real app, validate user credentials here
    const user = { id: 1, name: 'node', email: 'node@mail.com' };
    const token = jwt.sign({ user }, sk, { expiresIn: '1h' });
    res.render('jwt', { token }); // Pass token to view
});

// JWT verification middleware
function verifytoken(req, res, next) {
    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    jwt.verify(token, sk, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded.user;
        next();
    });
}

// Protected route
app.get('/protected', verifytoken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
