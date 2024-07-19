import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../utils/Api";
import { PuffLoader } from "react-spinners";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import UseAuthChck from "../hooks/UseAuthChck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModel from "../components/BookingModel";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError, error } = useQuery(["residency", id], () =>
    getProperty(id)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const { validateLogin } = UseAuthChck();
  const { user } = useAuth0();

  useEffect(() => {
    const storedBookingDate = localStorage.getItem(`${id}_bookingDate`);
    setBookingDate(storedBookingDate ? new Date(storedBookingDate) : null);
    setIsBooked(localStorage.getItem(`${id}_isBooked`) === "true");
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        Data Loading...
        <PuffLoader size={80} color="#555" />
      </div>
    );
  }

  if (isError) {
    console.error("Error while fetching the data:", error);
    return (
      <div className="h-64 flexCenter">
        Error while fetching the data: {error.message}
      </div>
    );
  }

  const { image, title, city, description, price, facilities, listType } = data;

  return (
    <div className="max-padd-container my-[99px] pt-10">
      <div className="pb-2 relative">
        <img
          src={image}
          alt={title}
          className="rounded-xl max-h-[27rem] self-center w-full object-cover "
        />
      </div>
      <div className="xl:flexBetween gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h5 className="bold-16 my-1 text-secondary">{city}</h5>
            <span className="bold-16 text-gray-500">{listType}</span>
          </div>
          <div className="flexBetween">
            <h4 className="medium-18 line-clamp-1">{title}</h4>
            <div className="bold-20">${price}.00</div>
          </div>
          <div className="flex gap-x-4 py-2">
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed /> {facilities.bedroom}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathtub /> {facilities.bathroom}
            </div>
            <div className="flexCenter gap-x-2 pr-4 font-[500]">
              <MdOutlineGarage /> {facilities.parking}
            </div>
          </div>
          <p className="pt-2 mb-4">{description}</p>
          <div className="flexStart gap-x-2 my-5">
            <FaLocationDot />
            {data?.address} {data?.city} {data?.country}
          </div>
          <div className="flexBetween">
            <button
              onClick={() => {
                if (validateLogin()) {
                  setModalOpen(true);
                }
              }}
              className="btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm"
            >
              {isBooked ? "Cancel Booking" : "Book the visit"}
            </button>

            <BookingModel
              opened={modalOpen}
              setOpened={setModalOpen}
              propertyId={id}
              email={user?.email}
              setIsBooked={setIsBooked}
              setBookingDate={setBookingDate}
            />
          </div>
          <div className="pt-5">
            {isBooked && bookingDate && (
              <p className="text-red-400">
                This property has been booked by you on{" "}
                {bookingDate.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <Map
            address={data?.address}
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </div>
  );
};

export default Property;
