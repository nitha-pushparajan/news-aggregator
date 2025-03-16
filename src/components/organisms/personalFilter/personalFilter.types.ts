import {MultiValue} from 'react-select';
import { Source, PersonalisedFilters } from '../../../interfaces/common.types';

export interface NewsFilterProps {
  handleItemClick: (newsSources: Source[]) => void;
  onCategoryChange: (selected: MultiValue<{ value: string; label: string }>) => void;
  categories: string[];
  onAuthorsChange: (selected: MultiValue<{ value: string; label: string }>) => void;
  authors: string[];
  filters: PersonalisedFilters;
}
