import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../models/AdminModel";
import { hashPassword } from "../lib/utils";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("All fields must be filled");
    }
    const adminExists = await AdminModel.findOne({ username }).exec();
    if (adminExists) {
      throw new Error("Admin already exists");
    }
    const hashedPassword = await hashPassword(password);
    const admin = await AdminModel.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "New Admin created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log(req.user);
  console.log(req.session);
  res.status(200).json({ msg: "You are logged in." });
};

/*
Passport.js exposes a logout function within the request object: req.logout.
The function can be called from any route handler in order to terminate a login session.
It essentially removes the req.user property and clears the login session (if any).
*/
export const logout = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ msg: "You are logged out" });
    // res.redirect("/");
  });
  console.log(req.user);
};
