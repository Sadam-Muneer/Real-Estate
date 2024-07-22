import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import UserDetailsContext from "../context/UserDetailsContext";
import useProperties from "../hooks/useProperties";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { createResidency } from "../utils/Api";
import { validatefacilitiesString } from "../utils/Common";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedroom: propertyDetails?.facilities?.bedroom || 0,
      bathroom: propertyDetails?.facilities?.bathroom || 0,
      parking: propertyDetails?.facilities?.parking || 0,
    },
    validate: {
      bedroom: (value) => validatefacilitiesString(value),
      bathroom: (value) => validatefacilitiesString(value),
      parking: (value) => validatefacilitiesString(value),
    },
  });

  const { bedroom, bathroom, parking } = form.values;

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailsContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedroom, bathroom, parking },
        },
        token,
        user?.email
      ),
    onSuccess: () => {
      toast.success("Property added successfully", {
        position: "bottom-right",
      });
      setPropertyDetails({
        title: "",
        description: "",
        price: "",
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedroom: 0,
          bathroom: 0,
          parking: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
    onError: (error) => {
      console.error("Error details:", error); // Log full error details
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, try again please",
        {
          position: "bottom-right",
        }
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { hasError } = form.validate();
    if (!hasError) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedroom, bathroom, parking },
      }));
      mutate();
    }
  };

  return (
    <Box maxWidth={"30%"} mx="auto" my={"sm"}>
      <form onSubmit={handleSubmit}>
        <div className="flexCenter">
          <div className="flexCenter flex-1">
            <div>
              <NumberInput
                withAsterisk
                label="No of bedroom"
                min={0}
                {...form.getInputProps("bedroom", { type: "number" })}
              />
              <NumberInput
                withAsterisk
                label="No of bathroom"
                min={0}
                {...form.getInputProps("bathroom", { type: "number" })}
              />
              <NumberInput
                withAsterisk
                label="No of parking"
                min={0}
                {...form.getInputProps("parking", { type: "number" })}
              />
            </div>
          </div>
        </div>
        <Group position="center" mt="xl">
          <Button type="button" onClick={prevStep} variant="default">
            Previous
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

Facilities.propTypes = {
  prevStep: PropTypes.func.isRequired,
  propertyDetails: PropTypes.shape({
    facilities: PropTypes.shape({
      bedroom: PropTypes.number,
      bathroom: PropTypes.number,
      parking: PropTypes.number,
    }),
  }).isRequired,
  setPropertyDetails: PropTypes.func.isRequired,
  setOpened: PropTypes.func.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default Facilities;
