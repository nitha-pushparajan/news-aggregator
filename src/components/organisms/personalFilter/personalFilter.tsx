import { FC } from 'react';
import { NEWS_SOURCES } from '../../../lib/contants';
import Select from 'react-select';
import SourceButtons from '../../molecules/sourceButtons/sourceButtons';
import { NewsFilterProps } from './personalFilter.types';

const NewsFilter: FC<NewsFilterProps> = ({ handleItemClick, authors, onCategoryChange, onAuthorsChange, categories, filters }) => {
  const categoriesOptions =
    categories.map((category) => { return { 'label': category, 'value': category } });

  const authorOptions =
    authors.map((author) => { return { 'label': author, 'value': author } });


  return (
    <div className='mb-4'>
        <div className=" w-full p-2">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Personalize Your Newsfeed by updating the below filters
          </h2>
        </div>
        <SourceButtons onSelection={handleItemClick} items={NEWS_SOURCES} selectedItems={filters.sources} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
          <Select
            isMulti
            name="Filter result by categories"
            options={categoriesOptions}
            value={filters.category}
            onChange={onCategoryChange}
            className="react-select-container"
            placeholder="Select catgoeries..."
            styles={{
              placeholder: (provided) => ({
                ...provided,
                fontSize: '14px',
              }),
            }}
          />
          <Select
            isMulti
            name="Filter result by authors"
            options={authorOptions}
            value={filters.authors}
            onChange={onAuthorsChange}
            className="react-select-container"
            placeholder="Select catgoeries..."
            styles={{
              placeholder: (provided) => ({
                ...provided,
                fontSize: '14px',
              }),
            }}
          />
        </div>
      </div>
  );
};

export default NewsFilter;
