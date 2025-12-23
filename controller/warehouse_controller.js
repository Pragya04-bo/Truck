import Warehouse from "../models/warehouse.js";
import { geocodeAddress } from "../utils/geocode.js";

export const createWarehouse = async (req, res, next) => {
  const { warehouseId, address } = req.body;

  if (!warehouseId || !address) {
    return res.status(400).json({
      success: false,
      message: "warehouseId and address are required",
    });
  }

  const coords = await geocodeAddress(address);

  const warehouse = await Warehouse.create({
    warehouseId,
    user: req.user._id,
    location: coords,
  });

  res.status(201).json({
    success: true,
    warehouse,
  });
};
