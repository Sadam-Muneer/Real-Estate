// UseAuthChck.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const UseAuthChck = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
    useAuth0();

  const validateLogin = () => {
    if (!isAuthenticated && !isLoading) {
      toast.error("You must login to continue", { position: "bottom-right" });
      loginWithRedirect();
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return { validateLogin, handleLogout, user };
};

export default UseAuthChck;
