import { Box, Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";
import { validatefacilitiesString } from "../utils/Common";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails?.title || "",
      description: propertyDetails?.description || "",
      price: propertyDetails?.price || "",
      listType: propertyDetails?.listType || "",
    },
    validate: {
      title: (value) => validatefacilitiesString(value),
      description: (value) => validatefacilitiesString(value),
      price: (value) => validatefacilitiesString(value),
      listType: (value) => (value ? null : "List type is required"),
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        title: form.values.title,
        description: form.values.description,
        price: parseInt(form.values.price, 10), // Convert to integer
        listType: form.values.listType,
      }));
      nextStep();
    }
  };

  return (
    <Box maxWidth={"30%"} mx="auto" my={"sm"}>
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          label="Title"
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Description"
          {...form.getInputProps("description")}
        />
        <TextInput
          withAsterisk
          label="Price"
          type="number" // Ensure input type is number
          {...form.getInputProps("price")}
        />
        <Select
          withAsterisk
          label="List Type"
          data={["SELL", "BUY", "RENT"]}
          {...form.getInputProps("listType")}
        />
        <Group position="center" mt="xl">
          <Button type="button" onClick={prevStep} variant="default">
            Back
          </Button>
          <Button type="submit" color="green">
            Next
          </Button>
        </Group>
      </form>
    </Box>
  );
};

BasicDetails.propTypes = {
  prevStep: PropTypes.func.isRequired,
  propertyDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    listType: PropTypes.string,
  }).isRequired,
  setPropertyDetails: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default BasicDetails;
