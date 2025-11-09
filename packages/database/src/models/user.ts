import mongoose, { type Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    email: { required: true, type: String, unique: true },
    name: { required: true, type: String },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
