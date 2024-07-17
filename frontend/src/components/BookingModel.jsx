import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailsContext from "../context/UserDetailsContext";
import { toast } from "react-toastify";
import { bookVisit } from "../utils/Api";

const BookingModel = ({ opened, setOpened, propertyId, email }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { userDetails } = useContext(UserDetailsContext);

  const handleBookingSuccessful = () => {
    toast.success("Visit booked successfully!");
    setSelectedDate(null);
    setOpened(false);
  };

  const mutation = useMutation(
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
        if (
          error.response &&
          error.response.data.message ===
            "This Residency is Already Booked By You"
        ) {
          toast.error("You have already booked this visit.");
        } else {
          toast.error("Something went wrong, please try again.");
        }
      },
    }
  );

  const handleBookVisit = () => {
    if (selectedDate && email) {
      mutation.mutate(selectedDate);
    } else {
      toast.error("Please select a date and provide your email.");
    }
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
            disabled={!selectedDate || mutation.isLoading}
            onClick={handleBookVisit}
          >
            {mutation.isLoading ? "Booking..." : "Book Visit"}
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
};

export default BookingModel;
