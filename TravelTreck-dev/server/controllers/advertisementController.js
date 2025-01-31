import Advertisement from "../models/Advertisement.js";

// Create a new advertisement
export const createAdvertisement = async (req, res) => {
  try {
    const { title, subtitle, description, imageUrl } = req.body;

    const newAdvertisement = new Advertisement({
      title,
      subtitle,
      description,
      imageUrl,
    });
    await newAdvertisement.save();

    res
      .status(201)
      .json({
        message: "Advertisement created successfully",
        advertisement: newAdvertisement,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all advertisements
export const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single advertisement by ID
export const getAdvertisementById = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement)
      return res.status(404).json({ message: "Advertisement not found" });
    res.status(200).json(advertisement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an advertisement
export const updateAdvertisement = async (req, res) => {
  try {
    const { title, subtitle, description, imageUrl } = req.body;
    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, description, imageUrl },
      { new: true }
    );

    if (!updatedAdvertisement)
      return res.status(404).json({ message: "Advertisement not found" });
    res
      .status(200)
      .json({
        message: "Advertisement updated successfully",
        advertisement: updatedAdvertisement,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an advertisement
export const deleteAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.findByIdAndDelete(req.params.id);
    if (!advertisement)
      return res.status(404).json({ message: "Advertisement not found" });
    res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
