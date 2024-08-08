// news.routes.ts

import { Router } from "express";
import {
  createNewsController,
  getAllNewsController,
  deleteNewsController,
  getNewsByIdController,
  updateNewsController,
} from "./news.controller";

const newsRoutes: Router = Router();

newsRoutes.post("/news/create", createNewsController);
newsRoutes.get("/news", getAllNewsController);
newsRoutes.get("/news/:id", getNewsByIdController);
newsRoutes.put("/news/:id", updateNewsController);
newsRoutes.delete("/news/:id", deleteNewsController);

export default newsRoutes;
