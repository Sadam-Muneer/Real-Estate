import axios from "axios";
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
