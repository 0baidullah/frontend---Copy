// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import {  getAllUsers, } from "../store/user/userSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getAllCategories } from "../store/category/categorySlice";
// import { getAllCities } from "../store/city/citySlice";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Custom marker icons
// const redMarkerIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   shadowSize: [41, 41],
// });

// const blueMarkerIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   shadowSize: [41, 41],
// });

// const FocusOnUser = ({ userLocation }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (userLocation) {
//       map.setView([userLocation.lat, userLocation.lng], 13);
//     }
//   }, [userLocation, map]);
//   return null;
// };

// const Nearyou = () => {
//   const [filter, setFilter] = useState({
//     location: "",
//     category: "",
//     itemName: "",
//   });
//   const [radius, setRadius] = useState(5000); // Increased default radius
//   const { categories } = useSelector((state) => state.category);
//   const { cities } = useSelector((state) => state.city);
//   const [auctionData, setAuctionData] = useState([]);
//   const [filteredAuctions, setFilteredAuctions] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [city, setCity] = useState("");
//   const [loading, setLoading] = useState(true);

//   const { auction, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auction
//   );
//   // auction.forEach(item => console.log(item.location));
//   const { allUser, isLoading: usersLoading, error: usersError } = useSelector((state) => state.user);
  
//   console.log('User state:', {
//     allUser,
//     usersLoading,
//     usersError,
//     length: allUser?.length || 0
//   });
   
//   const dispatch = useDispatch();

//   // Load initial data
//   useEffect(() => {
//     dispatch(getAllAuctions());
//     dispatch(getAllCategories());
//     dispatch(getAllCities());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   // Update auction data when Redux state changes
//   useEffect(() => {
//     if (isSuccess && auction) {
//       setAuctionData(auction);
//       setLoading(false);
//     } else if (isError) {
//       toast.error(message);
//       setLoading(false);
//     }
//   }, [auction, isSuccess, isError, message]);

//   // Get user location and city
//   useEffect(() => {
//     if (navigator.geolocation) {
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });

//           try {
//             const response = await axios.get(
//               `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d8fc087a5cc84c1baec679b80884b7aa`
//             );
//             if (response.data?.results?.[0]) {
//               const components = response.data.results[0].components;
//               const district = components.district || components.city || components.county;
//               setCity(district?.replace(/\s*District$/, "").trim());
//             }
//           } catch (error) {
//             console.error("Error getting city name:", error);
//           } finally {
//             setLoading(false);
//           }
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           setLoading(false);
//         },
//         { enableHighAccuracy: true, timeout: 10000 }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setLoading(false);
//     }
//   }, []);

//   // Filter auctions based on criteria - FIXED THIS FUNCTION
//   useEffect(() => {
//     if (userLocation && auctionData && auctionData.length > 0) {
//       const filtered = auctionData.filter((item) => {
//         if (!item.seller?.location?.lat || !item.seller?.location?.lng) {
//           return false;
//         }
        
//         // Calculate distance in meters
//         const distance = L.latLng(userLocation.lat, userLocation.lng).distanceTo(
//           L.latLng(item.seller.location.lat, item.seller.location.lng)
//         );
        
//         // Location filter - FIXED LOGIC
//         const matchesLocation = 
//           !filter.location || 
//           (filter.location === "current" && city && item.seller.location.name?.includes(city)) ||
//           item.seller.location._id === filter.location;
        
//         // Category filter - ADDED SAFETY CHECK
//         const matchesCategory = 
//           !filter.category || 
//           (item.category && (item.category._id === filter.category || item.category === filter.category));
        
//         // Name filter
//         const matchesName = 
//           !filter.itemName || 
//           (item.name && item.name.toLowerCase().includes(filter.itemName.toLowerCase()));
        
//         return matchesLocation && matchesCategory && matchesName && distance <= radius;
//       });

//       setFilteredAuctions(filtered);
//       console.log("Filtered auctions:", filtered); // Debug log
//     }
//   }, [userLocation, auctionData, radius, filter, city]);

//   const SearchByFilter = () => {
//     setLoading(true);
//     const filterToSend = {...filter};
    
//     if (filterToSend.location === "current") {
//       filterToSend.location = city;
//     }
    
//     dispatch(getAllAuctions(filterToSend))
//       .unwrap()
//       .then(() => setLoading(false))
//       .catch((err) => {
//         toast.error("Failed to fetch auctions");
//         setLoading(false);
//       });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-theme-color"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center my-5 min-h-[100px]">
//       <div className="flex-col sm:flex-row sm:items-center bg-[#061224] text-[#7386a8] rounded-md p-2 w-full max-w-4xl">
//         <select
//           required
//           id="location"
//           className="bg-[#061224] px-2 text-[#7386a8] w-full block sm:w-auto sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//           value={filter.location}
//         >
//           <option value="">All Locations</option>
//           {userLocation && city && <option value="current">Current Location ({city})</option>}
//           {cities.data?.map((city) => (
//             <option key={city._id} value={city._id}>
//               {city.name}
//             </option>
//           ))}
//         </select>

