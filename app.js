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


module.exports = app;