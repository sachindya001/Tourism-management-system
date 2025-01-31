import SitePayments from "../models/Finance.js";

// Get All Site Payments
export const getAllSitePayments = async (req, res) => {
  try {
    const payments = await SitePayments.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve payments", error });
  }
};

// Get a Single Site Payment by ID
export const getSitePaymentById = async (req, res) => {
  try {
    const payment = await SitePayments.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve payment", error });
  }
};

// Create a new Site Payment
export const createSitePayment = async (req, res) => {
  try {
    const newPayment = new SitePayments(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: "Failed to create payment", error });
  }
};

// Update a Site Payment by ID
export const updateSitePayment = async (req, res) => {
  try {
    const updatedPayment = await SitePayments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: "Failed to update payment", error });
  }
};

// Delete a Site Payment by ID
export const deleteSitePayment = async (req, res) => {
  try {
    const deletedPayment = await SitePayments.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error });
  }
};
