import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../DB/model/user.model.js";
import { AppError, catchAsyncError } from "../../../utils/error.js";

export const signup = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new AppError("Email already exists", 400);
  const hashedPassword = bcrypt.hashSync(
    password,
    +process.env.BCRYPT_SALT_ROUNDS
  );
  await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ message: "Signup successfully" });
});

export const login = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid Credentials", 400);
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) throw new AppError("Invalid Credentials", 400);

  const token = jwt.sign(
    { id: user._id, name: user.name, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  res.json({ token });
});
