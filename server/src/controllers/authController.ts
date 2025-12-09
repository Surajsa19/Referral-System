import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import ReferralTracking, { ReferralStatus } from '../models/ReferralTracking';
import mongoose from 'mongoose';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, referralCode } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a unique referral code for the new user
        const newReferralCode = username.substring(0, 3).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

        let referredByCtx: mongoose.Types.ObjectId | undefined = undefined;

        // Check if registering with a referral code
        if (referralCode) {
            const referrer = await User.findOne({ referralCode });
            if (referrer) {
                referredByCtx = referrer._id as mongoose.Types.ObjectId;
            }
        }

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            referralCode: newReferralCode,
            referredBy: referredByCtx
        });

        // If referred, create a tracking record
        if (referredByCtx) {
            await ReferralTracking.create({
                referrerId: referredByCtx,
                refereeId: user._id as mongoose.Types.ObjectId,
                status: ReferralStatus.PENDING
            });
        }

        res.status(201).json({
            _id: (user as any)._id,
            username: user.username,
            email: user.email,
            referralCode: user.referralCode,
            token: generateToken((user as any)._id),
        });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password as string))) {
            res.json({
                _id: (user as any)._id,
                username: user.username,
                email: user.email,
                referralCode: user.referralCode,
                token: generateToken((user as any)._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getMe = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
