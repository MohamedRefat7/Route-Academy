import express from "express";
import { sequelize } from "./src/models/index.js";
import userRoutes from "./src/routes/User.routes.js";
import postRoutes from "./src/routes/Post.routes.js";
import commentRoutes from "./src/routes/Comment.routes.js";

const app = express();
app.use(express.json());

// Use Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// Start Server
const PORT = 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
