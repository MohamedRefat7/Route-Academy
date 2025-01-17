import connectDB from "./DB/connection.js";
import userRouter from "./Modules/user/user.controller.js";

const bootstrap = async (app, express) => {
  await connectDB();
  app.use(express.json());

  app.use("/user", userRouter);

  app.all("*", (req, res) => {
    return res.status(404).json({ message: "Not Found Handler!!!" });
  });
};

export default bootstrap;
