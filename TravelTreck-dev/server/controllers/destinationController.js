import Destination from "../models/Destination.js";

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new destination
export const createDestination = async (req, res) => {
  const destination = new Destination(req.body);
  try {
    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a destination by ID
export const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.status(200).json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a destination by ID
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
