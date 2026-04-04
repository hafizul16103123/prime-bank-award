import mongoose, { Model, model } from "mongoose";

export interface ISchool {
  name: string;
  address: string;
}

const schoolSchema = new mongoose.Schema<ISchool>(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const School: Model<ISchool> = mongoose.models.School 
  ? mongoose.models.School as Model<ISchool>
  : model<ISchool>("School", schoolSchema);