const express = require("express");
const app = express();


const client = require("./server");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("Foydalanuvchi Bosh sahifaga kirdi");
  
  const db = client.db();

  db.collection("books")
    .find()
    .toArray()
    .then((books) => {
      res.render("home", { books: books });
    })
    .catch((err) => {
      console.log("Xatolik:", err);
      res.status(500).send("Bazada xatolik yuz berdi");
    });
});

app.get("/add-book", (req, res) => {
  res.render("add-book");
});

app.post("/add-book", (req, res) => {
  const db = client.db();
  const { title, author, genre } = req.body;

  const lowerGenre = genre ? genre.toLowerCase().trim() : "";
  let imageUrl = "/images/badiiy.png"; 

  if (lowerGenre.includes("diniy") || lowerGenre.includes("islom")) {
    imageUrl = "/images/diniy.png";
  } else if (lowerGenre.includes("ilmiy") || lowerGenre.includes("ilm")) {
    imageUrl = "/images/ilmiy.png";
  } else if (lowerGenre.includes("motivatsiya") || lowerGenre.includes("biznes")) {
    imageUrl = "/images/motivatsiya.png";
  } else if (lowerGenre.includes("badiiy")) {
    imageUrl = "/images/badiiy.png";
  }

  const newBook = {
    title: title,
    author: author,
    genre: genre,
    imageUrl: imageUrl
  };

  db.collection("books")
    .insertOne(newBook)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Xatolik:", err);
      res.status(500).send("Kitobni saqlab bo'lmadi");
    });
});

module.exports = app;