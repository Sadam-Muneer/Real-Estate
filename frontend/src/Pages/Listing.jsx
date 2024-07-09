import { useState } from "react";
import { PROPERTIES } from "../constants/data";
import Item from "../components/Item";
import Searchbar from "../components/Searchbar";

const Properties = () => {
  const [category, setCategory] = useState("all");
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  const filteredProperties = PROPERTIES.filter((property) => {
    if (category === "all") return true;
    return property.listingType === category;
  });
  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22  rounded-3xl">
        <div>
          <Searchbar />
        </div>
        <div className="flex  space-x-4 mt-8">
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
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
          {filteredProperties.map((property) => (
            <Item key={property.title} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
};
export default Properties;
