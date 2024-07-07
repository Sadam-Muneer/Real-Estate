import PropTypes from "prop-types";
import Heartbtn from "./Heartbtn";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { Link } from "react-router-dom";
const Item = ({ property }) => {
  return (
    <>
      <div className="rounded-2xl p-3 bg-white">
        <div className="pb-2 relative">
          <img
            src={property.image}
            alt={property.title}
            className="rounded-xl"
          />
        </div>
        <div className="absolute top-4 right-6">
          <Heartbtn />
        </div>

        <h5 className="bold-16 my-1 text-secondary">{property.city}</h5>
        <h4 className="medium-18 line-clamp-1">{property.title}</h4>
        <div className="flex gap-x-2 py-2">
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
            <MdOutlineBed /> {property.facilities.bedroom}
          </div>
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
            <MdOutlineBathtub /> {property.facilities.bathroom}
          </div>
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
            <MdOutlineGarage /> {property.facilities.parking}
          </div>
        </div>
        <p className="pt-2 mb-4 line-clamp-2">{property.description}</p>
        <div className="flexBetween">
          <div className="bold-20">${property.price}.00</div>
          <Link to={"/"}>
            <button className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
Item.propTypes = {
  property: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    facilities: PropTypes.string.isRequired,
  }).isRequired,
};
export default Item;
