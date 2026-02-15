const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL using environment variable
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Railway MySQL!");
});

// Get all fees
app.get("/api/fees", (req, res) => {
  db.query("SELECT * FROM fees", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Mark fee as paid (using id)
app.post("/api/fees/:id/pay", (req, res) => {
  const id = req.params.id;
  db.query("UPDATE fees SET first_Year_Due = 0 WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));