import { useEffect } from 'react';
import Select, { MultiValue } from 'react-select';
import { NEWS_SOURCES } from './../lib/contants';
import { SourceButtons } from './../components/molecules/sourceButtons';
import { Source } from './../interfaces/common.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './../store';
import { fetchNews, setPersonalisedFilters } from './../store/newsSlice';
import { NewsGrid } from './../components/organisms/newsGrid';

const Personal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, error, personalisedFilters } = useSelector((state: RootState) => state.news);
  
  const categories = [
    ...new Set(news.map((newsItem) => newsItem.category))
  ];

  const categoriesOptions =
    categories.map((category) => { return { 'label': category, 'value': category } });

  const authors = [
    ...new Set(news.map((newsItem) => newsItem.author))
  ];

  const authorOptions = authors.map((author) => { return { 'label': author, 'value': author } });

  let filteredNews = news.filter((newsItem) => {
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
    dispatch(fetchNews('personal'));
  }, [personalisedFilters.sources]);

  const handleCategoryChange = (selected: MultiValue<{ value: string, label: string }>) => {
    dispatch(setPersonalisedFilters({ ...personalisedFilters, category: selected }))
  }

  const handleAuthorChange = (selected: MultiValue<{ value: string, label: string }>) => {
    dispatch(setPersonalisedFilters({ ...personalisedFilters, authors: selected }))
  }

  return (
    <div>
      <div className="flex items-center justify-center space-x-2">
        <h1 className="text-[35px] font-semibold text-[#3d9939] my-3">Your Personalised NewsFeed</h1>
      </div>
      <div className=" w-full p-2">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Personalize Your Newsfeed by updating the below filters
        </h2>
      </div>

      {<div className='mb-8'>
        <SourceButtons onSelection={handleItemClick} items={NEWS_SOURCES} selectedItems={personalisedFilters.sources} />
        <div className='flex gap-2'>
          <Select
            isMulti
            name="Filter result by categories"
            options={categoriesOptions}
            value={personalisedFilters.category}
            onChange={handleCategoryChange}
            className="react-select-container w-1/2"
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
            value={personalisedFilters.authors}
            onChange={handleAuthorChange}
            className="react-select-container w-1/2"
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
      }
      <NewsGrid
        news={filteredNews}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default Personal