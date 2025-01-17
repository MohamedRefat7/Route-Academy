import db from "../config/db.js";

// Products
export const addProduct = async (req, res) => {
  const { name, price, user_id } = req.body;
  try {
    const connection = await db.getConnection();
    await connection.execute(
      "INSERT INTO Products (name, price, user_id) VALUES (?, ?, ?)",
      [name, price, user_id]
    );
    connection.release();
    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//products/soft-delete/:id
export const softDeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.getConnection();
    await connection.execute(
      "UPDATE Products SET isDeleted = TRUE WHERE id = ?",
      [id]
    );
    connection.release();
    return res
      .status(200)
      .json({ message: "Product soft deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.getConnection();
    await connection.execute("DELETE FROM Products WHERE id = ?", [id]);
    connection.release();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//products/searchByName
export const searchByName = async (req, res) => {
  const { name } = req.query;
  try {
    const connection = await db.getConnection();
    const [products] = await connection.execute(
      "SELECT * FROM Products WHERE name LIKE ?",
      [`%${name}%`]
    );
    connection.release();
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//products/getProductById
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await db.getConnection();
    const [product] = await connection.execute(
      "SELECT * FROM Products WHERE id = ?",
      [id]
    );
    connection.release();
    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//getNonDeletedProducts
export const getNonDeletedProducts = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [products] = await connection.execute(
      "SELECT name AS productName, price AS cost FROM Products WHERE isDeleted = FALSE"
    );
    connection.release();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getProductWithUser
export const getProductsWithUsers = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [products] = await connection.execute(`
            SELECT 
                Products.name AS productName,
                Users.FirstName AS userFirstName, 
                Users.email AS userEmail
            FROM Products
            JOIN Users ON Products.user_id = Users.id
        `);
    connection.release();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//products/maxPrice
export const getMaxPrice = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [maxPrice] = await connection.execute(
      "SELECT MAX(price) AS maxPrice FROM Products"
    );
    connection.release();

    res.status(200).json(maxPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//products/top-Expensive
export const getTopExpensiveProducts = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [products] = await connection.execute(
      "SELECT name, price FROM Products ORDER BY price DESC LIMIT 5"
    );
    connection.release();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
