import userModel from "../../DB/models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const user = new userModel({ ...req.body });
    await user.save();

    return res.status(200).json({ success: true, results: user });
  } catch (error) {
    return res.status(500).json({ messge: error.message, stack: error.stack });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId, "userName age email -_id");
    return user
      ? res.status(200).json({ success: true, results: user })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ messge: error.message, stack: error.stack });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { age } = req.query;
    const user = await userModel.find({ age: { $gte: age } });
    return res.status(200).json({ success: true, results: user });
  } catch (error) {
    return res.status(500).json({ messge: error.message, stack: error.stack });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true } //very important
    );
    return user
      ? res.status(200).json({ success: true, results: user })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ messge: error.message, stack: error.stack });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId, { ...req.body });
    return user
      ? res.status(200).json({ success: true, results: user })
      : res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ messge: error.message, stack: error.stack });
  }
};
