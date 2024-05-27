import e, { Request, Response } from 'express';
import PropertyService from '../services/propertyService';
import { IProperty } from '../models/Property';
import { IUser } from '../models/User';

const propertyController = {
    search: async (req: Request, res: Response) => {
        try {
            const properties = await PropertyService.search(req.query);
            res.json(properties);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    },
    myProperties: async (req: Request, res: Response) => {
        const sellerId = ((req as any).user as IUser)._id;
        try {
            const properties = await PropertyService.myProperties(sellerId);
            res.json(properties);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const property: IProperty = {
                ...req.body,
            };
            const seller = (req as any).user as any;
            console.log('seller', seller);
            console.log('req.body', req.body);
            const savedProperty = await PropertyService.add(property, seller);
            console.log('savedProperty', savedProperty);
            res.json(savedProperty);
        } catch (error:any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    delete: async (req: Request, res: Response) => {
        const propertyId = req.params.pid;
        const sellerId = ((req as any).user as IUser)._id;
        try {
            const property = await PropertyService.delete(propertyId, sellerId);
            res.json(property);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    update: async (req: Request, res: Response) => {
        const propertyId = req.params.pid;
        const sellerId = ((req as any).user as IUser)._id;
        try {
            const property = await PropertyService.update(propertyId, req.body, sellerId);
            res.json(property);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    getPropertyById: async (req: Request, res: Response) => {
        try {
            const propertyId = req.params.pid;
            const property = await PropertyService.getPropertyById(propertyId);
            res.json(property);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default propertyController;
