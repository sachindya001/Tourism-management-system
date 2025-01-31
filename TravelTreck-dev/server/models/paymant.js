import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemUser",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
