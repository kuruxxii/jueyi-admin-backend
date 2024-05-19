import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import articlesRouter from "./routes/articles";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/admin/articles", articlesRouter);

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
