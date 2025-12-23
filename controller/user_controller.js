 import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";
import User from "../models/UserSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";
// register
 export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrHandler("Please fill complete registration form", 400));
  }

  if (!["Warehouse", "TruckDealer"].includes(role)) {
    return next(new ErrHandler("Invalid role", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrHandler("Email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });

  sendToken(user, 201, res, "User registered successfully");
});

/*  LOGIN   */
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrHandler("Please provide email, password and role", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrHandler("Invalid email or password", 401));
  }

  if (user.role !== role) {
    return next(new ErrHandler("User with this role not found", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res, "Login successful");
});

/*   LOGOUT   */
export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

/*  GET LOGGED-IN USER */
export const getUser = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
