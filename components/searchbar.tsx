import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Avatar } from '@nextui-org/react';
import NextLink from 'next/link';
import { SearchIcon } from '@/components/icons';
import { MovieModel } from "@/models/movieModel"
import { IMG_BASE_URL } from '@/config/const';



const SearchBar: React.FC<{
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  movieSuggestions: MovieModel[];
}> = ({ searchValue, setSearchValue, movieSuggestions }) => {
  return (
    <Autocomplete
      inputValue={searchValue}
      onInputChange={(newValue) => setSearchValue(newValue)}
      classNames={{
        base: 'max-w-[100rem]',
        listboxWrapper: 'max-h-[320px]',
        selectorButton: 'text-default-500',
      }}
      defaultItems={movieSuggestions}
      inputProps={{
        classNames: {
          input: 'ml-1',
          inputWrapper: 'h-[48px]',
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            'rounded-large',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'dark:data-[hover=true]:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[hover=true]:bg-default-200',
            'data-[selectable=true]:focus:bg-default-100',
            'data-[focus-visible=true]:ring-default-500',
          ],
        },
      }}
      aria-label="Search"
      placeholder="Search"
      popoverProps={{
        offset: 15,
        classNames: {
          base: 'rounded-large',
          content: 'p-1 border-small border-default-100 bg-background',
        },
      }}
      startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
      radius="lg"
      size="md"
      fullWidth={true}
    >
      {(item: MovieModel) => (
        <AutocompleteItem key={item.id} textValue={item.title}>
          <NextLink
            href={{
              pathname: `/movie/${item.id}`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar alt={item.title} className="flex-shrink-0" size="md" src={IMG_BASE_URL + item.posterPath} />
                <div className="flex flex-col">
                  <span className="text-base">{item.title}</span>
                  <span className="text-sm text-default-400">{item.overview}</span>
                </div>
              </div>
            </div>
          </NextLink>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default SearchBar;
