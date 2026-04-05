import mongoose, { Model, model } from "mongoose";
import { Gender, ExaminationLevel, ExaminationSession, ExaminationBoard, StudyGroup } from "../dtos";

export enum StudentStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  DECLINED = "Declined",
}

export interface ISubject {
  name: string;
  grade: string;
  paperCode?: string;
}

export interface IStudent {
  name: string;
  userId: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  gender: string;
  phoneNumber: string;
  email: string;
  school: string;
  rollNumber?: string;
  photoUrl?: string;
  applyingForLevel: string;
  yearOfExamination: number;
  examinationSession: string;
  examinationBoard?: string;
  studyGroup?: string;
  oLevelSubjects?: ISubject[];
  aLevelSubjects?: ISubject[];
  status?: string;
}

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    paperCode: { type: String },
  },
  { _id: false },
);

const studentSchema = new mongoose.Schema<IStudent>(
  {
    name: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    school: { type: String, required: true },
    rollNumber: { type: String },
    photoUrl: { type: String },
    applyingForLevel: {
      type: String,
      enum: Object.values(ExaminationLevel),
      required: true,
    },
    yearOfExamination: { type: Number, required: true },
    examinationSession: {
      type: String,
      enum: Object.values(ExaminationSession),
      required: true,
    },
    examinationBoard: { type: String, enum: Object.values(ExaminationBoard) },
    studyGroup: { type: String, enum: Object.values(StudyGroup) },
    oLevelSubjects: [subjectSchema],
    aLevelSubjects: [subjectSchema],
    status: { 
      type: String, 
      enum: Object.values(StudentStatus),
      default: StudentStatus.PENDING 
    },
  },
  { timestamps: true },
);

export const Student: Model<IStudent> = mongoose.models.Student 
  ? mongoose.models.Student as Model<IStudent>
  : model<IStudent>("Student", studentSchema);
