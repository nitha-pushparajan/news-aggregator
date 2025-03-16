/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {Params, Source} from './../interfaces/common.types';
import { URLS,SOURCE_NYT, SOURCE_NEWSAPI, SOURCE_GUARDIAN } from './contants';

// Helper function to handle API requests
const fetchNewsFromAPI = async (source: Source, params: Params) => {
  try {
    const url = URLS[source];
    const response = await axios.get(url, { params: buildQueryParams(source, params) });
    return formatNews(response.data.response?.docs || response.data.articles || response.data.response?.results);
  } catch (error) {
    console.error("API request failed:", error);
    // Return null if request fails, instead of rejecting the promise
    return null;
  }
}

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const buildQueryParams = (source: Source, params: Params): Record<string, string > => {
  const queryParams: Record<string, string> = {};
  
  if (params.query) queryParams.q = params.query;
  
  if (params.date) {
    const formattedDate = formatDate(params.date);
    
    // Date field handling based on source
    if (source === SOURCE_NYT) {
      queryParams.begin_date = formattedDate;
      queryParams.end_date = formattedDate;
    } else if (source === SOURCE_NEWSAPI) {
      queryParams.from = formattedDate;
      queryParams.to = formattedDate;
    } else if (source === SOURCE_GUARDIAN) {
      queryParams['from-date'] = formattedDate;
      queryParams['to-date'] = formattedDate;
    }
  }
  
  return queryParams;
}

export const getPopularNews = async (params: Params) => {
  const selectedSources = params.sources;

  const fetchPromises = selectedSources.length === 0 
    ? [fetchNewsFromAPI(SOURCE_NYT, params), fetchNewsFromAPI(SOURCE_NEWSAPI, params), fetchNewsFromAPI(SOURCE_GUARDIAN, params)]
    : selectedSources.map(source => {
      return fetchNewsFromAPI(source, params)
      }).filter(Boolean);

  try {
    const results = await Promise.allSettled(fetchPromises);

    // Filter out failed results and return successful ones
    const successfulResults = results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => (result as PromiseFulfilledResult<any>).value);

    if (successfulResults.length > 0) {
      return successfulResults.flat(); // Flatten if multiple results
    } else {
      return { error: 'All news sources failed to fetch data' };
    }
  } catch (error) {
    console.error('Unexpected error while fetching news:', error);
    return { error: 'Unexpected error occurred' };
  }
};

// Format the news items from different sources
const formatNews = (news: any) => {
  return news.map((newsItem: any) => ({
    title: newsItem.title || newsItem.webTitle || newsItem.headline?.main,
    description: newsItem.description || newsItem.fields?.trailText || newsItem.lead_paragraph,
    author: newsItem?.author || newsItem?.fields?.byline || newsItem?.byline?.original || 'No Author',
    category: newsItem?.sectionName || newsItem?.section_name || 'General',
    imgSrc: newsItem?.urlToImage || newsItem?.fields?.thumbnail || (newsItem.multimedia?.[0]?.url ?'https://www.nytimes.com/' + newsItem.multimedia?.[0]?.url: '/public/not-available.svg'),
  }));
}
