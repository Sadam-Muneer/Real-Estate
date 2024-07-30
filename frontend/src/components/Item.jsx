import PropTypes from "prop-types";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Item = ({ property }) => {
  const { listType, image, title, city, description, price, facilities, id } =
    property;
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl p-3 bg-white">
      <div className="pb-2 relative">
        <img src={image} alt={title} className="rounded-xl" />
      </div>
      <div className="flex justify-between items-center">
        <h5 className="bold-16 my-1 text-secondary">{city}</h5>
        <span className="bold-16 text-gray-500">{listType}</span>
      </div>
      <h4 className="medium-18 line-clamp-1">{title}</h4>
      <div className="flex gap-x-2 py-2">
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBed /> {facilities.bedroom}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineBathtub /> {facilities.bathroom}
        </div>
        <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
          <MdOutlineGarage /> {facilities.parking}
        </div>
      </div>
      <p className="pt-2 mb-4 line-clamp-2">{description}</p>
      <div className="flexBetween">
        <div className="bold-20">{price}.00 PKR</div>
        <button
          onClick={() => navigate(`/listing/${id}`)}
          className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    facilities: PropTypes.shape({
      bedroom: PropTypes.number.isRequired,
      bathroom: PropTypes.number.isRequired,
      parking: PropTypes.number.isRequired,
    }).isRequired,
    listType: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
