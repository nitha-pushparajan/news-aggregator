import { NewsProps } from './../../../interfaces/common.types';

export interface NewsGridProps {
  news: NewsProps[];
  loading: boolean;
  error: string | null;
}
