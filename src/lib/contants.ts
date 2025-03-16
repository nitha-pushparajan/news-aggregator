import { NewsSource } from "src/interfaces/common.types";

const NYT_API_KEY = import.meta.env.VITE_API_KEY_NYT;
const NEWS_API_KEY = import.meta.env.VITE_API_KEY_NEWSAPI;
const GUARDIAN_API_KEY = import.meta.env.VITE_API_KEY_GUARDIAN;

export const SOURCE_NYT = 'nyt' as const;
export const SOURCE_NEWSAPI = 'newsapi' as const;
export const SOURCE_GUARDIAN = 'guardian' as const;


export const NEWS_SOURCES: NewsSource[] = [
  { id: SOURCE_GUARDIAN, label: 'Guardian' },
  { id: SOURCE_NEWSAPI, label: 'News API' },
  { id: SOURCE_NYT, label: 'Newyork Times' },
];

export const URLS = {
  nyt: `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_API_KEY}`,
  newsapi: `https://newsapi.org/v2/everything?sources=the-verge&apiKey=${NEWS_API_KEY}`,
  guardian: `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=all`
};

export const NEWSFILTERTYPE = {
  NEWS: 'news',
  PERSONAL: 'personal'
}
