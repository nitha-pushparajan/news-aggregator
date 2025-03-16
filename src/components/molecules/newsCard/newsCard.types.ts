export type NewsProps = {
  title: string;
  description:string;
  url: string;
  source: string;
  publishedAt: string;
  author: string;
  category: string;
  imgSrc: string;
};

export interface NewsCardProps {
  news: NewsProps;
}
