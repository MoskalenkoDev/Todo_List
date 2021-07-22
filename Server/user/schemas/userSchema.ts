import { Schema, model } from 'mongoose';
import {IUser} from '../interfaces/user';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const user = model<IUser>('user', userSchema);