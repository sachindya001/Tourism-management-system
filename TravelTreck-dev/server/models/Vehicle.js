import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicle: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      default: null,
    },
    number: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