//         <select
//           required
//           id="category"
//           className="bg-[#061224] px-2 text-[#7386a8] w-full mt-2 sm:w-auto sm:ml-4 block sm:inline py-3 rounded-lg outline-none border border-border-info-color cursor-pointer"
//           onChange={(e) => setFilter({ ...filter, category: e.target.value })}
//           value={filter.category}
//         >
//           <option value="">All Categories</option>
//           {categories.data?.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
        
//         <input
//           type="text"
//           placeholder="Search auction names"
//           className="bg-[#061224] py-3 px-3 text-[#7386a8] mt-2 block sm:w-auto sm:inline rounded-lg border border-border-info-color sm:mx-4 outline-none placeholder:text-[#7386a8] flex-grow"
//           value={filter.itemName}
//           onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
//         />
        
//         <button
//           className="bg-theme-color mt-2 hover:bg-color-danger text-white text-sm font-bold rounded-md my-auto px-3 py-2 text-center no-underline border-none sm:ml-2"
//           onClick={SearchByFilter}
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       <div className="flex flex-col items-center mt-4 w-full max-w-md">
//         <label htmlFor="radius" className="text-[#7386a8] mb-2">
//           Search Radius: {radius.toLocaleString()} meters
//         </label>
//         <input
//           type="range"
//           id="radius"
//           min="1000"
//           max="50000"
//           step="500"
//           value={radius}
//           onChange={(e) => setRadius(parseInt(e.target.value))}
//           className="w-full"
//         />
//       </div>

//       <div className="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mt-4 h-[500px]">
//         {userLocation ? (
//           <MapContainer
//             center={[userLocation.lat, userLocation.lng]}
//             zoom={13}
//             style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />

//             <Marker position={[userLocation.lat, userLocation.lng]} icon={redMarkerIcon}>
//               <Popup>Your Location</Popup>
//             </Marker>
            
//             <Circle 
//               center={userLocation} 
//               radius={radius} 
//               color="blue" 
//               fillColor="blue" 
//               fillOpacity={0.1} 
//             />

//             {filteredAuctions.length > 0 ? (
//               filteredAuctions.map((item, index) => (
//                 <Marker
//                   key={`${item._id}-${index}`}
//                   position={[item.seller.location.lat, item.seller.location.lng]}
//                   icon={blueMarkerIcon}
//                 >
//                   <Popup>
//                     <div className="max-w-xs">
//                       <h3 className="font-bold text-lg">{item.name}</h3>
//                       <p className="text-gray-700">{item.description}</p>
//                       <p className="text-sm text-gray-600">
//                         Location: {item.seller.location.name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Distance:{" "}
//                         {Math.round(
//                           L.latLng(userLocation.lat, userLocation.lng).distanceTo(
//                             L.latLng(item.seller.location.lat, item.seller.location.lng)
//                           )
//                         ).toLocaleString()}{" "}
//                         meters
//                       </p>
//                       <p className="text-sm text-green-600 font-medium">
//                         Current Bid: ${item.currentBid?.toFixed(2) || "0.00"}
//                       </p>
//                     </div>
//                   </Popup>
//                 </Marker>
//               ))
//             ) : (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={blueMarkerIcon}>
//                 <Popup>
//                   No auctions found within {radius.toLocaleString()} meters.
//                   {filter.location || filter.category || filter.itemName ? " Try widening your search criteria." : ""}
//                 </Popup>
//               </Marker>
//             )}

//             <FocusOnUser userLocation={userLocation} />
//           </MapContainer>
//         ) : (
//           <div className="flex justify-center items-center h-full bg-gray-100 rounded-lg">
//             <p className="text-gray-500">
//               {navigator.geolocation 
//                 ? "Loading map..." 
//                 : "Geolocation is not supported by your browser. Please enable it to see nearby auctions."}
//             </p>
//           </div>
//         )}
//       </div>

//       {filteredAuctions.length === 0 && !loading && (
//         <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-2xl text-center">
//           {filter.location || filter.category || filter.itemName 
//             ? "No auctions match your current filters. Try adjusting your search criteria or increasing the search radius."
//             : "No auctions found in your area. Try increasing the search radius."}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Nearyou;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import { getAllUsers } from "../store/user/userSlice";

// const AllUsers = () => {
//   const dispatch = useDispatch();
//   const [locationsWithCoords, setLocationsWithCoords] = useState([]);

//   const { auction, isLoading, isError, message } = useSelector(
//     (state) => state.auction
//   );
//   const { allUser, isLoading: usersLoading, error: usersError } = useSelector(
//     (state) => state.user
//   );

