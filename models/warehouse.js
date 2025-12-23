import mongoose, { mongo } from "mongoose";
import validator from "validator";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const warehouseSchema=new mongoose.Schema({
 warehouseId:{type:String,
required:true,
unique:true,


},
location: { type: String, required: true },




});
const WH = mongoose.model("Warehouse", warehouseSchema);

export default WH;


