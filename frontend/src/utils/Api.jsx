import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
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
    toast.error("Something went wrong");
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
    toast.error("Something went wrong");
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
    console.error("Something went wrong , please try again");
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
    toast.error("Something went wrong, try again please");
    throw error;
  }
};
