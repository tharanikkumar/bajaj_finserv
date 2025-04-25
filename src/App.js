// App.js
import React, { useEffect, useState } from "react";
import DoctorList from "./components/DoctorList";
import FilterPanel from "./components/FilterPanel";
import SearchBar from "./components/SearchBar";
import axios from "axios";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    mode: "",
    specialties: [],
    sort: ""
  });

  useEffect(() => {
    axios.get("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json").then((res) => {
      setDoctors(res.data);
      setFilteredDoctors(res.data);
    });
  }, []);

  useEffect(() => {
    let result = [...doctors];

    if (searchQuery.trim()) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.mode) {
      result = result.filter((doc) =>
        filters.mode === "Video Consult" ? doc.video_consult : doc.in_clinic
      );
    }

    if (filters.specialties.length > 0) {
      result = result.filter((doc) =>
        doc.specialities?.some((spec) => filters.specialties.includes(spec.name))
      );
    }

    if (filters.sort === "fees") {
      result = result.sort(
        (a, b) => parseInt(a.fees.replace(/[^0-9]/g, "")) - parseInt(b.fees.replace(/[^0-9]/g, ""))
      );
    } else if (filters.sort === "experience") {
      result = result.sort(
        (a, b) => parseInt(b.experience) - parseInt(a.experience)
      );
    }

    setFilteredDoctors(result);
  }, [searchQuery, filters, doctors]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      if (key === "specialties") {
        return {
          ...prev,
          specialties: prev.specialties.includes(value)
            ? prev.specialties.filter((v) => v !== value)
            : [...prev.specialties, value]
        };
      } else {
        return { ...prev, [key]: value };
      }
    });
  };

  const nameSuggestions = doctors
    .filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((doc) => doc.name);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-blue-700 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center tracking-wide">Campus Doctor Directory</h1>
      </header>

      <div className="grid md:grid-cols-4 gap-4 p-6 max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            suggestions={nameSuggestions}
          />

          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}

export default App;
