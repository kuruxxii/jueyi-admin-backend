import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

export const addAUser = async (req: Request, res: Response) => {
  const { email, number, startDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setFullYear(start.getFullYear() + 1); // Add one year from startDate
  end.setDate(start.getDate() + 7); // Add seven days
  try {
    const user = await UserModel.create({
      email,
      number,
      subscription: {
        isActive: true,
        startDate: start,
        endDate: end,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
