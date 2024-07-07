import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MdAddHome, MdHomeWork, MdPermContactCalendar } from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";

const Navbar = ({ containerStyles, closeMenu }) => {
  return (
    <nav className={containerStyles}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
        onClick={closeMenu}
      >
        <MdHomeWork />
        <div>Home</div>
      </NavLink>

      <NavLink
        to="/listing"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
        onClick={closeMenu}
      >
        <RiCheckboxMultipleBlankFill />
        <div>Listing</div>
      </NavLink>

      <NavLink
        to="mailto:sadammuneer390@gmail.com"
        className="flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer "
        onClick={closeMenu}
      >
        <MdPermContactCalendar />
        <div>Contact</div>
      </NavLink>

      <NavLink
        to="/addproperty"
        className="flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer "
        onClick={closeMenu}
      >
        <MdAddHome />
        <div>Add Property</div>
      </NavLink>
    </nav>
  );
};

Navbar.propTypes = {
  containerStyles: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default Navbar;
