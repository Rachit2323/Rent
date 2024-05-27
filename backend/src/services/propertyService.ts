// import mockData from '../mockData';
import Property, { IProperty } from '../models/Property';
import User, { IUser } from '../models/User';

interface FilterParams {
    budget?: string;
    bhk?: string;
    furnishing?: string;
    bathrooms?: string;
}

const PropertyService = {
    search: async (filters: FilterParams): Promise<IProperty[]> => {

        let filteredData: IProperty[];
        const { budget, bhk, furnishing, bathrooms }: FilterParams = filters;

        let filterObject = {};

        if (budget) {
            if (budget.includes('+')) {
                const minBudget = Number(budget.replace('+', ''));
                filterObject = { price: { $gte: minBudget } };
            } else if (budget.includes('-')) {
                const [minBudget, maxBudget] = budget.split('-').map(Number);
                filterObject = { price: { $gte: minBudget, $lte: maxBudget } };
            }
        }

        if (bhk) {
            if (bhk.includes('+')) {
                const minBhk = Number(bhk.replace('+', ''));
                filterObject = { ...filterObject, bedrooms: { $gte: minBhk } };
            } else {
                filterObject = { ...filterObject, bedrooms: Number(bhk) };
            }
        }

        if (furnishing) {
            filterObject = { ...filterObject, furnishing: furnishing.toLowerCase() };
        }

        if (bathrooms) {
            if (bathrooms.includes('+')) {
                const minBathrooms = Number(bathrooms.replace('+', ''));
                filterObject = { ...filterObject, bathrooms: { $gte: minBathrooms } };
            } else {
                filterObject = { ...filterObject, bathrooms: Number(bathrooms) };
            }
        }


        filteredData = await Property.find(filterObject);

        return filteredData;
    },
    myProperties: async (sellerId: any): Promise<IProperty[]> => {
        const properties: IProperty[] = await Property.find({ sellerId });
        return properties;
    },

    add: async (propertyData: IProperty, seller: IUser): Promise<IProperty> => {

        console.log('service seller', seller)
        const newProperty = {
            name: propertyData.name,
            img: propertyData.img,
            price: propertyData.price,
            furnishing: propertyData.furnishing,
            bathrooms: propertyData.bathrooms,
            bedrooms: propertyData.bedrooms,
            description: propertyData.description,
            address: propertyData.address,
            sellerId: seller._id,
        };

        const property = new Property(newProperty);
        const savedProperty = await property.save();
        return savedProperty;
    },

    delete: async (propertyId: any, sellerId: any): Promise<IProperty> => {
        const property = await Property.findOne({ _id: propertyId });
        if (!property) {
            throw new Error('Property not found');
        }

        const deletedProperty = await Property.findOneAndDelete({ _id: propertyId, sellerId });
        if (deletedProperty) {
            return deletedProperty;
        }

        throw new Error('Unauthorized to delete property');
    },
    update: async (propertyId: any, propertyData: IProperty, sellerId: any): Promise<IProperty> => {
        const property = await Property.findById(propertyId);
        if (!property) {
            throw new Error('Property not found');
        }

        const updatedProperty = await Property.findOneAndUpdate(
            { _id: propertyId, sellerId },
            { $set: { ...propertyData } },
            { new: true }
        );

        if (updatedProperty) {
            return updatedProperty;
        }

        throw new Error('Unauthorized to update property');
    },
    getPropertyById: async (propertyId: any): Promise<IProperty> => {
        let property = await Property.findById(propertyId);
        const seller = await User.findById(property?.sellerId);
        if (!property) {
            throw new Error('Property not found');
        }
        const updatedProperty = {
            _id: property?._id,
            name: property?.name,
            img: property?.img,
            price: property?.price,
            furnishing: property?.furnishing,
            bathrooms: property?.bathrooms,
            bedrooms: property?.bedrooms,
            description: property?.description,
            address: property?.address,
            sellerId: property?.sellerId,
            seller: {
                name: `${seller?.firstName} ${seller?.lastName}`,
                email: seller?.email,
                phone: seller?.phone
            }
        };
        return updatedProperty as IProperty;
    }

};

export default PropertyService;
