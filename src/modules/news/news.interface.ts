export interface INews {
  id: string; // Unique identifier
  title: string;
  subtitle: string;
  location?: string;
  category?: string;
  description: string;
  content?: string; // Full content of the article
  authorId?: string; // Reference to the author
  imageUrl?: string;
  link?: string; // Link to the article
  publishDate: Date;
  lastUpdated: Date; // To track updates
  tags?: string[]; // Array of tags for categorization
  views?: number; // Count of article views
  likes?: number; // Count of article likes
  commentsCount?: number; // Count of comments
}
