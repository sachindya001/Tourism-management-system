import Package from "../models/Package.js";

// Create a new package
export const createPackage = async (req, res) => {
  try {
    const { packageName, price, availability, ionmmks, description, imageUrl } =
      req.body;

    const newPackage = new Package({
      packageName,
      price,
      availability,
      ionmmks,
      description,
      imageUrl,
    });
    await newPackage.save();

    res
      .status(201)
      .json({ message: "Package created successfully", package: newPackage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single package by ID
export const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData)
      return res.status(404).json({ message: "Package not found" });
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a package
export const updatePackage = async (req, res) => {
  try {
    const { packageName, price, availability, ionmmks, description, imageUrl } =
      req.body;
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { packageName, price, availability, ionmmks, description, imageUrl },
      { new: true }
    );

    if (!updatedPackage)
      return res.status(404).json({ message: "Package not found" });
    res.status(200).json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a package
export const deletePackage = async (req, res) => {
  try {
    const packageData = await Package.findByIdAndDelete(req.params.id);
    if (!packageData)
      return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
