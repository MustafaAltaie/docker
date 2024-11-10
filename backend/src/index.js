const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const { initializePassport } = require('./auth');
const prisma = require('./prisma');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up session and passport
app.use(session({ secret: '4435966', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route
app.get('/clients', (req, res) => {
    res.send('Client list');
});

// Initialize Passport
initializePassport(passport);

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});