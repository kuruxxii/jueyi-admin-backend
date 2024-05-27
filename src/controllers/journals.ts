import { Request, Response } from "express";
import { JournalModel } from "../models/JournalModel";

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
  try {
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

export const addAnArticleToJournal = async (req: Request, res: Response) => {
  const { vol } = req.params;
  const { slug } = req.body;
  if (slug) {
    try {
      const journal = await JournalModel.findOne({ vol }).exec();
      if (!journal) {
        return res.status(400).json("Journal does not Exist");
      } else {
        if (journal.articles.includes(slug)) {
          return res
            .status(400)
            .json({ msg: "Article already in this journal" });
        }
        journal.articles.push(slug);
        await journal.save();
        return res.status(200).json({ msg: "Article added successfully" });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ msg: "empty article slug" });
  }
};

export const deleteAnArticleFromJournal = async (
  req: Request,
  res: Response
) => {
  const { vol } = req.params;
  const { slug } = req.body;
  if (slug) {
    try {
      const journal = await JournalModel.findOne({ vol }).exec();
      if (!journal) {
        return res.status(400).json("Journal does not Exist");
      } else {
        if (journal.articles.includes(slug)) {
          journal.articles = journal.articles.filter((a) => a !== slug);
          await journal.save();
          return res
            .status(200)
            .json({ msg: "Article has been deleted from journal." });
        } else {
          return res
            .status(400)
            .json({ msg: "Article does not Exist in this journal." });
        }
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ msg: "empty article slug" });
  }
};
