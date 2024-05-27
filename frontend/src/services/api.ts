import axios from 'axios';
import { PropertyModel, User } from '../types/common';

const apiClient = axios.create({
    baseURL: 'https://rent-delta.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

////////////////// AUTH API CALLS //////////////////////
export const registerUser = (user: User) => {
    return apiClient.post('/auth/register', { ...user });
}

export const loginUser = (user: { email: string, password: string }) => {
    return apiClient.post('/auth/login', { ...user });
}
////////////////////////////////////////////////////////

// fetch all properties
export const fetchProperties = (filters: any) => {
    return apiClient.get('/properties', { params: filters });
};

// fetch property by id
export const fetchPropertyById = (id: any) => {
    return apiClient.get(`/properties/id/${id}`);
};

/////////////////////////// SELLER API CALLS ///////////////////////////
// fetch all properties of the logged in seller
export const fetchMyProperties = () => {
    // fetch the auth token from local storage
    const token = localStorage.getItem('token');
    return apiClient.get('/properties/seller/all', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// add a new property
export const addProperty = (property: any) => {
    const token = localStorage.getItem('token');
    return apiClient.post('/properties/seller', { ...property }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// update a property
export const updateProperty = (property: PropertyModel) => {
    const id = property._id;
    const token = localStorage.getItem('token');
    return apiClient.put(`/properties/seller/id/${id}`, { ...property }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// delete a property
export const deleteProperty = (id: any) => {
    const token = localStorage.getItem('token');
    return apiClient.delete(`/properties/seller/id/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}