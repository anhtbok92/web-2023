A. Start the MongoDB shell by running the following command in your terminal or command prompt:

```
mongo
```
B. Connect to the desired database or create a new database by running the following command, replacing <db_name> with the desired database name:

```
use <db_name>
```

C. Create a collection for books by running the following command, replacing <collection_name> with the desired collection name:

```
db.createCollection("<collection_name>")
```

D. Insert a book into the collection by running the following command:

```
db.<collection_name>.insert({ title: "Book 1", author: "Author 1" })
```

E. Find all books in the collection by running the following command:

```
db.<collection_name>.find()
```

F. Find a specific book in the collection by running the following command, replacing <book_id> with the desired book's ID:

```
db.<collection_name>.find({ _id: ObjectId("<book_id>") })
```

G. Update a book in the collection by running the following command, replacing <book_id> with the desired book's ID:

```
db.<collection_name>.update({ _id: ObjectId("<book_id>") }, { $set: { title: "New Book Title", author: "New Author" } })
```

H. Delete a book from the collection by running the following command, replacing <book_id> with the desired book's ID:

```
db.<collection_name>.remove({ _id: ObjectId("<book_id>") })
```

1. Insert a book into the collection

```
db.table2.insertOne({
  "title": "The Diary of a Young Girl",
  "author": "Anne Frank",
  "publication_date": "1947-06-25",
  "pages": 267,
  "genres": ["Autobiography", "Diary"],
  "publisher": {
    "name": "Contact Publishing",
    "location": "Amsterdam, Netherlands"
  }
})
```

2. Find all books in the collection

```
db.books.find({})
```

3. Find a specific book in the collection with pages > 400 and genres.length == 2

```
db.table2.find({
  pages: { $gt: 400 },
  genres: { $size: 2 }
})
```

4. Update all field of a book in the collection with title is "One Hundred Years of Solitude"

```
db.table2.updateOne(
  { title: "One Hundred Years of Solitude" },
  {
    $set: {
      title: "One Hundred Years of Solitude",
      author: "Gabriel García Márquez",
      pages: 417,
      publication_date: new Date("1967-06-01T00:00:00Z"),
      genres: ["Magical Realism", "Fiction"],
      publisher: {
        name: "Harper & Row",
        location: "New York"
      }
    }
  }
)
```

5. Delete a book from the collection by ID = 5f5a1874b8057f8f05e34f61

```
db.books.deleteOne({ _id: ObjectId("5f5a1874b8057f8f05e34f61") });
```