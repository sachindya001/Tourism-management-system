import Payment from "../models/paymant.js";
import User from "../models/sysUser.js";

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { userId, amount, details, subscription } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const payment = new Payment({
      user: userId,
      amount,
      details,
      subscription,
    });
    await payment.save();

    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user", "name email"); // Populate user data
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a payment
export const updatePayment = async (req, res) => {
  try {
    const { amount, details, subscription } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { amount, details, subscription },
      { new: true }
    ).populate("user", "name email");

    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
