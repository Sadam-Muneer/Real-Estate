import PropTypes from "prop-types";
import { Container, Modal, Stepper } from "@mantine/core";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddLocation from "./AddLocation";
import UploadImage from "./UploadImage";
import Facilities from "./Facilities";
import BasicDetails from "./BasicDetails";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  // Initialize state for property details
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedroom: "",
      bathroom: "",
      parking: "",
    },
    listType: "",
    userEmail: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setPropertyDetails((prevDetails) => ({
        ...prevDetails,
        userEmail: user.email || "",
      }));
    }
  }, [isAuthenticated, user]);

  const nextStep = () => {
    console.log("Current Step:", activeStep);
    console.log("Property Details:", propertyDetails);
    setActiveStep((current) => current + 1);
  };

  const prevStep = () => setActiveStep((current) => current - 1);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"34rem"} w={"100%"}>
        <Stepper
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="Location"
            description="Address"
            onClick={nextStep}
          >
            <AddLocation
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Upload Image" description="Verify Image">
            <UploadImage
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Facilities" description="Get full access">
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActiveStep}
            />
          </Stepper.Step>

          <Stepper.Completed>
            {/* Optionally add a completion step or final summary here */}
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

AddPropertyModel.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
};

export default AddPropertyModel;
