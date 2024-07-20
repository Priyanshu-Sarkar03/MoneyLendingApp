const express = require("express");
const router = express.Router();
const User = require("./modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//JWT key
const SECRET_KEY ='eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMTM5OTMzNywiaWF0IjoxNzIxMzk5MzM3fQ.EJ-kF6VMdWXzvmHZjXNGUv-VMTGapp1WN39dIV4wGgQ';// Secret key for JWT

// Signup Route
router.post("/signup", async (req, res) => {
  const { phoneNumber, email, name, dob, monthlySalary, password } = req.body;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();

  // Validate age and salary requirements
  if (age < 20 || monthlySalary < 25000) {
    return res
      .status(400)
      .json({ message: "User does not meet age or salary requirements" });
  }

  try {
    // Hashing the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      phoneNumber,
      email,
      name,
      dob,
      monthlySalary,
      password: hashedPassword,
      status: "Approved", // Set status to 'Approved' upon successful registration
    });
    await user.save(); // Save user to the database
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get User Data Route
router.get("/user", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, SECRET_KEY);

  try {
    const user = await User.findById(decoded.id).select("-password"); // Exclude password field
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Borrow Money Route
router.post("/borrow", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, SECRET_KEY);
  const { amount, tenure } = req.body; // tenure in months

  try {
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const interestRate = 0.08; // Fixed interest rate
    const monthlyRepayment = (amount * (1 + interestRate)) / tenure; // Calculate monthly repayment
    user.purchasePower += amount; // Update purchase power

    await user.save(); // Save updated user data

    res.json({
      purchasePower: user.purchasePower,
      monthlyRepayment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
