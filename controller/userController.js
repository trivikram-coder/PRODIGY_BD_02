const User = require("../models/User");
const crypto = require("crypto");

/* ================= CREATE USER ================= */
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Required fields check
    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: "Please enter required fields",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = new User({
      uId: crypto.randomUUID(),
      name,
      email,
      age,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET ALL USERS ================= */
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= GET USER BY ID ================= */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ uId: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE USER ================= */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const user = await User.findOne({ uId: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Partial update
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (age !== undefined) user.age = age;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE USER ================= */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndDelete({ uId: id });
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
