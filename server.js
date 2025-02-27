const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Настройка EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Подключение статических файлов
app.use(express.static(path.join(__dirname, "public")));

// Главная страница
app.get("/", (req, res) => {
  res.render("index", { title: "Главная" });
});

// Страница с случайным фактом
app.get("/fact", async (req, res) => {
  try {
    const response = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    res.render("fact", { title: "Случайный факт", fact: response.data.text });
  } catch (error) {
    res.render("fact", {
      title: "Случайный факт",
      fact: "Не удалось загрузить факт, попробуйте позже.",
    });
  }
});

// Статическая страница "О нас"
app.get("/about", (req, res) => {
  res.render("about", { title: "О нас" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
