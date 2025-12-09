import { Response } from 'express';
import ReferralTracking, { ReferralStatus } from '../models/ReferralTracking';
import User from '../models/User';

export const getReferralStats = async (req: any, res: Response) => {
    try {
        const referrals = await ReferralTracking.find({ referrerId: req.user.id })
            .populate('refereeId', 'username email createdAt');

        const totalReferrals = referrals.length;
        const convertedReferrals = referrals.filter(ref => ref.status === ReferralStatus.CONVERTED).length;

        // Get current user credits (assuming attached by middleware or fresh fetch)
        const user = await User.findById(req.user.id);

        res.json({
            totalReferrals,
            convertedReferrals,
            totalCredits: user?.credits || 0,
            referrals // List of referred users for detailed view
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
