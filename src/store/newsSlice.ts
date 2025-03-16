import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularNews } from './../lib/services';
import { RootState } from './index';
import { NewsProps } from 'src/components/molecules/newsCard/newsCard.types';
import { Source } from 'src/interfaces/common.types';

// Define a type for the slice state
interface NewsState {
  news: NewsProps[];
  // categories: string[];
  filteredNews: NewsProps[];
  loading: boolean;
  error: string | null;
  filters: {
    query?: string;
    date?: string | null;
    sources: Source[];
    category: any[];
  },
  personalisedFilters: {
    isPersonalised: boolean;
    sources: Source[];
    category: any[];
    authors: any[];
  }
}

// Initial state
const initialState: NewsState = {
  news: [],
  // categories: [],
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
  NewsProps[], // The expected return type (on success)
  'news' | 'personal',        // No arguments are passed to the thunk
  {
    state: RootState;
    rejectValue: { error: string }; // Custom error type
  }
>(
  'news/fetchNews',
  async (newsType, thunkAPI) => {
    const state = thunkAPI.getState();
    let filters;

    // Select filters based on the newsType ('home' or 'personal')
    if (newsType === 'news') {
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
      return response as NewsProps[]; // Cast the response to NewsProps[]
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
    // setPersonalisedSource: (state, action: PayloadAction<Source[]>) => {
    //   state.personalisedFilters.sources = action.payload
    // },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setPersonalisedFilters: (state, action: PayloadAction<any>) => {
      state.personalisedFilters = {...action.payload, isPersonalised: true};
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

        // Extract unique categories and set them in filteredNews
        // const categories = [
        //   ...new Set(action.payload.map((newsItem) => newsItem.category))
        // ];
        // state.categories = categories;
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
