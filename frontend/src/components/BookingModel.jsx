import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailsContext from "../context/UserDetailsContext";
import { toast } from "react-toastify";
import { bookVisit, cancelVisit } from "../utils/Api";

const BookingModel = ({
  opened,
  setOpened,
  propertyId,
  email,
  setIsBooked,
  setBookingDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { userDetails } = useContext(UserDetailsContext);

  const handleBookingSuccessful = () => {
    toast.success("Visit booked successfully!");
    setSelectedDate(null);
    setOpened(false);
    setIsBooked(true);
    setBookingDate(selectedDate);
    localStorage.setItem("bookingDate", selectedDate.toISOString());
  };

  const handleCancelBookingSuccessful = () => {
    setOpened(false);
    setIsBooked(false);
    setBookingDate(null);
    localStorage.removeItem("bookingDate");
  };

  const bookingMutation = useMutation(
    (date) => {
      if (!userDetails || !userDetails.token) {
        toast.error("User details not found.");
        return Promise.reject("User details not found.");
      }
      return bookVisit(date, propertyId, email, userDetails.token);
    },
    {
      onSuccess: () => handleBookingSuccessful(),
      onError: (error) => {
        console.error("Error booking visit:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message;
        if (errorMessage === "This Residency is Already Booked By You") {
          toast.error("You have already booked this visit.");
        }
      },
    }
  );

  const cancelMutation = useMutation(
    () => {
      if (!userDetails || !userDetails.token) {
        toast.error("User details not found.");
        return Promise.reject("User details not found.");
      }
      return cancelVisit(propertyId, email, userDetails.token);
    },
    {
      onSuccess: () => handleCancelBookingSuccessful(),
      onError: (error) => {
        console.error("Error canceling booking:", error);
        toast.error("Something went wrong, please try again.");
      },
    }
  );

  const handleBookVisit = () => {
    if (selectedDate && email) {
      bookingMutation.mutate(selectedDate);
    } else {
      toast.error("Please select a date and provide your email.");
    }
  };

  const handleCancelVisit = () => {
    cancelMutation.mutate();
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select Your Date To Visit"
        centered
      >
        <div className="flexCenter flex-col gap-4">
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={new Date()}
          />
          <Button
            disabled={!selectedDate || bookingMutation.isLoading}
            onClick={handleBookVisit}
          >
            {bookingMutation.isLoading ? "Booking..." : "Book Visit"}
          </Button>
          <Button
            color="red"
            disabled={cancelMutation.isLoading}
            onClick={handleCancelVisit}
          >
            {cancelMutation.isLoading ? "Canceling..." : "Cancel Booking"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

BookingModel.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setIsBooked: PropTypes.func.isRequired,
  setBookingDate: PropTypes.func.isRequired,
};

export default BookingModel;
