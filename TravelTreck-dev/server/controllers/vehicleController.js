import Vehicle from "../models/Vehicle.js";

// Create a new vehicle
export const createVehicle = async (req, res) => {
  try {
    const { vehicle, email, description, owner } = req.body;

    const newVehicle = new Vehicle({
      vehicle,
      description,
      owner,
      email,
    });
    await newVehicle.save();

    res
      .status(201)
      .json({ message: "Vehicle created successfully", vehicle: newVehicle });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "name email");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
  try {
    const { vehicle, email, description, owner } = req.body;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { vehicle, description, email, owner },
      { new: true }
    ).populate("owner", "name email");

    if (!updatedVehicle)
      return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
