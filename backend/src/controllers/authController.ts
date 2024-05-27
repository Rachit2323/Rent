import { Request, Response } from 'express';
import AuthService from '../services/authService';

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { token, role } = await AuthService.register(req.body);
            res.status(201).json({ message: 'User registered Successfully', role, token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { token, role } = await AuthService.login(req.body);
            res.json({ message: 'User Login Successfully', token, role });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default authController;
