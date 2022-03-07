export interface PostCategoryInfo {
  title: string;
}

export interface ContentPost {
  arrayId: string;
  id: string;
  title: string;
  description: string;
  categoryInfo: PostCategoryInfo[];
  feature: string;
  url: string;
}

export interface ContentProps {
  title: string;
  ctaText: string;
  ctaLink: string;
  posts: ContentPost[];
}

export interface ContentPostProps {
  post: ContentPost;
}
