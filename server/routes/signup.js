const Model = require("../model/login");
const express = require("express");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter all the fields" });
    }

    // Check if user already exists
    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create and save new user
    const data = new Model({ name, email, password });
    const result = await data.save();

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error in the backend signup API: ${err.message}` });
  }
});

module.exports = router;
