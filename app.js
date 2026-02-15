require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, "public")));

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session configuration
app.use(
  session({
    secret: "ecoSecret",
    resave: false,
    saveUninitialized: false,
  })
);

/* ================= ROUTES ================= */

// Import routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

// Use routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/", productRoutes);

/* ================= DEFAULT ROUTE (Optional Safety) ================= */

app.get("/", (req, res) => {
  res.render("index"); // make sure index.ejs exists
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).send("Something went wrong!");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
