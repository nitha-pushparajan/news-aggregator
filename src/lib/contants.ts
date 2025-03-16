import { NewsSource } from "src/interfaces/common.types";

export const SOURCE_NYT = 'nyt' as const;
export const SOURCE_NEWSAPI = 'newsapi' as const;
export const SOURCE_GUARDIAN = 'guardian' as const;

export const NEWS_SOURCES: NewsSource[] = [
  { id: SOURCE_NYT, label: 'Newyork Times' },
  { id: SOURCE_NEWSAPI, label: 'News API' },
  { id: SOURCE_GUARDIAN, label: 'Guardian' },
];

export const URLS = {
  nyt: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=ELOcWDw61Kg4rsOghjlig4kuovmsCea1&facet_fields=source&facet=true',
  newsapi: 'https://newsapi.org/v2/everything?sources=the-verge&apiKey=5d535bc0584d4a40a21ea9bd15dc1a84',
  guardian: 'https://content.guardianapis.com/search?api-key=fa9e1b21-b86d-41e2-a0b8-a1127e508c83&show-fields=all'
};

export const NEWSFILTERTYPE = {
  NEWS: 'news',
  PERSONAL: 'personal'
}
