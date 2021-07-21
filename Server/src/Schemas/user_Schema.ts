import { Schema, model } from 'mongoose';

interface User {
  Email: string,
  Password: string,
}

const UserSchema = new Schema<User>({
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

export const User = model<User>('User', UserSchema);