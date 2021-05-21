// Set up dependencies

const express = require("express");
const path = require("path");

// Setup App
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Array of Notes

const db = [];

// Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(db));

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  // add new note to db.json
  db.push(newNote);
  res.json(db);
});

app.delete("/api/notes/:id", (req, res) => {
  const delNote = req.params.id;
  // remove note with index 'id' from db.json
  db.splice(delNote, 1);
  res.json(db);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
