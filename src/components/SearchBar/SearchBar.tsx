import React from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search posts by title or description...' 
}) => {
  return (
    <div className="search-bar">
      <div className="container">
        <div className="search-bar__wrapper">
          <input
            type="text"
            className="search-bar__input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Search posts"
          />
          {value && (
            <button
              className="search-bar__clear"
              onClick={() => onChange('')}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