//   useEffect(() => {
//     dispatch(getAllAuctions());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   console.log(allUser, "All Users Data");

//   useEffect(() => {
//     const getCoordinates = async (address) => {
//       const apiKey = "8a33ba83d7644039a80be2f53b9e9566";
//       try {
//         const res = await axios.get(
//           `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//             address
//           )}&key=${apiKey}`
//         );
//         const result = res.data.results[0];
//         if (result) {
//           return {
//             lat: result.geometry.lat,
//             lng: result.geometry.lng,
//             formatted: result.formatted,
//           };
//         } else {
//           return { lat: null, lng: null };
//         }
//       } catch (error) {
//         console.error("Error geocoding:", address);
//         return { lat: null, lng: null };
//       }
//     };

//     const fetchCoords = async () => {
//       if (!auction?.length) return;

//       const cleanedLocations = auction.map((auction) => {
//         const address = auction?.seller?.address || "";
//         const city = auction?.seller?.city || "";
//         const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

//         return {
//           address,
//           city: formattedCity,
//           fullAddress: address ? `${address}, ${formattedCity}` : formattedCity,
//         };
//       });

//       const updated = [];
//       for (const item of cleanedLocations) {
//         const coords = await getCoordinates(item.fullAddress);
//         updated.push({ ...item, ...coords });
//       }

//       console.log("With Coordinates:\n", JSON.stringify(updated, null, 2));
//       setLocationsWithCoords(updated);
//     };

//     fetchCoords();
//   }, [auction]);

//   if (isLoading) {
//     return <div className="text-white text-center mt-10">Loading auctions...</div>;
//   }

//   if (isError) {
//     return <div className="text-red-500 text-center mt-10">Error: {message}</div>;
//   }

//   return (
//     <div className="text-white p-4">
//       <h2 className="text-xl font-bold mb-4">Locations with Coordinates</h2>
//       <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-auto max-h-[300px]">
//         {JSON.stringify(locationsWithCoords, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default AllUsers;




// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import { getAllUsers } from "../store/user/userSlice";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix Leaflet icon issue for React apps
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const AllUsers = () => {
//   const dispatch = useDispatch();
//   const [usersWithLocation, setUsersWithLocation] = useState([]);
//   const [currentPosition, setCurrentPosition] = useState(null);

//   const { auction, isLoading, isError, message } = useSelector(
//     (state) => state.auction
//   );

//   const {
//     allUser,
//     isLoading: usersLoading,
//     error: usersError,
//   } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(getAllAuctions());
//     dispatch(getAllUsers());

//     // Get current user location
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setCurrentPosition({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error("Error getting user location:", error);
//       }
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (!allUser?.data || !Array.isArray(allUser.data)) return;

//     const filteredUsers = allUser.data.filter(
//       (user) => user.location?.lat && user.location?.lng
//     );

//     setUsersWithLocation(filteredUsers);
//   }, [allUser]);

//   if (isLoading || usersLoading) {
//     return <div className="text-white text-center mt-10">Loading data...</div>;
//   }

//   if (isError || usersError) {
//     return (
//       <div className="text-red-500 text-center mt-10">
//         Error: {message || usersError}
//       </div>
//     );
//   }

//   return (
//     <div className="text-white p-4">
//       <h2 className="text-xl font-bold mb-4">Users on Map</h2>
//       <div className="h-[500px] w-full rounded-md overflow-hidden">
//         <MapContainer
//           center={currentPosition || [31.5204, 74.3587]} // center map on current user if available
//           zoom={7}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Other users */}
//           {usersWithLocation.map((user, idx) => (
//             <Marker
//               key={user._id || idx}
//               position={[user.location.lat, user.location.lng]}
//             >
//               <Popup>
//                 <strong>{user.fullName}</strong>
//                 <br />
//                 {user.city}
//                 <br />
//                 {user.address}
//               </Popup>
//             </Marker>
//           ))}

//           {/* Current user location */}
//           {currentPosition && (
//             <Marker position={[currentPosition.lat, currentPosition.lng]}>
//               <Popup>You are here</Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllAuctions } from "../store/auction/auctionSlice";
// import { getAllUsers } from "../store/user/userSlice";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Circle,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const haversineDistance = (coords1, coords2) => {
//   const toRad = (value) => (value * Math.PI) / 180;

//   const R = 6371; // km
//   const dLat = toRad(coords2.lat - coords1.lat);
//   const dLon = toRad(coords2.lng - coords1.lng);
//   const lat1 = toRad(coords1.lat);
//   const lat2 = toRad(coords2.lat);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const AllUsers = () => {
//   const dispatch = useDispatch();
//   const [usersWithLocation, setUsersWithLocation] = useState([]);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [rangeKm, setRangeKm] = useState(10); // Default range: 10km

//   const { auction, isLoading, isError, message } = useSelector(
//     (state) => state.auction
//   );
//   const {
//     allUser,
//     isLoading: usersLoading,
//     error: usersError,
//   } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(getAllAuctions());
//     dispatch(getAllUsers());

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setCurrentPosition({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error("Error getting user location:", error);
//       }
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (!allUser?.data || !Array.isArray(allUser.data)) return;

//     const filteredUsers = allUser.data.filter(
//       (user) => user.location?.lat && user.location?.lng
//     );

//     setUsersWithLocation(filteredUsers);
//   }, [allUser]);

//   const filteredByDistance = currentPosition
//     ? usersWithLocation.filter((user) => {
//         const distance = haversineDistance(currentPosition, user.location);
//         return distance <= rangeKm;
//       })
//     : [];

//   return (
//     <div className="text-white p-4">
//       <h2 className="text-xl font-bold mb-4">Nearby Users on Map</h2>

//       <label className="block mb-2">
//         Range: {rangeKm} km
//         <input
//           type="range"
//           min={1}
//           max={100}
//           value={rangeKm}
//           onChange={(e) => setRangeKm(Number(e.target.value))}
//           className="w-full"
//         />
//       </label>

//       <div className="h-[500px] w-full rounded-md overflow-hidden">
//         <MapContainer
//           center={currentPosition || [31.5204, 74.3587]}
//           zoom={12}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {currentPosition && (
//             <>
//               <Marker position={[currentPosition.lat, currentPosition.lng]}>
//                 <Popup>You are here</Popup>
//               </Marker>

//               {/* Circle radius */}
//               <Circle
//                 center={currentPosition}
//                 radius={rangeKm * 1000}
//                 pathOptions={{ color: "blue", fillOpacity: 0.2 }}
//               />
//             </>
//           )}

//           {filteredByDistance.map((user) => (
//             <Marker
//               key={user._id}
//               position={[user.location.lat, user.location.lng]}
//             >
//               <Popup>
//                 <strong>{user.fullName}</strong>
//                 <br />
//                 {user.city}
//                 <br />
//                 {user.address}
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { getAllUsers } from "../store/user/userSlice";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const AllUsers = () => {
  const dispatch = useDispatch();
  const [usersWithLocation, setUsersWithLocation] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [radius, setRadius] = useState(20); // km

  const { auction, isLoading, isError, message } = useSelector((state) => state.auction);
  const { allUser, isLoading: usersLoading, error: usersError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllAuctions());
    dispatch(getAllUsers());

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (!allUser?.data || !Array.isArray(allUser.data)) return;
    const filteredUsers = allUser.data.filter((user) => user.location?.lat && user.location?.lng);
    setUsersWithLocation(filteredUsers);
  }, [allUser]);

  const filteredUsers = usersWithLocation
    .map((user) => {
      const distance = haversineDistance(
        currentPosition?.lat,
        currentPosition?.lng,
        user.location.lat,
        user.location.lng
      );
      return { ...user, distance };
    })
    .filter((user) => user.distance <= radius);

  if (isLoading || usersLoading) {
    return <div className="text-white text-center mt-10">Loading data...</div>;
  }

  if (isError || usersError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {message || usersError}
      </div>
    );
  }

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Users Nearby Map</h2>

      <label className="block mb-4 text-white">
        Radius (km):
        <input
          type="range"
          min="1"
          max="100"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full mt-2"
        />
        <div className="text-sm text-gray-300">{radius} km</div>
      </label>

      <div className="h-[500px] w-full rounded-md overflow-hidden mb-8">
        <MapContainer
          center={currentPosition || [31.5204, 74.3587]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredUsers.map((user, idx) => (
            <Marker
              key={user._id || idx}
              position={[user.location.lat, user.location.lng]}
            >
              <Popup>
                <strong>{user.fullName}</strong>
                <br />{user.city}<br />{user.address}
              </Popup>
            </Marker>
          ))}

          {currentPosition && (
            <>
              <Marker position={[currentPosition.lat, currentPosition.lng]}>
                <Popup>You are here</Popup>
              </Marker>
              <Circle
                center={[currentPosition.lat, currentPosition.lng]}
                radius={radius * 1000}
                pathOptions={{ fillColor: "#1d4ed8", fillOpacity: 0.2, stroke: false }}
              />
            </>
          )}
        </MapContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Nearby Users</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg p-5 border border-gray-700 hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.image || "https://via.placeholder.com/100"}
                  alt={user.fullName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-500"
                />
                <div>
                  <h4 className="text-xl font-bold text-white">{user.fullName}</h4>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <div className="mt-4 text-gray-300">
                <p className="mb-2">
                  <span className="font-semibold text-white">City:</span> {user.city}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-white">Address:</span> {user.address}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-white">Phone:</span> {user.phone || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-white">Distance:</span> {user.distance.toFixed(2)} km
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
