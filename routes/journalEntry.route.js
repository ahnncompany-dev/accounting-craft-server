import express from "express";

import {
  getSalesPurchase,
  createSalesPurchase,
} from "../controllers/journalEntry/salesPurchase.controller.js";
import {
  getDepositWithdraw,
  createDepositWithdraw,
} from "../controllers/journalEntry/depositWithdraw.controller.js";

const journalEntryRoute = express.Router();
journalEntryRoute.get("/salespurchase", getSalesPurchase);
journalEntryRoute.post("/salespurchase", createSalesPurchase);
journalEntryRoute.get("/depositWithdraw", getDepositWithdraw);
journalEntryRoute.post("/depositWithdraw", createDepositWithdraw);


export default journalEntryRoute;
