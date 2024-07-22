import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://realestate-backend-psi-ebon.vercel.app/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/Allresidency", {
      timeout: 10000,
    });
    if (response.status >= 400) {
      throw new Error(response.data.message || "Something went wrong");
    }
    return response.data;
  } catch (error) {
    toast.error(
      `Error fetching properties: ${
        error.response?.data?.error || error.message
      }`
    );
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10000,
    });
    if (response.status >= 400) {
      throw new Error(response.data.message || "Something went wrong");
    }
    return response.data;
  } catch (error) {
    toast.error(
      `Error fetching property: ${error.response?.data?.error || error.message}`
    );
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.post("/user/register", { email }, config);
    console.log("User created:", email);
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong, please try again";
    console.error("Error creating user:", message);
    toast.error(message);
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookvisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(
      `Error booking visit: ${error.response?.data?.error || error.message}`
    );
    throw error;
  }
};

export const cancelVisit = async (propertyId, email, token) => {
  try {
    await api.post(
      `/user/cancelBookings/${propertyId}`,
      {
        email,
        id: propertyId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Visit canceled successfully");
  } catch (error) {
    toast.error(
      `Error canceling visit: ${error.response?.data?.error || error.message}`
    );
    throw error;
  }
};

export const createResidency = async (propertyDetails) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      "http://localhost:8000/api/residency/residency",
      propertyDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};
