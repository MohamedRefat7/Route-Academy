import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "product_app", // Database name
});

db.getConnection()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

export default db;
