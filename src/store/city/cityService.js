import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';



export const getAllCities = async () => {
    const response = await axios.get(`${API_URL}/cities`);
        //console.log('response cities', response.data);
        return response.data;
}


export const addCity = async (data) => {
    const response = await axios.post(`${API_URL}/cities`, data, {
        withCredentials: true,
    });
    //console.log('create cities', response.data);

    return response.data.data;
}



export const getCityById = async (id) => {
    const response = await axios.get(`${API_URL}/cities/${id}`);
    //console.log('response city', response.data);
    return response.data.data;
}



export const updateCity = async ({id,city}) => {
    const response = await axios.put(`${API_URL}/cities/${id}`, city, {
        withCredentials: true,
    });
    //console.log('response city', response.data);
    return response.data.data;
}


export const deleteCity = async (id) => {
    const response = await axios.delete(`${API_URL}/cities/${id}`, {
        withCredentials: true,
    });
    //console.log('response city', response.data);
    return response.data;
}


export const getCityMoreDetail = async () => {

    const response = await axios.get(`${API_URL}/cities/detail`, {
        withCredentials: true,
    });
    //console.log('response cities', response.data);
    return response.data.data;
}

export const getTopCities = async () => {
    const response = await axios.get(`${API_URL}/cities/top`);
    //console.log('response cities', response.data);
    return response.data.data;
}





const cityService= {
    getAllCities,
    addCity,
    getCityById,
    updateCity,
    deleteCity,
    getCityMoreDetail,
    getTopCities
    
}


export default cityService;