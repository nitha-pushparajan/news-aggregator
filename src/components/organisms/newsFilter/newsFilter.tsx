import { FC } from 'react';
import { NEWS_SOURCES } from './../../../lib/contants';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SourceButtons from '../../molecules/sourceButtons/sourceButtons';
import SearchInput from '../../atoms/searchInput/searchInput';
import { NewsFilterProps } from './newsFilter.types';
const NewsFilter: FC<NewsFilterProps> = ({ handleItemClick, onDateChange,onCategoryChange, categories, onSearch, filters }) => {
  const date = filters.date ? new Date(filters.date): null;
  const categoriesOptions =
    categories.map((category) => { return { 'label': category, 'value': category } });


  return (
    <>
      <SourceButtons onSelection={handleItemClick} items={NEWS_SOURCES} selectedItems={filters.sources}  />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 w-full items-center justify-center my-10'>
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <DatePicker selected={date} onChange={onDateChange} placeholderText="Select date" dateFormat="yyyy-MM-dd" />
          <div className='flex-grow'>
            <SearchInput onSearch={onSearch} />
          </div>
        </div>
        <Select
          isMulti
          name="Filter result by categories"
          options={categoriesOptions}
          value={filters.category}
          onChange={onCategoryChange}
          className="react-select-container flex-grow"
          placeholder="Select catgoeries..."
          styles={{
            placeholder: (provided) => ({
              ...provided,
              fontSize: '14px',
            }),
          }}
        />
      </div>
    </>
  );
};

export default NewsFilter;
