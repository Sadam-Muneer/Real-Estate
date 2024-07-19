export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};

// utils/Common.js
export const validatefacilitiesString = (value) => {
  if (!value || value.length < 1) {
    return "Must have at least 1 character";
  }
  return null;
};
