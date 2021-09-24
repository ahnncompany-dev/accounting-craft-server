import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./config/dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import userRoute from "./routes/user.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import journalEntryRoute from "./routes/journalEntry.route.js";

const app = express();

// .env
dotenv.config();

// 데이터베이스 연결
dbConnect();

// 미들웨어
app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

// 라우터 등록
app.use("/user", userRoute);
app.use("/dashboard", dashboardRoute);
app.use("/journalentry", journalEntryRoute);

// 에러처리
app.use(notFound);
app.use(errorHandler);

export default app;
