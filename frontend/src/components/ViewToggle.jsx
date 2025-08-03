const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm border border-blue-500 p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
          view === 'grid'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
        title="Grid View"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
          view === 'list'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
        title="List View"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default ViewToggle;
