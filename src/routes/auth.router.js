const express = require("express");
const AuthController = require("../app/controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", AuthController.createUser);
authRouter.post("/login", AuthController.login);

module.exports = authRouter;
