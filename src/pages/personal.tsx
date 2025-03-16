import { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { NEWSFILTERTYPE } from './../lib/contants';
import { Title } from './../components/atoms/title';
import { PersonalFilter } from './../components/organisms/personalFilter';
import { Source } from './../interfaces/common.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './../store';
import { fetchNews, setPersonalisedFilters } from './../store/newsSlice';
import { NewsGrid } from './../components/organisms/newsGrid';

const Personal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, error, personalisedFilters } = useSelector((state: RootState) => state.news);
  const [isEdit, setIsEdit] = useState<boolean>(!personalisedFilters.isPersonalised)
  const categories = [
    ...new Set(news.map((newsItem) => newsItem.category))
  ];

  const authors = [
    ...new Set(news.map((newsItem) => newsItem.author))
  ];

  const filteredNews = news.filter((newsItem) => {
    const categoryMatch = personalisedFilters.category.length === 0 ||
      personalisedFilters.category.some((item) => newsItem.category === item.value);
    const authorMatch = personalisedFilters.authors.length === 0 ||
      personalisedFilters.authors.some((item) => newsItem.author === item.value);

    return categoryMatch && authorMatch;
  });

  const handleItemClick = (newsSources: Source[]) => {
    dispatch(setPersonalisedFilters({ ...personalisedFilters, sources: newsSources }))
  }

  useEffect(() => {
    dispatch(fetchNews(NEWSFILTERTYPE.PERSONAL));
  }, [personalisedFilters.sources, dispatch]);

  const handleCategoryChange = (selected: MultiValue<{ value: string, label: string }>) => {
    dispatch(setPersonalisedFilters({ ...personalisedFilters, category: selected }))
  }

  const handleAuthorChange = (selected: MultiValue<{ value: string, label: string }>) => {
    dispatch(setPersonalisedFilters({ ...personalisedFilters, authors: selected }))
  }

  const toggleFilters = () => {
    setIsEdit(!isEdit);
  }

  return (
    <div>
      <Title text="Your Personalised News Feed" />
      {isEdit &&
        <PersonalFilter
          handleItemClick={handleItemClick}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          onAuthorsChange={handleAuthorChange}
          authors={authors}
          filters={personalisedFilters}
        />
      }
      <div className='flex justify-end p-4'>
        <button
          onClick={toggleFilters}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isEdit ? 'Close' : 'Edit'} Filters
        </button>
      </div>
      <NewsGrid
        news={filteredNews}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default Personal