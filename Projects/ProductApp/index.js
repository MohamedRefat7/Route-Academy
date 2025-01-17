import express from "express";
import userRouter from "./routes/UserRouter.js";
import productRouter from "./routes/ProductRouter.js";

const app = express();
app.use(express.json()); // Ensure JSON parsing

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/DB", userRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Assignment 7 API");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
