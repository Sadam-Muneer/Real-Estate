import { useState } from "react";
import Item from "../components/Item";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Slider from "rc-slider"; // Import the slider component
import "rc-slider/assets/index.css"; // Import the slider styles

const Listing = () => {
  const { data: properties, isError, isLoading } = useProperties();
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [bedrooms, setBedrooms] = useState(""); // State for bedrooms
  const [bathrooms, setBathrooms] = useState(""); // State for bathrooms
  const [parking, setParking] = useState(""); // State for parking
  const [priceRange, setPriceRange] = useState([0, 1000000]); // State for price range

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "All") {
      setSelectedCity(""); // Reset selected city when "All" category is selected
      setBedrooms("");
      setBathrooms("");
      setParking("");
      setPriceRange([0, 1000000]); // Reset price range when "All" category is selected
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleBathroomsChange = (event) => {
    setBathrooms(event.target.value);
  };

  const handleParkingChange = (event) => {
    setParking(event.target.value);
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        Data Loading...
        <PuffLoader size={80} color="#555" />
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

    // Convert input values to numbers or default to 0 if empty
    const inputBedrooms = bedrooms ? parseInt(bedrooms, 10) : 0;
    const inputBathrooms = bathrooms ? parseInt(bathrooms, 10) : 0;
    const inputParking = parking ? parseInt(parking, 10) : 0;

    // Property values are checked against inputs if inputs are provided
    const matchesBedrooms =
      !bedrooms || property.facilities.bedroom >= inputBedrooms;
    const matchesBathrooms =
      !bathrooms || property.facilities.bathroom >= inputBathrooms;
    const matchesParking =
      !parking || property.facilities.parking >= inputParking;

    // Check if property price falls within the selected price range
    const matchesPriceRange =
      property.price >= priceRange[0] && property.price <= priceRange[1];

    return (
      matchesCategory &&
      matchesSearchTerm &&
      matchesCity &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesParking &&
      matchesPriceRange
    );
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
        <div className="flex mt-8 space-x-2">
          <button
            onClick={() => handleCategoryChange("All")}
            className="btn-category btn-secondary rounded-xl !py-[7px]  shadow-sm mb-2 sm:mb-0 sm:w-auto w-full px-2 "
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange("BUY")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-3 shadow-sm mb-2 sm:mb-0 sm:w-auto w-full  "
          >
            BUY
          </button>
          <button
            onClick={() => handleCategoryChange("SELL")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-3 shadow-sm mb-2 sm:mb-0 sm:w-auto w-full "
          >
            SELL
          </button>
          <button
            onClick={() => handleCategoryChange("RENT")}
            className="btn-category btn-secondary rounded-xl !py-[7px] !px-3 shadow-sm mb-2 sm:mb-0 sm:w-auto w-full "
          >
            RENT
          </button>
        </div>

        <div className="flex flex-wrap mt-8">
          <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <h4>City</h4>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="border rounded-md p-2 w-full sm:w-auto"
            >
              <option value="">All Cities</option>
              <option value="Lahore">Lahore</option>
              <option value="Multan">Multan</option>
            </select>
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <h4>Bedrooms</h4>
            <input
              type="number"
              value={bedrooms}
              onChange={handleBedroomsChange}
              className="border rounded-md p-2 w-full sm:w-auto"
              placeholder="Any"
            />
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <h4>Bathrooms</h4>
            <input
              type="number"
              value={bathrooms}
              onChange={handleBathroomsChange}
              className="border rounded-md p-2 w-full sm:w-auto"
              placeholder="Any"
            />
          </div>
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h4>Parking</h4>
            <input
              type="number"
              value={parking}
              onChange={handleParkingChange}
              className="border rounded-md p-2 w-full sm:w-auto"
              placeholder="Any"
            />
          </div>
        </div>

        <div>
          <h4>Price Range</h4>
          <Slider
            range
            min={0}
            max={1000000}
            defaultValue={priceRange}
            onChange={handlePriceRangeChange}
            value={priceRange}
            className="mt-2"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>PKR {priceRange[0]}</span>
            <span>PKR {priceRange[1]}</span>
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
