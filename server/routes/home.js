import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM books");
    const data = response.rows;
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ADD

router.post("/add", async (req, res) => {
  const { title, author, genre, publication_date, description } = req.body;

  try {
    const check = await pool.query("SELECT title FROM books WHERE title=$1", [
      title,
    ]);

    if (check.rowCount > 0) {
      return res.status(400).json("this book already exists !");
    }

    const response = await pool.query(
      "INSERT INTO books(title, author, genre, publication_date, description) VALUES ($1,$2,$3,$4,$5) RETURNING id",
      [title, author, genre, publication_date, description]
    );
    const data = response.rows[0];
    console.log(data.id);
    return res
      .status(201)
      .json({ message: "inserted successfully", id: data.id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_date, description } = req.body;

  try {
    const check = await pool.query("SELECT id FROM books WHERE id = $1", [id]);

    if (check.rowCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    const response = await pool.query(
      `UPDATE books 
         SET title = $1, author = $2, genre = $3, publication_date = $4, description = $5 
         WHERE id = $6 
         RETURNING id, title`,
      [title, author, genre, publication_date, description, id]
    );

    return res.status(200).json({
      message: "Updated successfully",
      updatedBook: response.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM books WHERE id= $1 RETURNING title",
      [id]
    );
    const data = response.rows[0].title;
    return res
      .status(200)
      .json({ message: `Book of title: ${data} is deleted successfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
