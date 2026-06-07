import React from "react";

function Search({ searchTerm, setSearchTerm, placeholder = "Search..." }) {
  return (
    <div className="mb-6 w-full md:w-1/2">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-800"
        />
        <span className="absolute left-3.5 text-gray-400 text-2xl text-center">
          ⌕
        </span>

        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs bg-gray-100 px-1.5 py-0.5 rounded-md"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
