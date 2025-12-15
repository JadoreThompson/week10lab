const express = require("express");
const cors = require("cors");
const connectDB = require("./MongoDBConnect");
const Book = require("./booksSchema");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Route 1: GET all books
app.get("/allbooks", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: err.message });
  }
});

// Route 2: GET single book by ID
app.get("/getbook/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: err.message });
  }
});

// Route 3: POST - Add new book
app.post("/addbooks", async (req, res) => {
  try {
    const newBook = new Book({
      booktitle: req.body.booktitle,
      PubYear: req.body.PubYear,
      author: req.body.author,
      Topic: req.body.Topic,
      formate: req.body.formate,
    });
    const savedBook = await newBook.save();
    res
      .status(201)
      .json({ message: "Book added successfully", book: savedBook });
  } catch (err) {
    res.status(400).json({ message: "Error adding book", error: err.message });
  }
});

// Route 4: POST - Update book by ID
app.post("/updatebook/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        booktitle: req.body.booktitle,
        PubYear: req.body.PubYear,
        author: req.body.author,
        Topic: req.body.Topic,
        formate: req.body.formate,
      },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating book", error: err.message });
  }
});

// Route 5: POST - Delete book by ID
app.post("/deleteBook/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
