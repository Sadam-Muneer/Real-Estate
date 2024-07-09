import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";
import Property from "./Pages/Property";
import Booking from "./Pages/Booking";
import Favourites from "./Pages/Favourites";
import Footer from "./components/Footer";
import AgentPage from "./Pages/AgentPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/addproperty" element={<Property />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
