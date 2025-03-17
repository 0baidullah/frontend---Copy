import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icons
const redMarkerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const blueMarkerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Component to adjust the map view to the user's location
const FocusOnUser = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13); // Zoom level 13 for a closer view
    }
  }, [userLocation, map]);
  return null;
};

const Nearyou = () => {
  const [filter, setFilter] = useState({
    location: "",
    category: "",
    itemName: "",
  });

  const [radius, setRadius] = useState(1000); // Default radius in meters
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const [auctionData, setAuctionData] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState("");

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction, isSuccess, isError, message]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [dispatch]);

  const SearchByFilter = () => {
    dispatch(getAllAuctions(filter));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            if (response.data?.results?.[0]) {
              let district = response.data.results[0].components.district;
              district = district?.slice(0, -8)?.trim();
              setCity(district);
            }
          } catch (error) {
            console.error("Error getting city name:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const filtered = auctionData.filter((item) => {
        if (item.seller?.location) {
          const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo(
            L.latLng(item.seller.location.lat, item.seller.location.lng)
          );
          const matchesCity = !filter.location || (filter.location === "current" && city === item.seller.location.name);
          const matchesCategory = !filter.category || item.category._id === filter.category;
          const matchesName = !filter.itemName || item.name.toLowerCase().includes(filter.itemName.toLowerCase());

          return matchesCity && matchesCategory && matchesName && distance <= radius;
        }
        return false;
      });

      setFilteredAuctions(filtered);
    }
  }, [userLocation, auctionData, radius, filter]);

  return (
    <div className="flex flex-col items-center my-5 min-h-[100px]">
      <div className="flex-col sm:flex-row sm:items-center bg-[#061224] text-[#7386a8] rounded-md p-2">
        <select
          required
          id="location"
          className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        >
          <option value="">Select Location</option>
          {userLocation && <option value="current">Current Location</option>}
          {cities.data &&
            cities.data.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
        </select>

        <select
          required
          id="category"
          className="bg-[#061224] px-2 text-[#73a880] w-full mt-2 sm:w-auto sm:ml-4 block sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.data &&
            categories.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Search Name"
          className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8]"
          value={filter.itemName}
          onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
        />
        <button
          className="bg-theme-color mt-2 hover:bg-color-danger text-white text-sm font-bold rounded-md my-auto px-3 py-2 text-center no-underline border-none"
          onClick={() => SearchByFilter()}
        >
          Search
        </button>
      </div>

      <div className="flex flex-col items-center mt-4">
        <label htmlFor="radius" className="text-[#7386a8]">
          Select Range:
        </label>
        <input
          type="range"
          id="radius"
          min="5000"
          max="13000"
          step="50"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className="w-full"
        />
        <span className="text-[#7386a8]">{radius} meters</span>
      </div>

      <div className="w-80 sm:w-3/4 lg:w-1/2 mt-4">
        <MapContainer
          center={userLocation ? [userLocation.lat, userLocation.lng] : [30.3753, 69.3451]} // Default to Pakistan if no user location
          zoom={userLocation ? 13 : 5} // Zoom closer if user location is available
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {userLocation && (
            <>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={redMarkerIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              <Circle center={userLocation} radius={radius} />
            </>
          )}

          {filteredAuctions.map(
            (item, index) =>
              item.seller?.location && (
                <Marker
                  key={index}
                  position={[item.seller.location.lat, item.seller.location.lng]}
                  icon={blueMarkerIcon}
                >
                  <Popup>
                    <strong>{item.name}</strong>
                    <br />
                    <span>{item.seller.location.name}</span>
                    <br />
                    <span>
                      Distance:{" "}
                      {Math.round(
                        L.latLng(userLocation.lat, userLocation.lng).distanceTo(
                          L.latLng(item.seller.location.lat, item.seller.location.lng)
                        )
                      )}{" "}
                      meters
                    </span>
                  </Popup>
                </Marker>
              )
          )}

          <FocusOnUser userLocation={userLocation} />
        </MapContainer>
      </div>


      
    </div>
  );
};

export default  Nearyou;