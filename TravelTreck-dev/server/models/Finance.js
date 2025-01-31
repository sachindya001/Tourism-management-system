import mongoose from "mongoose";

const sitePaymentsSchema = new mongoose.Schema(
  {
    paidUserName: {
      type: String,
      required: true,
      trim: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["vehicle book", "package book"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    paidUserEmail: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    paidUserPhoneNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    paidUserAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SitePayments = mongoose.model("SitePayments", sitePaymentsSchema);

export default SitePayments;
