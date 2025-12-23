import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createPaymentOrder);
router.post("/verify", isAuthenticated, verifyPayment);

export default router;
