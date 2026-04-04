import mongoose, { Model, model } from "mongoose";

export enum SubjectGroup {
  SCIENCE = "Science",
  ARTS = "Arts",
  COMMERCE = "Commerce",
  MATHEMATICS = "Mathematics",
  COMPUTER_SCIENCE_ICT = "Computer Science / ICT",
}

export enum SubjectLevel {
  O_LEVEL = "O Level",
  A_LEVEL = "A Level",
}

export interface ISubject {
  name: string;
  group: string;
  level: string;
  code: string;
}

const subjectSchema = new mongoose.Schema<ISubject>(
  {
    name: { type: String, required: true, trim: true },
    group: { type: String, enum: Object.values(SubjectGroup), required: true },
    level: { type: String, enum: Object.values(SubjectLevel), required: true },
    code: { type: String, required: true, trim: true, uppercase: true },
  },
  { timestamps: true }
);

export const Subject: Model<ISubject> = mongoose.models.Subject 
  ? mongoose.models.Subject as Model<ISubject>
  : model<ISubject>("Subject", subjectSchema);