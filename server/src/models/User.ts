import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    referralCode: string;
    referredBy?: mongoose.Types.ObjectId;
    credits: number;
    isFirstPurchaseMade: boolean;
    createdAt: Date;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    credits: { type: Number, default: 0 },
    isFirstPurchaseMade: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
