const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "ColeGarboski",
  password: "",
  database: "gastracker",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Get all items from the database
app.get("/items", (req, res) => {
  connection.query("SELECT * FROM price", (err, results) => {
    if (err) {
      console.log("Error fetching items:", err);
      res.status(500).send("Error fetching items");
      return;
    }
    res.json(results);
  });
});

// Get a specific item by ID
app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  connection.query(
    "SELECT * FROM company WHERE CompanyID = ?",
    [itemId],
    (err, results) => {
      if (err) {
        console.log("Error fetching item:", err);
        res.status(500).send("Error fetching item");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("Item not found");
        return;
      }
      res.json(results[0]);
    }
  );
});

// Add a new item to the database
app.post("/items", (req, res) => {
  const newItem = req.body;
  connection.query("INSERT INTO items SET ?", newItem, (err, result) => {
    if (err) {
      console.log("Error adding item:", err);
      res.status(500).send("Error adding item");
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Update an existing item in the database
app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  connection.query(
    "UPDATE items SET ? WHERE id = ?",
    [updatedItem, itemId],
    (err, result) => {
      if (err) {
        console.log("Error updating item:", err);
        res.status(500).send("Error updating item");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Item not found");
        return;
      }
      res.status(200).send("Item updated successfully");
    }
  );
});

// Delete an item from the database
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  connection.query("DELETE FROM items WHERE id = ?", [itemId], (err, result) => {
    if (err) {
      console.log("Error deleting item:", err);
      res.status(500).send("Error deleting item");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Item not found");
      return;
    }
    res.status(200).send("Item deleted successfully");
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});