import jwt from "jsonwebtoken";
import { AppError, catchAsyncError } from "../../../utils/error.js";

export const verifyToken = () =>
  catchAsyncError(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) throw new AppError("Please SignUp", 401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new AppError("Invalid token", 498);

      req.user = decoded;
      next();
    });
  });
