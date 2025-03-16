import { FC } from 'react';
import { SourceButtonsProps } from "./sourceButtons.types";
import { Source } from 'src/interfaces/common.types';

const SourceButtons: FC<SourceButtonsProps> = ({items, selectedItems, onSelection}) => {

  const handleItemClick = (itemId: Source) => {
    const sources = selectedItems;
    let newsSources;
    if (sources.includes(itemId)) {
      newsSources = sources.filter((id) => id !== itemId);
    } else {
      newsSources = [...sources, itemId];
    }
    onSelection(newsSources);
  }
  
  return <div className="md:flex gap-2 mx-auto mt-10 mb-10 justify-center items-center">
  <h3 className="text-xl text-[#837d7d] mb-2 md:mb-0 hidden md:block">Select Sources</h3>
  <ul className="flex gap-2 items-center justify-center">
    {items.map((item) => (
      <li
        key={item.id}
        onClick={() => handleItemClick(item.id)}
        className={`cursor-pointer px-4 py-1 rounded-md border-2 border-[#3d9939] text-[#3d9939] px-4 rounded hover:bg-[#3d9939] hover:text-white focus:outline-none ${selectedItems.includes(item.id)
            ? 'bg-[#3d9939] !text-white': ''
          }`}
      >
        {item.label}
      </li>
    ))}
  </ul>
</div>
};

export default SourceButtons;
