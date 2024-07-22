import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import Property from "./Pages/Property";
import Booking from "./Pages/Booking";
import AgentPage from "./Pages/AgentPage";
import { Suspense, useState } from "react";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import UserDetailsContext from "./context/UserDetailsContext";

const App = () => {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    Favourites: [],
    Booking: [],
    token: null,
  });

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="max-padd-container pt-[99px] flexCenter">
                Loading data...
              </div>
            }
          >
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/listing" element={<Listing />} />
                <Route path="/listing/:propertyId" element={<Property />} />
                <Route path="/agent" element={<AgentPage />} />
                <Route path="/booking" element={<Booking />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailsContext.Provider>
  );
};

export default App;
