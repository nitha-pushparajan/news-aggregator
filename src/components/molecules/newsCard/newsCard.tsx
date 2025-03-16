import { FC } from 'react';
import { NewsCardProps } from './newsCard.types';

const NewsCard: FC<NewsCardProps> = ({ news }) => {

  const altText = `Image related to ${news?.title || 'News item'}`;

  return (
    <div
      data-testid="news-card"
      className="group relative bg-white p-5 rounded-[5px] cursor-pointer h-full flex flex-col"
    >
      <div className="relative w-full pb-[70%]">
        <img alt={altText} src={news.imgSrc} className="absolute w-full h-full rounded-lg object-contain" />
      </div>
      <div className="mb-[15px]">
        <div className="text-[#747272]">
          <h3 className='text-[16px] text-bold leading-[26px] mt-1'>{news.title}</h3>
          <h3 className='text-[14px] leading-[18px] my-1'>{news.description}</h3>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
