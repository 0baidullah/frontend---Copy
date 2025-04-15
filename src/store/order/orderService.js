import axios from "axios";

// API Base URL
const API_URL = 'https://food-waste-backend-production.up.railway.app/api/v1';

// Get all orders
const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`, {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Update order status by ID
const updateOrderStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_URL}/orders/${id}`, { status }, {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating order ${id}:`, error);
        throw error;
    }
};

// Create a new order
const createOrder = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, { id }, {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}
// Exporting the service
const orderService = {
    getAllOrders,
    updateOrderStatus,
    createOrder,
};

export default orderService;
