import mongoose, { Document } from "mongoose";

export interface IProperty extends Document {
    name: string;
    img: string;
    price: number;
    furnishing: string;
    bathrooms: number;
    bedrooms: number;
    description: string;
    address: string;
    sellerId: string;
    seller?: any;
}

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String },
    price: { type: Number, required: true },
    furnishing: { type: String, required: true },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    sellerId: { type: String, required: true },
});
const Property = mongoose.model<IProperty>("Property", propertySchema);

export default Property;
