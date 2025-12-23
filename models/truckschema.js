 import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    truckId: {
      type: String,
      required: true,
      unique: true,
    },

    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // logged-in truck dealer
    },

    truckDriver: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    truckType: {
      type: String,
      enum: ["Mini", "Medium", "Heavy"],
    },

    booked: {
      type: Boolean,
      default: false,
    },

    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Truck = mongoose.model("Truck", truckSchema);
export { Truck };
