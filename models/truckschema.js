import mongoose from "mongoose";

const truckSchema = new mongoose.Schema({
  truckId: { type: String, required: true, unique: true },
  truckDriver: { type: String, required: true },
  truckDealer: { type: String, required: true },  
  capacity: { type: Number, required: true }, 
  location: { type: String },  
  truckType: { type: String },
  travelTime: { type: String },  
  booked: { type: Boolean, default: false },
  deadline: { type: Date },
});

const Truck = mongoose.model("Truck", truckSchema);

export { Truck };
