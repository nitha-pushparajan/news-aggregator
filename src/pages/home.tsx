import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {MultiValue} from 'react-select';
import { Source } from 'src/interfaces/common.types';
import { NewsGrid } from './../components/organisms/newsGrid';
import { NewsFilter } from './../components/organisms/newsFilter';
import { Title } from './../components/atoms/title';
import { RootState, AppDispatch } from './../store';
import { NEWSFILTERTYPE } from './../lib/contants';
import { fetchNews, setFilters } from './../store/newsSlice';

import './../App.css'
import "react-datepicker/dist/react-datepicker.css";

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

  const handleItemClick = (newsSources: Source[]) => {
    dispatch(setFilters({...filters, sources: newsSources}));
  }

  useEffect(() => {
    dispatch(fetchNews(NEWSFILTERTYPE.NEWS));
  }, [filters.query, filters.date, filters.sources, dispatch]);

  const newsData = filters.category.length > 0 ?
    news.filter((newsItem) => filters.category.filter((item) => newsItem.category === item.value).length > 0) : news;

  const handleCategoryChange = (selected: MultiValue<{ value: string, label: string }>) => {
    dispatch(setFilters({...filters, category: selected}));
  };

  return (
    <>
      <Title text="News Items"/>
      <NewsFilter
        handleItemClick={handleItemClick}
        onDateChange={onDateChange}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        onSearch={onSearch}
        filters={filters}
      />
      <NewsGrid
        news={newsData}
        loading={loading}
        error={error}
      />
    </>
  )
}

export default Home;