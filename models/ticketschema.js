 import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: "Truck", required: true },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
  departure: { type: String }, 
  arrival: { type: String },
  deadline: { type: Date },
  shipmentVolume: { type: Number },
  weight: { type: Number },
  numberOfBoxes: { type: Number },
  state: {
    type: String,
    enum: ["Pending", "Approved", "Assigned", "Picked", "In Transit", "Delivered"],
    default: "Pending",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export { Ticket };
