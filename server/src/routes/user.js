const express = require("express");
const UserRepository = require("../repository/userRepository");
const UserService = require("../services/userService");

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userRoutes = express.Router();

userRoutes.post("/register", userService.register.bind(userService));
userRoutes.post("/login", userService.login.bind(userService));
userRoutes.post("/logout", userService.logout.bind(userService));
userRoutes.get("/:id", userService.getUser.bind(userService));

module.exports = userRoutes;
