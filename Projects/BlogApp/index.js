const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog_app",
});

connection.connect((err) => {
  if (err) {
    console.log(`Error connecting to database: ${err.message}`);
  } else {
    console.log("Database connected successfully");
  }
});

app.get("/:id", (req, res) => {
  connection.execute(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: `fail to execute query: ${err.message}` });
      }
      return res.status(200).json({ message: "Done", data: result });
    }
  );
});

app.post("/signup", (req, res) => {
  const { email, password, first_name, last_name, gender } = req.body;
  connection.execute(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: `fail to execute query: ${err.message}` });
      if (result.length > 0)
        return res.status(400).json({ message: "Email already exists" });

      connection.execute(
        "INSERT INTO users(email, password, first_name, last_name, gender) VALUES(?, ?, ?, ?, ?)",
        [email, password, first_name, last_name, gender],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: `fail to execute query: ${err.message}` });
          return res
            .status(200)
            .json({ message: "User created successfully", data: result });
        }
      );
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.execute(
    "SELECT id, password FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: `Failed to execute query: ${err.message}` });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: "Invalid email. No account found with this email.",
        });
      }

      const user = result[0];
      if (user.password !== password) {
        return res
          .status(400)
          .json({ message: "Incorrect password. Please try again." });
      }
      return res
        .status(200)
        .json({ message: "Login successful", data: { id: user.id } });
    }
  );
});

app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, password } = req.body;
  connection.execute(
    "UPDATE users SET first_name = ?, password = ? WHERE id = ?",
    [first_name, password, id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: `Failed to execute query: ${err.message}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", data: result });
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  connection.execute("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: `Failed to execute query: ${err.message}` });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", data: result });
  });
});

app.get("/search", (req, res) => {
  const { first_name } = req.query;
  connection.execute(
    "SELECT first_name, last_name, email , gender FROM users WHERE first_name = ?",
    [first_name],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: `Failed to execute query: ${err.message}` });
      }
      if (results.length > 0) {
        return res
          .status(200)
          .json({ message: "Search results", data: results });
      }
      return res.status(404).json({ message: "No results found" });
    }
  );
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
