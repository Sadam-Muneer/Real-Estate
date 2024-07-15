import { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = defaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]); // Default position

  useEffect(() => {
    const geocode = async () => {
      const geocoder = new ELG.Geocode();
      geocoder.address(address).run((err, results) => {
        if (err) {
          console.error(err);
          return;
        }
        if (results.results.length > 0) {
          const { latlng } = results.results[0];
          setPosition([latlng.lat, latlng.lng]);
          map.setView([latlng.lat, latlng.lng], 13); // Update map view
        }
      });
    };
    geocode();
  }, [address, map]);

  return (
    <Marker position={position}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

GeoCoderMarker.propTypes = {
  address: PropTypes.string.isRequired,
};

export default GeoCoderMarker;
