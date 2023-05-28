import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genereateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    genereateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// @desc Register new user
// route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    genereateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(500);
    throw new Error("Invalid details");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// @desc Get user profile
// route Get /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  // const user = {
  //   _id: req.user._id,
  //   name: req.body.name || req.user.name,
  //   email: req.body.email || req.user.email,
  // }

  const user = await User.findByIdAndUpdate(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "Update user profile" });
});
