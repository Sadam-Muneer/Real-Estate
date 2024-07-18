import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const UseAuthChck = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const validateLogin = () => {
    if (!isAuthenticated) {
      toast.error("You must login to continue", { position: "bottom-right" });
      return false;
    } else return true;
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log("Token:", token);
        } catch (error) {
          console.error("Error retrieving token", error);
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, getAccessTokenSilently]);

  return { validateLogin };
};

export default UseAuthChck;
