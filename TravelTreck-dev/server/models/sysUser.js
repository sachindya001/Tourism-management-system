import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    occupation: { type: String, default: null },
    objective: { type: String, default: null },
    subscription: { type: String, default: null },
    role: { type: String, default: "User" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("SystemUser", userSchema);
export default User;
