// FilterPanel.js
import React from "react";

const FilterPanel = ({ filters, onFilterChange }) => {
  const specialities = [
    "General Physician",
    "Dentist",
    "Dermatologist",
    "Paediatrician",
    "Gynaecologist",
    "ENT",
    "Diabetologist",
    "Cardiologist",
    "Physiotherapist",
    "Endocrinologist",
    "Orthopaedic",
    "Ophthalmologist",
    "Gastroenterologist",
    "Pulmonologist",
    "Psychiatrist",
    "Urologist",
    "Dietitian/Nutritionist",
    "Psychologist",
    "Sexologist",
    "Nephrologist",
    "Neurologist",
    "Oncologist",
    "Ayurveda",
    "Homeopath"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-5 shadow rounded-lg w-full md:w-64 border border-gray-200 dark:border-gray-700">
      <h3 data-testid="filter-header-moc" className="font-bold text-lg mb-2 text-blue-600">Consultation Mode</h3>
      <div className="mb-4">
        <label className="block">
          <input
            type="radio"
            name="mode"
            data-testid="filter-video-consult"
            checked={filters.mode === "Video Consult"}
            onChange={() => onFilterChange("mode", "Video Consult")}
          /> Video Consult
        </label>
        <label className="block">
          <input
            type="radio"
            name="mode"
            data-testid="filter-in-clinic"
            checked={filters.mode === "In Clinic"}
            onChange={() => onFilterChange("mode", "In Clinic")}
          /> In Clinic
        </label>
      </div>

      <h3 data-testid="filter-header-speciality" className="font-bold text-lg mb-2 text-blue-600">Speciality</h3>
      <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto">
        {specialities.map((spec) => (
          <label key={spec} className="text-sm">
            <input
              type="checkbox"
              data-testid={`filter-specialty-${spec.replaceAll("/", "-").replaceAll(" ", "-")}`}
              checked={filters.specialties.includes(spec)}
              onChange={() => onFilterChange("specialties", spec)}
            /> {spec}
          </label>
        ))}
      </div>

      <h3 data-testid="filter-header-sort" className="font-bold text-lg mt-4 mb-2 text-blue-600">Sort By</h3>
      <div>
        <label className="block">
          <input
            type="radio"
            name="sort"
            data-testid="sort-fees"
            checked={filters.sort === "fees"}
            onChange={() => onFilterChange("sort", "fees")}
          /> Fees (Low to High)
        </label>
        <label className="block">
          <input
            type="radio"
            name="sort"
            data-testid="sort-experience"
            checked={filters.sort === "experience"}
            onChange={() => onFilterChange("sort", "experience")}
          /> Experience (High to Low)
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
