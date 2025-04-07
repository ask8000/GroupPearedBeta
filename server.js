// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database('data.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('hosting'));
app.set('view engine', 'ejs');

// Set up the database
db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    approved BOOLEAN DEFAULT FALSE
)`);

// Add this route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).send('Missing input fields.');
    }

    db.run('INSERT INTO submissions (name, message) VALUES (?, ?)', [name, message], function (err) {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }
        res.render('index', { successMessage: 'Your form has been submitted!' });
    });
});

// Admin page to view all submissions
app.get('/admin', (req, res) => {
    db.all('SELECT * FROM submissions', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }
        res.render('admin', { submissions: rows });
    });
});

// Approve a submission
app.post('/approve/:id', (req, res) => {
    db.run('UPDATE submissions SET approved = 1 WHERE id = ?', [req.params.id], function (err) {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }
        res.redirect('/admin');
    });
});

// Display approved submissions
app.get('/approved', (req, res) => {
    db.all('SELECT * FROM submissions WHERE approved = 1', (err, rows) => {
        if (err) {
            return res.status(500).send('Database error: ' + err.message);
        }
        res.render('approved', { submissions: rows });
    });
});

// Start the server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
