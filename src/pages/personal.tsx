import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { NEWS_SOURCES, NEWSFILTERTYPE } from './../lib/contants';
import { SourceButtons } from './../components/molecules/sourceButtons';
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

  const categoriesOptions =
    categories.map((category) => { return { 'label': category, 'value': category } });

  const authors = [
    ...new Set(news.map((newsItem) => newsItem.author))
  ];

  const authorOptions = authors.map((author) => { return { 'label': author, 'value': author } });

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
      <div className="flex items-center justify-center space-x-2">
        <h1 className="text-[35px] font-semibold text-[#3d9939] my-3 text-center">Your Personalised NewsFeed</h1>
      </div>
      {isEdit && <div className='mb-8'>
        <div className=" w-full p-2">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Personalize Your Newsfeed by updating the below filters
          </h2>
        </div>
        <SourceButtons onSelection={handleItemClick} items={NEWS_SOURCES} selectedItems={personalisedFilters.sources} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
          <Select
            isMulti
            name="Filter result by categories"
            options={categoriesOptions}
            value={personalisedFilters.category}
            onChange={handleCategoryChange}
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
            value={personalisedFilters.authors}
            onChange={handleAuthorChange}
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
      }
      <div className='flex justify-end p-4'>
        <button
          onClick={toggleFilters}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isEdit ? 'Close': 'Update'} Filters
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