import mongoose, { Document, Schema } from 'mongoose';

export enum ReferralStatus {
    PENDING = 'PENDING',
    CONVERTED = 'CONVERTED'
}

export interface IReferralTracking extends Document {
    referrerId: mongoose.Types.ObjectId;
    refereeId: mongoose.Types.ObjectId;
    status: ReferralStatus;
    createdAt: Date;
    convertedAt?: Date;
}

const referralTrackingSchema: Schema = new Schema({
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    refereeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(ReferralStatus), default: ReferralStatus.PENDING },
    convertedAt: { type: Date }
}, { timestamps: true });

export default mongoose.model<IReferralTracking>('ReferralTracking', referralTrackingSchema);
