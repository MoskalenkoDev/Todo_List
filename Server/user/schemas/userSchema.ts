import { Schema, model } from 'mongoose';
import {IUser} from '../interfaces/user';

const userSchema = new Schema<IUser>({
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

export const user = model<IUser>('User', userSchema);