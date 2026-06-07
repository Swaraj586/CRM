import React from "react";

function FilterSort({ statusFilter, setStatusFilter, dateSort, setDateSort }) {
  return (
    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 bg-white text-sm text-gray-700 px-3 py-2 rounded-xl outline-none focus:border-blue-500 transition-all cursor-pointer shadow-xs"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Sort Date:
        </label>
        <select
          value={dateSort}
          onChange={(e) => setDateSort(e.target.value)}
          className="border border-gray-200 bg-white text-sm text-gray-700 px-3 py-2 rounded-xl outline-none focus:border-blue-500 transition-all cursor-pointer shadow-xs"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;
