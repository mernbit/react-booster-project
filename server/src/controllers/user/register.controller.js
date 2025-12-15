const User = require("../../models/User/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ msg: "User created successfully", status: "success" });
  } catch (error) {
    console.log("Backend error", error);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};
module.exports = register;
