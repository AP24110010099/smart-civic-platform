const express = require("express");
const cors = require("cors");

// Database connection
const connectDB = require("./config/db");

// Routes
const issueRoutes = require("./routes/issueRoutes");


const app = express();

// 🔥 Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/issues", issueRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Smart Civic Platform Backend is running");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
