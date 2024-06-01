import { Request, Response } from "express";
import { NewsModel } from "../models/NewsModel";

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await NewsModel.findOne({}).exec();
    if (!news) {
      return res.status(400).json({ msg: "通知不存在" });
    } else {
      return res.status(200).json(news);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const modifyNews = async (req: Request, res: Response) => {
  const { content } = req.body;
  try {
    const news = await NewsModel.findOneAndUpdate({}, { content }).exec();
    if (!news) {
      return res.status(400).json({ msg: "通知不存在" });
    } else {
      return res.status(200).json({ msg: "修改通知成功" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
