import PropTypes from "prop-types";
import { Button, Group } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  nextStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dg4hrwtjo",
        uploadPreset: "hxvnpeux",
        maxFiles: 1,
      },
      (error, result) => {
        if (result.event === "success") {
          const secureUrl = result.info.secure_url;
          setImageURL(secureUrl);
          setPropertyDetails((prev) => ({
            ...prev,
            image: secureUrl,
          }));
        }
      }
    );
  }, [setPropertyDetails]);

  return (
    <div className="mt-12 flexCenter flex-col">
      {!imageURL ? (
        <div
          onClick={() => widgetRef.current.open()}
          className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
        >
          <label htmlFor="image-upload" className="cursor-pointer">
            <MdOutlineCloudUpload size={"44px"} color="grey" />
            <span>Click to Upload Image</span>
          </label>
        </div>
      ) : (
        <div>
          <img
            src={imageURL}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="flex justify-center mt-4 flexCenter pb-4">
            <Group justify="center" mt="xl" className="mr-4">
              <Button onClick={prevStep} type="button">
                Go Back
              </Button>
              <Button onClick={nextStep} disabled={!imageURL} type="button">
                Next step
              </Button>
            </Group>
          </div>
        </div>
      )}
    </div>
  );
};

UploadImage.propTypes = {
  propertyDetails: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
  setPropertyDetails: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UploadImage;
