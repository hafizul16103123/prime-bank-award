import mongoose, { Model, model } from 'mongoose';

export interface IVerification {
  identifier: string;
  value: string;
  expiresAt: Date;
}

const verificationSchema = new mongoose.Schema<IVerification>(
  {
    identifier: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Verification: Model<IVerification> = mongoose.models.Verification 
  ? mongoose.models.Verification as Model<IVerification>
  : model<IVerification>('Verification', verificationSchema);
export { Verification };
