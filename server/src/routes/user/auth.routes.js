const express = require("express");
const authRouter = express.Router();
const register = require("../../controllers/user/register.controller");
const login = require("../../controllers/user/login.controller");
const profile = require("../../controllers/user/profile.controller");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", profile);

module.exports = authRouter;
