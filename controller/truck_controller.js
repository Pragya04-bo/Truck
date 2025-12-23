import Truck from "../models/truck.js";
import { geocodeAddress } from "../geocode.js";

export const addTruck = async (req, res, next) => {
  const { truckId, address, capacity, truckType, driverName } = req.body;

  if (!truckId || !address || !capacity) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  const coords = await geocodeAddress(address);

  const truck = await Truck.create({
    truckId,
    truckDriver: driverName,
    capacity,
    truckType,
    location: coords,
    dealer: req.user._id,
  });

  res.status(201).json({
    success: true,
    truck,
  });
};
