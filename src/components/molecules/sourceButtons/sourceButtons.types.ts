import {Source, NewsSource} from 'src/interfaces/common.types';

export interface SourceButtonsProps {
  items: NewsSource[];
  selectedItems: Source[];
  onSelection: (source: Source[]) => void;
}
