import db from "../config/db.js";

export const createTables = async (req, res) => {
  try {
    const userTable = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role ENUM('user', 'admin') DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const productTable = `
      CREATE TABLE IF NOT EXISTS Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        price DECIMAL(10, 2),
        user_id INT,
        isDeleted BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      )
    `;

    const connection = await db.getConnection();
    await connection.execute(userTable);
    await connection.execute(productTable);
    connection.release();

    res.status(200).json({ message: "Tables created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;

  try {
    const connection = await db.getConnection();
    const [existingUser] = await connection.execute(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({ message: "User already exists" });
    }
    await connection.execute(
      "INSERT INTO Users (FirstName, LastName, email, password) VALUES (?, ?, ?, ?)",
      [FirstName, LastName, email, password]
    );
    connection.release();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await db.getConnection();
    const [user] = await connection.execute(
      "SELECT * FROM Users WHERE email = ? AND password = ?",
      [email, password]
    );
    connection.release();

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const alterUserTable = async (req, res) => {
  const { userId } = req.body;
  try {
    const connection = await db.getConnection();

    const [user] = await connection.execute(
      'SELECT * FROM Users WHERE id = ? AND role = "admin"',
      [userId]
    );
    if (user.length === 0) {
      connection.release();
      return res.status(403).json({ message: "Unauthorized" });
    }

    await connection.execute(
      "ALTER TABLE Users ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    );
    connection.release();

    res.status(200).json({ message: "Table altered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const truncateProductsTable = async (req, res) => {
  const { userId } = req.body;
  try {
    const connection = await db.getConnection();

    const [user] = await connection.execute(
      'SELECT * FROM Users WHERE id = ? AND role = "admin"',
      [userId]
    );
    if (user.length === 0) {
      connection.release();
      return res.status(403).json({ message: "Unauthorized" });
    }

    await connection.execute("TRUNCATE TABLE Products");
    connection.release();

    res.status(200).json({ message: "Products table truncated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
