import PropTypes from "prop-types";
import { Container, Modal, Stepper } from "@mantine/core";
import { useState } from "react";
import AddLocation from "./AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "./UploadImage";

const AddPropertyModel = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();
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
    userEmail: user?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"34rem"} w={"100%"}>
        <>
          <Stepper
            active={active}
            onStepClick={setActive}
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
            <Stepper.Step label="Final step" description="Get full access">
              Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </>
      </Container>
    </Modal>
  );
};

AddPropertyModel.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
};

export default AddPropertyModel;
