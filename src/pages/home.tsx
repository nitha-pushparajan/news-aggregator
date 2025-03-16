import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import { NewsGrid } from './../components/organisms/newsGrid';
import SourceButtons from './../components/molecules/sourceButtons/sourceButtons';
import SearchInput from './../components/atoms/searchInput/searchInput';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { RootState, AppDispatch } from './../store';
import "react-datepicker/dist/react-datepicker.css";

import { fetchNews, setFilters } from './../store/newsSlice';
import './../App.css'
import { Source } from 'src/interfaces/common.types';
import { NEWS_SOURCES, NEWSFILTERTYPE } from './../lib/contants';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, error, filters } = useSelector((state: RootState) => state.news);

  const onSearch = (searchInput: string) => {
    dispatch(setFilters({...filters, query: searchInput}));
  }

  const onDateChange = (date: (Date | null)) => {
    dispatch(setFilters({...filters, date: date?.toISOString()}));
  }

  const categories = [
    ...new Set(news.map((newsItem) => newsItem.category))
  ];

  const categoriesOptions =
    categories.map((category) => { return { 'label': category, 'value': category } });


  const handleItemClick = (newsSources: Source[]) => {
    dispatch(setFilters({...filters, sources: newsSources}));
  }

  useEffect(() => {
    dispatch(fetchNews(NEWSFILTERTYPE.NEWS));
  }, [filters.query, filters.date, filters.sources, dispatch]);

  const newsData = filters.category.length > 0 ?
    news.filter((newsItem) => filters.category.filter((item) => newsItem.category === item.value).length > 0) : news;

  const handleChange = (selected: { value: string, label: string }[]) => {
    dispatch(setFilters({...filters, category: selected}));
  };
  const date = filters.date ? new Date(filters.date): null;

  return (
    <>
      <h1 className='text-[35px] font-semibold text-[#3d9939] my-3 text-center' >News Articles</h1>
      <SourceButtons onSelection={handleItemClick} items={NEWS_SOURCES} selectedItems={filters.sources} />
      <div className='flex flex-wrap md:flex-nowrap gap-2 w-full items-center justify-center my-10'>
        <DatePicker selected={date} onChange={onDateChange} placeholderText="Select date" dateFormat="yyyy-MM-dd" />
        <SearchInput onSearch={onSearch} />
        <Select
          isMulti
          name="Filter result by categories"
          options={categoriesOptions}
          value={filters.category}
          onChange={handleChange}
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
      <NewsGrid
        news={newsData}
        loading={loading}
        error={error}
      />
    </>
  )
}

export default Home;