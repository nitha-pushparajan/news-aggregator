import { useState } from "react";
import { FC } from 'react';
import { SearchInputProps } from './searchInput.types';
import Search from './../../icons/search';

const SearchInput:FC<SearchInputProps> = ({onSearch}) => {
      const [searchInput, setSearchInput] = useState<string>('');

      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
      }

      const onSearchHandler = () => {
        onSearch(searchInput);
      }

      return <form className="max-w-lg w-full items-center">
        <div className="flex">
            <div className="relative w-full">
                <input type="search" id="search-dropdown" value={searchInput} onChange={onChange} className="block p-2.5 h-[38px] w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-[.25em] border border-gray-300 outline-none" placeholder="Search News..." required />
                <button type="button" onClick={onSearchHandler} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#3D9939] rounded-tr-[.25em] rounded-br-[.25em] border border-[#3D9939] focus:outline-none">
                    <Search />
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </div>
    </form>
};

export default SearchInput;
