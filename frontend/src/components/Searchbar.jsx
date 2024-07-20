import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";

const Searchbar = ({ searchTerm, onSearchChange }) => {
  return (
    <>
      <div className="flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5">
        <input
          type="text"
          placeholder="Enter residency name/city/country"
          className="bg-transparent border-none outline-none w-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <FaLocationDot className="relative right-4 text-xl hover:text-secondary cursor-pointer" />
      </div>
    </>
  );
};

Searchbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default Searchbar;
