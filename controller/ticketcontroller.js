import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";
import Ticket from "../models/ticketschema.js";
import Truck from "../models/truckschema.js";

 export const createTicket = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "Warehouse") {
    return next(new ErrHandler("Only warehouses can create shipments", 403));
  }

  const { weight, volume, boxes, destination, deadline } = req.body;

  if (!weight || !volume ||!destination ||!deadline) {
    return next(new ErrHandler("Please fill all shipment details", 400));
  }

  const ticket = await Ticket.create({
    warehouse: req.user._id,
    weight,
    volume,
    boxes,
    destination,
    deadline,
  });

  res.status(201).json({
    success: true,
    ticket,
  });
});

 export const getMyTickets = catchAsyncError(async (req, res, next) => {
  const tickets = await Ticket.find({ warehouse: req.user._id });

  res.status(200).json({
    success: true,
    tickets,
  });
});
