import { FC } from 'react';
import { NewsCard } from '../../atoms/newsCard';
import { NewsGridProps } from './newsGrid.types';
import NewsCardLoader from '../../../components/atoms/loader/newsCardLoader';

const NewsGrid: FC<NewsGridProps> = ({ news = [], loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(4)].map((_, n) => (
          <NewsCardLoader key={`key-${n}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="news-error"
        className="text-center h-[200px] flex justify-center items-center text-[#222]"
      >
        An error occurred. Please try again later.
      </div>
    );
  }

  if (!news.length) {
    return (
      <div
        data-testid="news-error"
        className="text-center h-[200px] flex justify-center items-center text-[#222]"
      >
       There are no news corresponding to your filters
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {news?.map((item) => (
        <NewsCard news={item} key={item.title} />
      ))}
    </div>
  );
};

export default NewsGrid;
