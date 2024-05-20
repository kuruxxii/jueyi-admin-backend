import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./strategies/local-strategy";
import MongoStore from "connect-mongo";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import authRouter from "./routes/auth";
import articlesRouter from "./routes/articles";

const app = express();

// middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    secret: process.env.SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 600000 * 60 * 24 * 7,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use("/admin/auth", authRouter);
app.use("/admin/articles", ensureAuthenticated, articlesRouter);

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
