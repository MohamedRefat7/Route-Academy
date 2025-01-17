import { DataTypes } from "sequelize";
import sequelize from "../DB/db.connection.js";
import Post from "./Post.models.js";

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3],
        msg: "Name must be at least 3 characters long.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: "Password must be at least 6 characters long.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Invalid email format.",
      },
    },
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

User.addHook("beforeCreate", (user) => {
  if (user.name.length < 3) {
    throw new Error("Name must be greater than 2 characters.");
  }
});

export default User;
