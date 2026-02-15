const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2');

const app = express();

/* ================= DATABASE CONNECTION ================= */

const db = mysql.createConnection({
     host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('✅ MySQL Connected...');
    }
});

// Make db accessible in routes
module.exports.db = db;

/* ================= MIDDLEWARE ================= */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'ecoSecret',
    resave: false,
    saveUninitialized: true
}));

/* ================= ROUTES ================= */

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/', productRoutes);

/* ================= SERVER ================= */

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
