import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



// export const getAllCities = async () => {
//     const response = await axios.get(`${API_URL}/cities`);
//         //console.log('response cities', response.data);
//         return response.data;
// }{withCredentials:true});


export const getCartItems=async ()=>{
    const response = await axios.get(`${API_URL}/cart`,{
        withCredentials:true
    });
    //console.log('response cart', response.data);
    return response.data.data;
}

export const deleteCartItem=async(id)=>{
    const response = await axios.delete(`${API_URL}/cart/${id}`,{
        withCredentials:true
    });
    //console.log('response delete cart', response.data);
    return response.data.data;
}

export const addCartItem = async (id) => {
    try {
        console.log('id:', id);

        const response = await axios.post(
            `${API_URL}/cart/${id}`,
            {},  // Empty body if no data is sent
            {
                withCredentials: true,  // Ensure cookies are sent
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Include token if needed
                }
            }
        );

        console.log('response add cart:', response.data);
        return response.data.data;

    } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
        throw error;
    }
};






const cartService= {
    getCartItems,
    deleteCartItem,
    addCartItem
}


export default cartService;