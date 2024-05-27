import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET =  'njjdnjdnjdncjncdj';


const AuthService = {
    register: async (userData: IUser): Promise<{ token: string; role: string; }> => {
        try {
            // check if user already exists
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('User already exists')
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = new User({
                ...userData,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
            return { token, role: savedUser.role };;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    },

    login: async (loginData: IUser): Promise<{ token: string; role: string; }> => {
            
        try {
            const user = await User.findOne({ email: loginData.email});
            if (!user) {
                throw new Error('Wrong Email Id');
            }
            const isMatch = await bcrypt.compare(loginData.password, user.password);
            if (!isMatch) {
                throw new Error('Wrong Password');
            }
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);

            return {token, role: user.role};
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
};

export default AuthService;
