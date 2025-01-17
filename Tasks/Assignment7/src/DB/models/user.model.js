import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      minLength: [3, "User name must be at least 3 characters"],
      maxLength: [20, "User name must be at most 50 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18 years"],
      max: [100, "Age must be at most 100 years"],
      //   Validate: {
      //     validator: function (value) {
      //       return !(value < 18);
      //     },
      //     message: (props) =>
      //       `${props.value} is not a valid age! Age must be at least 18 years`,
      //   },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [20, "Password must be at most 20 characters"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
