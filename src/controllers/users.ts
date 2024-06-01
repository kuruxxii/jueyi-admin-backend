import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

export const addAUser = async (req: Request, res: Response) => {
  const { email, number } = req.body;
  const start = new Date();
  const end = new Date();
  end.setFullYear(start.getFullYear() + 1); // Add one year from startDate
  end.setDate(start.getDate() + 7); // Add seven days
  try {
    const user = await UserModel.create({
      email,
      number,
      subscription: {
        startDate: start,
        endDate: end,
      },
    });
    return res.status(200).json({ msg: "用户添加成功" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ error: "用户不存在" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const modifyAUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOneAndUpdate(
      { email },
      { ...req.body }
    ).exec();
    if (!user) {
      res.status(400).json({ error: "用户不存在" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOneAndDelete({ email }).exec();
    if (!user) {
      res.status(400).json({ error: "用户不存在" });
    } else {
      res.status(200).json({ msg: "已删除该用户" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const USERS_PER_PAGE = 8;

export const getFilteredUsersTotalPages = async (
  req: Request,
  res: Response
) => {
  const query: string = (req.query.query as string) || "";
  try {
    // Count the total number of filtered articles
    const totalUsers = await UserModel.countDocuments({
      $or: [
        { email: { $regex: query, $options: "i" } },
        { number: { $regex: query, $options: "i" } },
      ],
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

    return res.status(200).json({ totalPages });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getFilteredUsers = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const query: string = (req.query.query as string) || "";
  const offset: number = (page - 1) * USERS_PER_PAGE;
  try {
    const users = await UserModel.aggregate([
      {
        $match: {
          $or: [
            { email: { $regex: query, $options: "i" } },
            { number: { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: offset,
      },
      {
        $limit: USERS_PER_PAGE,
      },
    ]);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
