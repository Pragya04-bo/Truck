 import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";
import Ticket from "../models/ticketschema.js";
import Warehouse from "../models/warehouse.js";


// ================= CREATE TICKET =================
export const createTicket = catchAsyncError(async (req, res, next) => {
  // 1️⃣ Role check
  if (req.user.role !== "Warehouse") {
    return next(new ErrHandler("Only warehouses can create shipments", 403));
  }

  const {
    shipmentWeight,
    shipmentVolume,
    numberOfBoxes,
    deadline,
  } = req.body;

  if (!shipmentWeight || !shipmentVolume || !deadline) {
    return next(new ErrHandler("Please fill all shipment details", 400));
  }

  // 2️⃣ Find warehouse linked to this user
  const warehouse = await Warehouse.findOne({ user: req.user._id });

  if (!warehouse) {
    return next(new ErrHandler("Warehouse profile not found", 404));
  }

  // 3️⃣ Create ticket
  const ticket = await Ticket.create({
    warehouse: warehouse._id,
    shipmentWeight,
    shipmentVolume,
    numberOfBoxes,
    deadline,
  });

  res.status(201).json({
    success: true,
    ticket,
  });
});


// ================= GET MY TICKETS =================
export const getMyTickets = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "Warehouse") {
    return next(new ErrHandler("Unauthorized access", 403));
  }

  const warehouse = await Warehouse.findOne({ user: req.user._id });

  const tickets = await Ticket.find({ warehouse: warehouse._id })
    .populate("truck")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    tickets,
  });
});
