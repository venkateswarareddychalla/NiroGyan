import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Real-time search with debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(query);
    }, 300); // 300ms delay for debouncing

    return () => clearTimeout(delayedSearch);
  }, [query, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search by doctor name or specialization..."
          className="block w-full pl-6 pr-16 py-3 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg shadow-sm hover:shadow-md transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="mr-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            onClick={() => onSearch(query)}
            className="p-2 pr-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200 group cursor-pointer"
          >
            <svg className="h-6 w-6 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
