require("dotenv").config();   // 🔥 Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2');

const app = express();

/* ================= DATABASE CONNECTION ================= */

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ MySQL Connected...');
    }
});

// Make db accessible in routes
module.exports.db = db;

/* ================= MIDDLEWARE ================= */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
