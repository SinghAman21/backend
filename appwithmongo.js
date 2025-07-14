// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usermodel = require('./appwithusermodel');

const app = express();

// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/messwithdb');

// Basic route
app.get('/', (req, res) => {
    res.redirect('/display');
});

// Create user route - displays the form
app.get('/create', (req, res) => {
    res.render('create');
});

// Handle form submission to create a user
app.post('/create', async (req, res) => {
    const { username, email } = req.body;
    const newUser = new usermodel({ username, email });
    await newUser.save();
    res.redirect('/display');
});

// Update user route - displays the form with existing user data
app.get('/update/:id', async (req, res) => {
    const user = await usermodel.findById(req.params.id);
    if (user) {
        res.render('update', { user });
    } else {
        res.status(404).send("User not found");
    }
});

// Handle form submission to update a user
app.post('/update/:id', async (req, res) => {
    const { username, email } = req.body;
    await usermodel.findByIdAndUpdate(req.params.id, { username, email });
    res.redirect('/display');
});

// Display all users route
app.get('/display', async (req, res) => {
    const users = await usermodel.find();
    res.render('display', { users });
});

// Start the server
app.listen(3000, () => console.log("app.js is running on port 3000"));
