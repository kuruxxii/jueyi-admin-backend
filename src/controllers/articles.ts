import { Request, Response } from "express";
import { ArticleModel } from "../models/ArticleModel";

export const addAnArticle = async (req: Request, res: Response) => {
  const { slug, title, introduction, author, read, topic, origin, content } =
    req.body;
  try {
    const article = await ArticleModel.create({
      slug,
      title,
      introduction,
      author,
      read,
      topic,
      origin,
      content,
    });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const modifyAnArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await ArticleModel.findOneAndUpdate(
      { slug },
      { ...req.body }
    ).exec();
    if (!article) {
      res.status(400).json("No such article");
    } else {
      res.status(200).json("Modification succeeded");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAnArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await ArticleModel.findOneAndDelete({ slug }).exec();
    if (!article) {
      res.status(400).json("No such article");
    } else {
      res.status(200).json("Deletion succeeded");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    // Get all articles
    const articles = await ArticleModel.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
