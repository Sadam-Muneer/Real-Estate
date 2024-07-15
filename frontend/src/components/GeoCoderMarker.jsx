import { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([0, 0]); // Default position

  useEffect(() => {
    ELG.geocode()
      .text(address)
      .run((err, results) => {
        if (err) {
          console.error("Geocoding error:", err);
          return;
        }
        if (results && results.results && results.results.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 13); // Adjust zoom level as needed
        } else {
          console.error("No results found for:", address);
        }
      });
  }, [address, map]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

GeoCoderMarker.propTypes = {
  address: PropTypes.string.isRequired,
};

export default GeoCoderMarker;
