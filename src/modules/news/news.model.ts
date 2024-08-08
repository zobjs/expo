import { Schema, model } from "mongoose";
import { INews } from "./news.interface";

const articleSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    authorId: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    link: {
      type: String,
    },
    tags: {
      type: [String],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Article = model<INews>("Article", articleSchema);
