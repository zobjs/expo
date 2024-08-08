// news.service.ts
import { Article } from "./news.model";
import { INews } from "./news.interface";
import { newsValidationSchema } from "./news.validation";
import { CustomError } from "../../errors/CustomError";

// Service function to create a news article
export const createNewsService = async (newsData: INews): Promise<INews> => {
  const parsedBody = newsValidationSchema.safeParse({ body: newsData });
  if (!parsedBody.success) {
    throw new CustomError(400, parsedBody.error.errors[0].message);
  }
  // Check if the article already exists
  const existingArticle = await Article.findOne({
    title: parsedBody.data.body.title,
  });
  if (existingArticle) {
    throw new CustomError(409, "Article already exists");
  }

  // Create the new article

  const newArticle = new Article(parsedBody.data.body);
  const result = await newArticle.save();
  return result;
};

// Service function to get all news articles with pagination, sorting, filtering, and search
export const getAllNewsService = async (
  page: number,
  limit: number,
  sortField: string,
  sortOrder: "asc" | "desc",
  filter: Partial<INews>,
  searchQuery: string
): Promise<{
  articles: INews[];
  total: number;
  nextPage: string | null;
  prevPage: string | null;
}> => {
  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;
  const sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };

  // Build the sort object
  const sortObject: any = {};
  Object.entries(sort).forEach(([key, value]) => {
    sortObject[key] = value;
  });

  // Build the filter object
  const filterObject: any = {};
  Object.entries(filter).forEach(([key, value]) => {
    if (value) {
      filterObject[key] = value;
    }
  });

  // Add search functionality
  if (searchQuery) {
    filterObject.$text = { $search: searchQuery };
  }

  // Fetch the articles from the database
  const articles = await Article.find(filterObject)
    .sort(sort as any)
    .skip(skip)
    .limit(limit);

  // Get the total count of articles matching the criteria
  const total = await Article.countDocuments(filterObject);

  // Calculate next and previous page links
  const nextPage =
    skip + limit < total
      ? `/api/v1/news?page=${
          page + 1
        }&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`
      : null;
  const prevPage =
    page > 1
      ? `/api/v1/news?page=${
          page - 1
        }&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`
      : null;

  return {
    total,
    nextPage,
    prevPage,
    articles,
  };
};

// Service function to get a single news article by ID
export const getNewsByIdService = async (id: string): Promise<INews | null> => {
  const article = await Article.findById(id);
  if (!article) {
    throw new CustomError(404, "Article not found");
  }
  return article;
};

// Service function to update a news article by ID
export const updateNewsService = async (
  id: string,
  newsData: Partial<INews>
): Promise<INews | null> => {
  const parsedBody = newsValidationSchema
    .partial()
    .safeParse({ body: newsData });
  if (!parsedBody.success) {
    throw new CustomError(400, parsedBody.error.errors[0].message);
  }

  const article = await Article.findByIdAndUpdate(id, parsedBody.data.body, {
    new: true,
  });
  if (!article) {
    throw new CustomError(404, "Article not found");
  }
  return article;
};

// Service function to delete a news article by ID
export const deleteNewsService = async (id: string): Promise<INews | null> => {
  const article = await Article.findByIdAndDelete(id);
  if (!article) {
    throw new CustomError(404, "Article not found");
  }
  return article;
};
