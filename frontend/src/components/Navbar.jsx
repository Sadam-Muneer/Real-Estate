import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MdAddHome, MdHomeWork } from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
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
        to="/agent"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
        onClick={closeMenu}
      >
        <MdPerson />
        <div>Agent</div>
      </NavLink>
      <NavLink
        to="/addproperty"
        className={({ isActive }) =>
          isActive
            ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1"
            : "flexCenter gap-x-1 rounded-full px-2 py-1 "
        }
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
