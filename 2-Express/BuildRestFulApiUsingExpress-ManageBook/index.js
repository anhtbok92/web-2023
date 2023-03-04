const express = require("express");
const app = express();
const port = 3001;
// const Joi = require("@hapi/joi");
const Joi = require('joi');

// Lấy dữ liệu dạng JSON từ body
app.use(express.json());

let books = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" }
];

const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required()
});

// Create a book
app.post("/books", (req, res) => {
    const validationResult = bookSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    res.send(book);
});

// Read all books
app.get("/books", (req, res) => {
    res.send(books);
});

// Read a single book
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send("The book with the given ID was not found.");
    res.send(book);
});

// Update a book
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send("The book with the given ID was not found.");

    const validationResult = bookSchema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    book.title = req.body.title;
    book.author = req.body.author;
    res.send(book);
});

// Delete a book
app.delete("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send("The book with the given ID was not found.");
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

app.listen(port, () => {
    console.log(`Book API server listening at http://localhost:${port}`);
});
