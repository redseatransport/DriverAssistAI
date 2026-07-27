import type { Request, Response } from "express";

import { registerSchema } from "../validators/auth.validator";
import { registerUser } from "../services/auth.service";
import { loginSchema } from "../validators/auth.validator";
import { loginUser } from "../services/auth.service";
import type { AuthRequest } from "../middleware/auth.middleware";




// regestr
export async function register(req: Request, res: Response) {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
// login


export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    res.json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}
//profile


export async function profile(
  req: AuthRequest,
  res: Response
) {
  res.json({
    success: true,
    user: req.user,
  });
}