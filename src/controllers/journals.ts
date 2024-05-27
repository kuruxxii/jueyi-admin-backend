import { Request, Response } from "express";
import { JournalModel } from "../models/JournalModel";

export const addAJournal = async (req: Request, res: Response) => {
  const { title, description, vol, coverUrl } = req.body;
  try {
    const journal = await JournalModel.create({
      title,
      description,
      vol,
      coverUrl,
      articles: [],
    });
    return res.status(200).json(journal);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const addAnArticleToJournal = async (req: Request, res: Response) => {};
