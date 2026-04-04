import mongoose, { Model, model } from 'mongoose';

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}

export enum ExaminationLevel {
  AS_A2 = "AS_A2",
  CAMBRIDGE_CIE = "CAMBRIDGE_CIE",
}

export enum StudyGroup {
  SCIENCE = "SCIENCE",
  ARTS = "ARTS",
  COMMERCE = "COMMERCE",
}

export enum ExaminationBoard {
  CAMBRIDGE = "CAMBRIDGE",
  EDEXCEL = "EDEXCEL",
  AQA = "AQA",
  OCR = "OCR",
}

export enum ExaminationSession {
  OCT_NOV = "OCT_NOV",
  MAY_JUNE = "MAY_JUNE",
  FEB_MARCH = "FEB_MARCH",
}

export interface ISubject {
  name: string;
  grade: string;
  paperCode?: string;
}

export interface IStudent {
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
}

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  paperCode: { type: String },
}, { _id: false });

const studentSchema = new mongoose.Schema<IStudent>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  school: { type: String, required: true },
  rollNumber: { type: String },
  photoUrl: { type: String },
  applyingForLevel: { type: String, enum: Object.values(ExaminationLevel), required: true },
  yearOfExamination: { type: Number, required: true },
  examinationSession: { type: String, enum: Object.values(ExaminationSession), required: true },
  examinationBoard: { type: String, enum: Object.values(ExaminationBoard) },
  studyGroup: { type: String, enum: Object.values(StudyGroup) },
  oLevelSubjects: [subjectSchema],
  aLevelSubjects: [subjectSchema],
}, { timestamps: true });

export const Student: Model<IStudent> = model<IStudent>('Student', studentSchema);
