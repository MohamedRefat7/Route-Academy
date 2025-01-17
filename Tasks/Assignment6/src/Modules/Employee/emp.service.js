import { ObjectId } from "mongodb";
import Employee from "../../DB/models/emp.model.js";
import e from "express";

export const createEmp = async (req, res) => {
  try {
    await Employee.insertOne({ ...req.body });
    return res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const getEmp = async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await Employee.findOne({
      _id: ObjectId.createFromHexString(empId),
    });
    return res
      .status(200)
      .json({ message: "Employee fetched successfully", employee });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const getAllEmp = async (req, res) => {
  try {
    // const employees = await Employee.find().toArray();
    const employees = await Employee.find()
      .sort({ name: 1 })
      .project({ name: 1, age: 1, _id: 0 })
      .toArray();
    return res
      .status(200)
      .json({ message: "All Employees fetched successfully", employees });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateEmp = async (req, res) => {
  try {
    const { empId } = req.params;
    const { projects, ...rest } = req.body;
    const employee = await Employee.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(empId) },
      {
        $set: projects ? { ...rest } : { ...req.body },
        $push: { ...(projects && { projects: { $each: projects } }) },
      },
      { returnDocument: "after" }
    );
    return res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const deleteEmp = async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await Employee.findOneAndDelete({
      _id: ObjectId.createFromHexString(empId),
    });

    return employee
      ? res
          .status(200)
          .json({ message: "Employee deleted successfully", employee })
      : res.status(404).json({ message: "Employee not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
