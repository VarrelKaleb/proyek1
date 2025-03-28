// index.js (gabungan)
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World from Express.js!");
});
app.post("/data", (req, res) => {
  const { nama } = req.body;
  res.send(`Data diterima: ${nama}`);
});
// CREATE
app.post("/produk", async (req, res) => {
  const { nama, harga } = req.body;
  try {
    const newProduk = await pool.query(
      "INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *",
      [nama, harga]
    );
    res.json(newProduk.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// READ
app.get("/produk", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produk");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan");
  }
});
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
