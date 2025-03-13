// db.js
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "produk",
  password: "betran",
  port: 5432,
});
module.exports = pool;
