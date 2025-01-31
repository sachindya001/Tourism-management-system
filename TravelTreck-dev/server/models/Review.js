import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "siteUser",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    numOfStars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
