import Review from "../models/Review.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { reviewedBy, review, numOfStars } = req.body;

    const newReview = new Review({ reviewedBy, review, numOfStars });
    await newReview.save();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("reviewedBy");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { review, numOfStars } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { review, numOfStars },
      { new: true }
    );

    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
