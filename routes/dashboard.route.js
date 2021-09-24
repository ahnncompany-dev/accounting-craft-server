import express from "express";

import { getDashboard } from "../controllers/dashboard.controller.js";

const dashboardRoute = express.Router();
dashboardRoute.get("/", getDashboard);

export default dashboardRoute;
