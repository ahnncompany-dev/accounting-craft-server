import express from "express";

import {
  registerUser,
  fetchUsers,
} from "../controllers/user/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.get("/", fetchUsers);

export default userRoute;
