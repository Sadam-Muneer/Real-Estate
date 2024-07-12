import { useState } from "react";
import Item from "../components/Item";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";

const Listing = () => {
  const { data: properties, isError, isLoading } = useProperties();
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading properties</div>;
  }

  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      category === "all" || property.listingType === category;
    const matchesSearchTerm =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
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
            onClick={() => handleCategoryChange("all")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange("Buy")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            Buy
          </button>
          <button
            onClick={() => handleCategoryChange("Sell")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            Sell
          </button>
          <button
            onClick={() => handleCategoryChange("Rent")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
          >
            Rent
          </button>
        </div>
        {filteredProperties.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
            {filteredProperties.map((property) => (
              <Item key={property._id} property={property} />
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
