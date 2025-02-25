import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "book_catalog",
  password: "admin",
  port: 5432,
});

export default pool;
