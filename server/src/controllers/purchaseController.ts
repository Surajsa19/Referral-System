import { Response } from 'express';
import User from '../models/User';
import ReferralTracking, { ReferralStatus } from '../models/ReferralTracking';

export const makePurchase = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (user.isFirstPurchaseMade) {
            res.json({ message: 'Purchase successful', creditsEarned: 0 });
            return;
        }

        // First purchase logic
        user.isFirstPurchaseMade = true;
        user.credits += 2; // Referee gets 2 credits
        await user.save();

        let creditsEarned = 2;

        // Check if referred
        if (user.referredBy) {
            const referral = await ReferralTracking.findOne({
                refereeId: userId,
                status: ReferralStatus.PENDING
            });

            if (referral) {
                referral.status = ReferralStatus.CONVERTED;
                referral.convertedAt = new Date();
                await referral.save();

                const referrer = await User.findById(user.referredBy);
                if (referrer) {
                    referrer.credits += 2; // Referrer gets 2 credits
                    await referrer.save();
                }
            }
        }

        res.json({ message: 'Purchase successful. First purchase bonus!', creditsEarned });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
