import mongoose, { Model, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  emailVerified: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'BLOCKED';
  isDeleted: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['STUDENT', 'TEACHER', 'ADMIN'],
      default: 'STUDENT',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DELETED', 'BLOCKED'],
      default: 'ACTIVE',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = model<IUser>('User', userSchema);
export { User };
