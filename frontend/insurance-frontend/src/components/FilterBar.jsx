import React from "react";

const FilterBar = ({ setFilters, filters }) => {
  return (
    <div>
      <input
        type="text"
        value={filters.name}
        placeholder="Search by name"
        className="border p-2 rounded"
        onChange={(event) => {
          setFilters((prev) => ({
            ...prev,
            name: event.target.value,
            page: 1,
          }));
        }}
      />
      <input
        type="number"
        value={filters.minPremium}
        placeholder="min premium"
        className="border p-2 rounded"
        onChange={(event) => {
          setFilters((prev) => ({
            ...prev,
            minPremium: event.target.value,
            page: 1,
          }));
        }}
      />
      <input
        type="number"
        value={filters.maxPremium}
        placeholder="max Premium"
        className="border p-2 rounded"
        onChange={(event) => {
          setFilters((prev) => ({
            ...prev,
            maxPremium: event.target.value,
            page: 1,
          }));
        }}
      />
      <input
        type="text"
        value={filters.policyType}
        placeholder="Policy Type"
        className="border p-2 rounded"
        onChange={(event) => {
          setFilters((prev) => ({
            ...prev,
            policyType: event.target.value,
            page: 1,
          }));
        }}
      />
      <input
        type="number"
        value={filters.minCoverage}
        placeholder="Min Coverage"
        className="border p-2 rounded"
        onChange={(event) => {
          setFilters((prev) => ({
            ...prev,
            minCoverage: event.target.value,
            page: 1,
          }));
        }}
      />
      <select
        className="border p-2 rounded"
        value={filters.sort}
        onChange={(event) => {
          setFilters((prev) => ({
            ...prev,
            sort: event.target.value,
            page: 1,
          }));
        }}
      >
        <option value="asc">Sort: premium ↑</option>
        <option value="desc">Sort: premium ↓</option>
      </select>
    </div>
  );
};

export default FilterBar;
