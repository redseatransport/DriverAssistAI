import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "driverassist-super-secret-key";

export function generateToken(user: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}