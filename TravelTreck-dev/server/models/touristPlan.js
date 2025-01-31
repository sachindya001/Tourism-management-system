import mongoose from "mongoose";

const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  destinationId: {
    type: Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
});

const touristPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "SystemUser",
      required: true,
    },
    destinations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Destination",
      },
    ],
    hotels: [hotelSchema],
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    numOfDays: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure that each destination has a corresponding hotel
touristPlanSchema.pre("save", function (next) {
  console.log(`${this.destinations.length} !== ${this.hotels.length}`);
  if (this.destinations.length !== this.hotels.length) {
    const error = new Error("Each destination must have a corresponding hotel");
    return next(error);
  }
  next();
});

const TouristPlan = mongoose.model("TouristPlan", touristPlanSchema);

export default TouristPlan;
