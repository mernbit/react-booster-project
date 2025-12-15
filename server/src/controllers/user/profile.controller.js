const User = require("../../models/User/user.model");

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.json({ user, session: req.user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error fetching profile", error });
  }
};

module.exports = profile;
