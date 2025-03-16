import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularNews } from './../lib/services';
import { RootState } from './index';
import { NewsState, NewsProps, Filters, NewsTYpe, PersonalisedFilters } from 'src/interfaces/common.types';
import { NEWSFILTERTYPE } from './../lib/contants';

const initialState: NewsState = {
  news: [],
  filteredNews: [],
  loading: false,
  error: null,
  filters: {
    query: '',
    date: null,
    sources: [],
    category: []
  },
  personalisedFilters: {
    sources: [],
    isPersonalised: false,
    category: [],
    authors: []
  }
};

export const fetchNews = createAsyncThunk<
  NewsProps[],
  NewsTYpe,
  {
    state: RootState;
    rejectValue: { error: string };
  }
>(
  'news/fetchNews',
  async (newsType, thunkAPI) => {
    const state = thunkAPI.getState();
    let filters;

    // Select filters based on the newsType ('news' or 'personal')
    if (newsType === NEWSFILTERTYPE.NEWS) {
      filters = state.news.filters;  // Home news filters
    } else {
      filters = state.news.personalisedFilters;  // Personalized news filters
    }
    try {
      const response = await getPopularNews(filters);  // Call your API function
      // Check if the response is valid
      if ('error' in response) {
        // If the response contains an error object, reject it
        return thunkAPI.rejectWithValue({ error: response.error });
      }
      return response as NewsProps[];
    } catch {
      // If an error occurs during the API request, reject with a custom error message
      return thunkAPI.rejectWithValue({ error: 'Unexpected error occurred while fetching news' });
    }
  }
);

// Create the news slice
export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = {...action.payload, category: [...action.payload.category]};
    },
    setPersonalisedFilters: (state, action: PayloadAction<PersonalisedFilters>) => {
      state.personalisedFilters = {...action.payload, isPersonalised: true, category: [...action.payload.category], authors: [...action.payload.authors]};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsProps[]>) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

// Export actions from the slice
export const { setPersonalisedFilters, setFilters } = newsSlice.actions;

// Export the reducer to be included in the store
export default newsSlice.reducer;
