import React from 'react';
import Skeleton from '../../../components/atoms/skeleton/skeleton';

const NewsCardLoader: React.FC = () => (
  <div className="p-4 grid grid-cols-1 gap-3" data-testid="news-card-loader">
    <Skeleton variant="rect-big" fullWidth />
    <Skeleton variant="text" className="!w-1/2" />
    <Skeleton variant="text" className="!w-1/4" />
    <Skeleton variant="text" className="!w-[20%]" />
  </div>
);

export default NewsCardLoader;
