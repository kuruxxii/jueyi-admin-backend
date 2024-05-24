import { Request, Response } from "express";
import { ArticleModel } from "../models/ArticleModel";

export const addAnArticle = async (req: Request, res: Response) => {
  const {
    slug,
    title,
    coverUrl,
    introduction,
    author,
    read,
    topic,
    origin,
    content,
  } = req.body;
  try {
    const article = await ArticleModel.create({
      slug,
      title,
      coverUrl,
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

export const getAnArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await ArticleModel.findOne({ slug }).exec();
    if (!article) {
      res.status(400).json("No such article");
    } else {
      res.status(200).json(article);
    }
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
      res.status(400).json({ error: "No such article" });
    } else {
      res.status(200).json(article);
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
      res.status(400).json({ error: "No such article" });
    } else {
      res.status(200).json({ msg: "Deletion succeeded" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const getArticles = async (req: Request, res: Response) => {
//   try {
//     // Get all articles
//     const articles = await ArticleModel.find().sort({ createdAt: -1 }).exec();
//     res.status(200).json(articles);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const ARTICLES_PER_PAGE = 8;

export const getFilteredArticlesTotalPages = async (
  req: Request,
  res: Response
) => {
  const query: string = (req.query.query as string) || "";
  try {
    // Count the total number of filtered articles
    const totalArticles = await ArticleModel.countDocuments({
      $or: [
        { slug: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

    res.json({ totalPages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFilteredArticles = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const query: string = (req.query.query as string) || "";
  const offset: number = (page - 1) * ARTICLES_PER_PAGE;
  try {
    const articles = await ArticleModel.aggregate([
      {
        $match: {
          $or: [
            { slug: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
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
        $limit: ARTICLES_PER_PAGE,
      },
      {
        $project: {
          slug: 1,
          title: 1,
          topic: 1,
          author: 1,
          createdAt: 1,
        },
      },
    ]);
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
