// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ searchQuery, onSearch, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInput = (e) => {
    onSearch(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        data-testid="autocomplete-input"
        className="w-full p-3 pl-5 pr-5 rounded-full border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md"
        type="text"
        placeholder="Search for doctors by name..."
        value={searchQuery}
        onChange={handleInput}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full mt-1 rounded-md shadow-lg z-10">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              onMouseDown={() => onSearch(suggestion)}
              className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
