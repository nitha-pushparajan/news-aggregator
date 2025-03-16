import {SOURCE_NYT, SOURCE_NEWSAPI, SOURCE_GUARDIAN, NEWSFILTERTYPE} from './../lib/contants';

export type Source = typeof SOURCE_NYT | typeof SOURCE_NEWSAPI | typeof SOURCE_GUARDIAN;

export type NewsTYpe = typeof NEWSFILTERTYPE.NEWS | typeof NEWSFILTERTYPE.PERSONAL

export interface NewsSource {
    id: Source;
    label: string;
}

export interface Filters {
    query?: string;
    date?: string | null;
    sources: Source[];
    category: { value: string, label: string }[];
  }
  
  export interface PersonalisedFilters {
    isPersonalised: boolean;
    sources: Source[];
    category: { value: string, label: string }[];
    authors: { value: string, label: string }[];
  }

  export type NewsProps = {
    title: string;
    description:string;
    url: string;
    source: string;
    publishedAt: string;
    author: string;
    category: string;
    imgSrc: string;
  };
  
  export interface NewsState {
    news: NewsProps[];
    filteredNews: NewsProps[];
    loading: boolean;
    error: string | null;
    filters: Filters;
    personalisedFilters: PersonalisedFilters;
  }
  
  export interface Params {
    query?: string;
    date?: string | null;
    sources: Source[];
  }
