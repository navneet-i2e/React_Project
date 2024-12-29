import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Book Store</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <div className="book-content">
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>${book.price}</span>
            </div>
            <div className="button-wrapper">
              <button onClick={() => navigate(`/update/${book.id}`)}>
                Update
              </button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-book-btn">
        <Link to="/add" className="react-router-link">
          Add New Book
        </Link>
      </button>
    </div>
  );
};

export default Books;
