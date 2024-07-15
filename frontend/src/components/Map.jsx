import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "./GeoCoderMarker";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";

const Map = ({ address, city, country }) => {
  return (
    <div>
      <MapContainer
        center={[53.35, 18.8]}
        zoom={1}
        scrollWheelZoom={false}
        className="h-[24rem] w-full mt-5 z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker address={`${address}, ${city}, ${country}`} />
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default Map;
