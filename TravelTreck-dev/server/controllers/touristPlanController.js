import TouristPlan from "../models/touristPlan.js";

export const createTouristPlan = async (req, res) => {
  try {
    console.log(req.body);
    const newPlan = new TouristPlan(req.body);
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTouristPlans = async (req, res) => {
  try {
    const plans = await TouristPlan.find()
      //   .populate("userId", "name email")
      .populate("destinations")
      .populate("vehicleId");
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTouristPlanById = async (req, res) => {
  try {
    const plan = await TouristPlan.findById(req.params.id)
      .populate("userId", "name email")
      .populate("destinations")
      .populate("vehicleId");
    if (!plan) {
      return res.status(404).json({ message: "Tourist plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTouristPlan = async (req, res) => {
  try {
    const updatedPlan = await TouristPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({ message: "Tourist plan not found" });
    }
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTouristPlan = async (req, res) => {
  try {
    const deletedPlan = await TouristPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Tourist plan not found" });
    }
    res.status(200).json({ message: "Tourist plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
