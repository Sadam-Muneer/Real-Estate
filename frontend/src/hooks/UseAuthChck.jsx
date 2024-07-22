import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "axios";

const UseAuthChck = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user, error } =
    useAuth0();

  const saveUserDetails = async (user) => {
    try {
      console.log("Sending user details to backend:", user);
      const response = await axios.post("/api/users/register", {
        email: user.email,
        name: user.name,
      });
      console.log("User details saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Failed to save user details", { position: "bottom-right" });
    }
  };

  const validateLogin = () => {
    if (isLoading) {
      toast.info("Checking authentication status...", {
        position: "bottom-right",
      });
      return false;
    }
    if (error) {
      toast.error(`Authentication error: ${error.message}`, {
        position: "bottom-right",
      });
      return false;
    }
    if (!isAuthenticated) {
      toast.error("You must login to continue", { position: "bottom-right" });
      loginWithRedirect();
      return false;
    } else {
      saveUserDetails(user);
    }
    return true;
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    toast.success("Successfully logged out", { position: "bottom-right" });
  };

  return { validateLogin, handleLogout, user, isAuthenticated, isLoading };
};

export default UseAuthChck;
