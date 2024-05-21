import passport from "passport";
import { Strategy } from "passport-local";
import { AdminModel } from "../models/AdminModel";
import { comparePassword } from "../lib/utils";

declare global {
  namespace Express {
    interface User {
      username: string;
    }
  }
}

passport.serializeUser((user, done) => {
  console.log("serialize user");
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  console.log("deserialize user");
  try {
    const admin = await AdminModel.findOne({ username }).exec();
    if (!admin) {
      throw new Error("Admin not found");
    }
    done(null, admin);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const admin = await AdminModel.findOne({
        username,
      }).exec();
      if (!admin) {
        throw new Error("Admin not found");
      }
      const match = await comparePassword(password, admin.password);
      if (!match) {
        throw new Error("Incorrect password");
      }
      done(null, admin);
    } catch (error) {
      done(error, false);
    }
  })
);
