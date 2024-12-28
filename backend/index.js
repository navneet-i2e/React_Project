import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "navneet123",
  database: "test",
});

//had a authentication problem resolve by these code
//mysql -u root -p
//SELECT User, Host, plugin FROM mysql.user WHERE User = 'root';
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'navneet123';
//FLUSH PRIVILEGES;
//restart mysql server

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
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book added successfully");
  });
});


app.delete('/books/:id', (req, res) => {
  const id =req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, id, (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
})



const port = 8800;
app.listen(port, () => {
  console.log(`Connected to Backend at port : ${port}`);
});
