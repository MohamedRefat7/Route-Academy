import { connectDB } from "./DB/connection.js";
import empRouter from "../src/Modules/Employee/emp.controller.js";

const bootstrap = async (app, express) => {
  await connectDB();

  app.use(express.json());
  app.use("/employee", empRouter);

  app.all("*", (req, res) => {
    return res.status(404).json({ message: "Not Found Handler!!!" });
  });
};
export default bootstrap;
