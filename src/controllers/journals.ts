import { Request, Response } from "express";
import { JournalModel } from "../models/JournalModel";
import { ArticleModel } from "../models/ArticleModel";

export const getAJournal = async (req: Request, res: Response) => {
  const { vol } = req.params;
  try {
    const journal = await JournalModel.findOne({ vol }).exec();
    if (!journal) {
      res.status(400).json({ msg: "No such Journal" });
    } else {
      res.status(200).json(journal);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPaginatedJournals = async (req: Request, res: Response) => {
  const journalsPerPage = 9;
  const page: number = parseInt(req.query.page as string, 10) || 1;
  try {
    const journals = await JournalModel.find()
      .limit(journalsPerPage)
      .skip((page - 1) * journalsPerPage)
      .sort({ vol: -1 })
      .exec();

    const count = await JournalModel.countDocuments();

    return res.status(200).json({
      journals,
      totalPages: Math.ceil(count / journalsPerPage),
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const addAJournal = async (req: Request, res: Response) => {
  const { title, description, vol, coverUrl, articles } = req.body;
  try {
    for (const slug of articles) {
      const article = await ArticleModel.findOne({ slug }).exec();
      if (!article) {
        return res
          .status(400)
          .json({ error: `slug: "${slug}" 不存在，请仔细检查` });
      }
    }
    const journal = await JournalModel.create({
      title,
      description,
      vol,
      coverUrl,
      articles: articles ? articles : [],
    });
    return res.status(200).json(journal);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteAJournal = async (req: Request, res: Response) => {
  const { vol } = req.params;
  try {
    const journal = await JournalModel.findOneAndDelete({ vol }).exec();
    if (!journal) {
      return res.status(400).json({ error: "Journal does not exist" });
    } else {
      return res.status(200).json({ msg: "Deletion succeeded" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const modifyAJournal = async (req: Request, res: Response) => {
  const { vol } = req.params;
  const { articles } = req.body;
  try {
    for (const slug of articles) {
      const article = await ArticleModel.findOne({ slug }).exec();
      if (!article) {
        return res
          .status(400)
          .json({ error: `slug: "${slug}" 不存在，请仔细检查` });
      }
    }
    const journal = await JournalModel.findOneAndUpdate(
      { vol },
      { ...req.body }
    ).exec();
    if (!journal) {
      return res.status(400).json({ error: "Journal does not exist" });
    } else {
      return res.status(200).json({ msg: "Modification succeeded" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
