export interface PropertyModel {
    _id: any;
    name: string;
    img: string;
    price: number;
    furnishing: string;
    bathrooms: number;
    bedrooms: number;

    description: string;
    address: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}