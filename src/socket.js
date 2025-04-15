// src/socket.js
import io from "socket.io-client";

const socket = io("https://food-waste-backend-production.up.railway.app"); 

export default socket;