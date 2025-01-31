import Adventure from "../models/Adventure.js";

// Create a new adventure
export const createAdventure = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    const newAdventure = new Adventure({ title, description, imageUrl });
    await newAdventure.save();

    res
      .status(201)
      .json({
        message: "Adventure created successfully",
        adventure: newAdventure,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all adventures
export const getAdventures = async (req, res) => {
  try {
    const adventures = await Adventure.find();
    res.status(200).json(adventures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single adventure by ID
export const getAdventureById = async (req, res) => {
  try {
    const adventure = await Adventure.findById(req.params.id);
    if (!adventure)
      return res.status(404).json({ message: "Adventure not found" });
    res.status(200).json(adventure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an adventure
export const updateAdventure = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const updatedAdventure = await Adventure.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );

    if (!updatedAdventure)
      return res.status(404).json({ message: "Adventure not found" });
    res
      .status(200)
      .json({
        message: "Adventure updated successfully",
        adventure: updatedAdventure,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an adventure
export const deleteAdventure = async (req, res) => {
  try {
    const adventure = await Adventure.findByIdAndDelete(req.params.id);
    if (!adventure)
      return res.status(404).json({ message: "Adventure not found" });
    res.status(200).json({ message: "Adventure deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
