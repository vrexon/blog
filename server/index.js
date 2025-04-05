const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3000;

const db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL CHECK(length(username) <= 30),
  title TEXT NOT NULL CHECK(length(title) <= 200),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/posts", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/posts", express.json(), (req, res) => {
  console.log(req.body);
  const { username, title, content } = req.body;

  if (!username || !title || !content) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  if (username.length > 30) {
    res.status(400).json({ error: "Username is too long" });
    return;
  }
  if (title.length > 200) {
    res.status(400).json({ error: "Title is too long" });
    return;
  }

  db.run(
    "INSERT INTO posts (username, title, content) VALUES (?, ?, ?)",
    [username, title, content],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      db.get("SELECT * FROM posts WHERE id = ?", [this.lastID], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(row);
      });
    }
  );
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
