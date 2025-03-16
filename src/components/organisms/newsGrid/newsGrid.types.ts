import { NewsProps } from '../../../components/molecules/newsCard/newsCard.types';

export interface NewsGridProps {
  news: NewsProps[];
  loading: boolean;
  error: string | null;
}
