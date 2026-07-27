import { Router } from "express";
import {
  register,
  login,profile,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();
router.get("/profile", authenticate, profile);
router.post("/register", register);
router.post("/login", login);

export default router;