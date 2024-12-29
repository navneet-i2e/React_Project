import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "navneet123",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello this is a backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.price];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book added successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, id, (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? WHERE id = ?";
  const values = [req.body.title, req.body.desc, req.body.price];

  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book updated successfully");
  });
});

const port = 8800;
app.listen(port, () => {
  console.log(`Connected to Backend at port : ${port}`);
});
