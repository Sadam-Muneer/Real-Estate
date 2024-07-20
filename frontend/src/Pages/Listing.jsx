import { useState } from "react";
import Item from "../components/Item";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";

const Listing = () => {
  const { data: properties, isError, isLoading } = useProperties();
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "All") {
      setSelectedCity(""); // Reset selected city when "All" category is selected
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        Data Loading...
        <PuffLoader size={80} color="#555" aria-label="puff-loading" />
      </div>
    );
  }

  if (isError) {
    return <div>Error while fetching the data</div>;
  }

  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      category === "All" || property.listType === category;
    const matchesSearchTerm =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "" || property.city === selectedCity;
    return matchesCategory && matchesSearchTerm && matchesCity;
  });

  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 rounded-3xl">
        <div>
          <Searchbar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => handleCategoryChange("All")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange("BUY")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            BUY
          </button>
          <button
            onClick={() => handleCategoryChange("SELL")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            SELL
          </button>
          <button
            onClick={() => handleCategoryChange("RENT")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            RENT
          </button>
        </div>
        <div className="flex mt-8">
          <div className="flex-shrink-0">
            <h4>City</h4>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="border rounded-md p-2"
            >
              <option value="">All Cities</option>
              <option value="Lahore">Lahore</option>
              <option value="Multan">Multan</option>
            </select>
          </div>
        </div>
        {filteredProperties.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
            {filteredProperties.map((property) => (
              <Item key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center col-span-full">
            <h4 className="text-lg font-bold">
              No listings available based on your search
            </h4>
          </div>
        )}
      </div>
    </main>
  );
};

export default Listing;
