import React from "react";
import FilterBar from "../components/FilterBar";
import PolicyTable from "../components/PolicyTable";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";

export const Home = () => {
  const [policies, setPolices] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    minPremium: "",
    maxPremium: "",
    policyType: "",
    minCoverage: "",
    sort: "asc",
    page: 1,
    limit: 5,
  });

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPolicies = async () => {
      const params = new URLSearchParams({
        ...filters,
        page: filters.page,
        limit: filters.limit,
      });
      console.log(`${params}`);
      const res = await fetch(`http://127.0.0.1:8000/policies?${params}`);
      const data = await res.json();
      console.log(data.results);
      setPolices(data.results || []);
      setTotalPages(data.total_pages || 1);
    };

    fetchPolicies();
  }, [filters]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="test-2xl font-bold mb-4">Insurance Policies</h1>
      <FilterBar setFilters={setFilters} filters={filters} />
      <PolicyTable policies={policies} />
      <Pagination
        totalPages={totalPages}
        page={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};
