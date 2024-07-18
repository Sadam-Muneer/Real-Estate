import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { MdAddHome, MdHomeWork } from "react-icons/md";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import { useState } from "react"; // Import useState hook
import AddPropertyModel from "./AddPropertyModel";
import UseAuthChck from "../hooks/UseAuthChck";

const Navbar = ({ containerStyles, closeMenu }) => {
  const [modelOpened, setModelOpened] = useState(false); // State to manage modal open/close
  const { validateLogin } = UseAuthChck();

  const handleAddProperyClick = () => {
    if (validateLogin()) {
      setModelOpened(true); // Open the modal if user is authenticated
    }
  };

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
      <div
        onClick={handleAddProperyClick}
        className="flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"
      >
        <MdAddHome />
        <div>Add Property</div>
      </div>
      <AddPropertyModel opened={modelOpened} setOpened={setModelOpened} />
    </nav>
  );
};

Navbar.propTypes = {
  containerStyles: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default Navbar;
