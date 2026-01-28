import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./database/database";

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

//routes
//test route
app.use("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "pong",
  });
});

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
