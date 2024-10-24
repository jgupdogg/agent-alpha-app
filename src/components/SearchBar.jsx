// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch, loading, error }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="
            flex-grow px-4 py-2 rounded-l-lg border
            border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-primary
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
          "
        />
        <button
          type="submit"
          className="
            px-4 py-2 font-semibold rounded-r-lg
            bg-primary dark:bg-secondary
            text-white dark:text-gray-900
            hover:bg-secondary dark:hover:bg-primary
            focus:outline-none focus:ring-2 focus:ring-primary
            disabled:opacity-50
          "
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default SearchBar;
