const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",              // your MySQL username
  password: "@Avvnbssk3",    // your MySQL password
  database: "feesystem"
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

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));