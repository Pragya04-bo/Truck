 import razorpay from "../razorpay.js";
import Ticket from "../models/ticketschema.js";
import Truck from "../models/truckschema.js";
import crypto from "crypto";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";

// Create Razorpay Payment Order
export const createPaymentOrder = catchAsyncError(async (req, res, next) => {
  const { ticketId, amount } = req.body;

  // Check if ticket exists
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return next(new ErrHandler("Ticket not found", 404));
  }

  // Create Razorpay order
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert INR to paise
    currency: "INR",
    receipt: `ticket_${ticketId}`,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//  Verify Razorpay Payment & Assign Truck
export const verifyPayment = catchAsyncError(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId, truckId } = req.body;

  // Generate expected signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return next(new ErrHandler("Payment verification failed", 400));
  }

  // Payment verified → Assign truck
  const ticket = await Ticket.findById(ticketId);
  const truck = await Truck.findById(truckId);

  if (!ticket || !truck) {
    return next(new ErrHandler("Invalid ticket or truck", 404));
  }

  truck.booked = true;
  await truck.save();

  ticket.truckId = truck._id;
  ticket.state = "Assigned";
  await ticket.save();

  res.status(200).json({
    success: true,
    message: "Payment verified & truck assigned",
  });
});
