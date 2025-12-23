 import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: true,
    },

    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    shipmentVolume: {
      type: Number,
    },

    shipmentWeight: {
      type: Number,
    },

    numberOfBoxes: {
      type: Number,
    },

    deadline: {
      type: Date,
      required: true,
    },

    distance: {
      type: Number, // km
    },

    score: {
      type: Number, // optimization score
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Assigned",
        "Picked",
        "InTransit",
        "Delivered",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
