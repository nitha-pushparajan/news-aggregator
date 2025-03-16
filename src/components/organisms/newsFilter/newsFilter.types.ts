import {MultiValue} from 'react-select';

import { Source, Filters } from '../../../interfaces/common.types';

export interface NewsFilterProps {
  handleItemClick: (newsSources: Source[]) => void;
  onDateChange: (date: Date | null) => void;
  onCategoryChange: (selected: MultiValue<{ value: string; label: string }>) => void;
  categories: string[];
  onSearch: (searchInput: string) => void;
  filters: Filters;
}
