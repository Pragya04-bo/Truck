import Truck from "../models/truckschema.js";
import Ticket from "../models/ticketschema.js";
import Warehouse from "../models/warehouse.js";
import { haversineDistance } from "../utils/distance.js";
import { calculateScore } from "../utils/score.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrHandler from "../middlewares/error.js";

export const optimizeTrucks = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "Warehouse") {
    return next(new ErrHandler("Only warehouses can optimize trucks", 403));
  }

  const { ticketId } = req.body;

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return next(new ErrHandler("Ticket not found", 404));
  }

  const warehouse = await Warehouse.findById(ticket.warehouse);
  if (!warehouse) {
    return next(new ErrHandler("Warehouse not found", 404));
  }

  const trucks = await Truck.find({ booked: false });

  const scoredTrucks = trucks.map((truck) => {
    const distance = haversineDistance(
      warehouse.location.lat,
      warehouse.location.lng,
      truck.location.lat,
      truck.location.lng
    );

    const score = calculateScore({
      shipmentWeight: ticket.shipmentWeight,
      truckCapacity: truck.capacity,
      distance,
    });

    return {
      truck,
      distance,
      score,
    };
  });

  const bestTrucks = scoredTrucks
    .filter(t => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.status(200).json({
    success: true,
    bestTrucks,
  });
});
