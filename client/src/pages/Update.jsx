import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    coverUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books`);
        const selectedBook = res.data.find((b) => b.id === parseInt(id));
        if (selectedBook) setBook(selectedBook);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${id}`, book);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={book.price}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
