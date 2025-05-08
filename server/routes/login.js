const Model = require("../model/login");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log(req.body); // Corrected
    const { email, password } = req.body; // Destructuring

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const data = await Model.findOne({ email: email });
    console.log("Data from DB", data); // Corrected

    console.log(data.password==password); // Corrected

      if (data.password ==password) {
        console.log("Password from DB", data.password); // Corrected
        console.log("Password from request", password);
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }

  } catch (err) {
    console.log("Error in the backend login API", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
