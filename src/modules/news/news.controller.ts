// news.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  createNewsService,
  getAllNewsService,
  getNewsByIdService,
  updateNewsService,
  deleteNewsService,
} from "./news.service";
import { INews } from "./news.interface";

// Controller function to create a news article
export const createNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createNewsService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Controller function to get all news articles
export const getAllNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const sortField = (req.query.sortField as string) || "publishDate";
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";
    const filter: Partial<INews> = {
      category: req.query.category as string,
      authorId: req.query.authorId as string,
    };
    const searchQuery = (req.query.search as string) || "";

    const { articles, total, nextPage, prevPage } = await getAllNewsService(
      page,
      limit,
      sortField,
      sortOrder,
      filter,
      searchQuery
    );

    res.status(200).json({
      total,
      limit,
      page,
      sortField,
      sortOrder,
      nextPage,
      prevPage,
      articles,
    });
  } catch (error) {
    next(error);
  }
};

// Controller function to get a single news article by ID
export const getNewsByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await getNewsByIdService(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a news article by ID
export const updateNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await updateNewsService(req.params.id, req.body);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a news article by ID
export const deleteNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await deleteNewsService(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};
