import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import Property from "./Pages/Property";
import Booking from "./Pages/Booking";
import Favourites from "./Pages/Favourites";
import AgentPage from "./Pages/AgentPage";
import { Suspense } from "react";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/ReactToastify.css";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="max-padd-container pt-[99px]">Loading data...</div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/addproperty" element={<Property />} />
              <Route path="/agent" element={<AgentPage />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/favourites" element={<Favourites />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
