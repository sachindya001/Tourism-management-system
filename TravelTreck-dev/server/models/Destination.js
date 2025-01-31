import mongoose from "mongoose";

const { Schema } = mongoose;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  popular: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Destination", destinationSchema);
