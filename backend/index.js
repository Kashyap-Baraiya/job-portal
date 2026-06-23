import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/comapny.routes.js";
import jobRouter from './routes/job.routes.js';
import applicationsRoute from './routes/application.routes.js';




const app = express();

//  Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};



app.use(cors(corsOptions));

// routes

app.use("/api/v1/user", userRouter);
app.use('/api/v1/company',companyRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationsRoute);


const port = process.env.PORT || 8080;

app.listen(port, () => {
  connectDB();
  console.log(`Server running at port ${port}`);
});


