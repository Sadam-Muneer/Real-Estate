import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import UserDetailsContext from "../context/UserDetailsContext";
import { useMutation } from "react-query";
import { createUser } from "../utils/Api";

const Layout = () => {
  const { isAuthenticated, user, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const { mutate } = useMutation((token) => createUser(user?.email, token), {
    mutationKey: [user?.email],
    onSuccess: () => console.log("User creation successful"),
  });

  const handleLogin = async () => {
    try {
      await loginWithPopup();
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });

      console.log("Access token received:", token);
      localStorage.setItem("access_token", token);
      setUserDetails((prev) => ({ ...prev, token }));

      if (isAuthenticated) {
        console.log("User is authenticated, attempting to create user...");
        mutate(token);
      }
    } catch (error) {
      console.error("Error getting token or registering user:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !userDetails.token) {
      handleLogin();
    }
  }, [isAuthenticated, userDetails.token]);

  return (
    <>
      <div>
        <Header />
        {!isAuthenticated ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
