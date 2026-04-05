export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
  PREFER_NOT_TO_SAY = "Prefer not to say",
}

export enum ExaminationLevel {
  A_LEVEL = "A Level",
  O_LEVEL = "O Level",
}

export enum StudyGroup {
  SCIENCE = "Science",
  ARTS = "Arts",
  COMMERCE = "Commerce",
}

export enum ExaminationBoard {
  CAMBRIDGE = "Cambridge(CIE)",
  EDEXCEL = "Edexcel",
  PEARSON = "Pearson",
}

export enum ExaminationSession {
  MAY_JUNE = "May/June",
  OCT_NOV = "Oct/Nov",
}

export class SubjectDto {
  name: string;
  grade: string;
  paperCode?: string;
}

export class CreateStudentDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  school: string;
  rollNumber?: string;
  photoUrl?: string;
  applyingForLevel: ExaminationLevel;
  yearOfExamination: number;
  examinationSession: ExaminationSession;
  examinationBoard?: ExaminationBoard;
  studyGroup?: StudyGroup;
  oLevelSubjects?: SubjectDto[];
  aLevelSubjects?: SubjectDto[];
}

export class StudentResponseDto {
  id: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
  phoneNumber: string;
  school: string;
  rollNumber?: string;
  photoUrl?: string;
  applyingForLevel: ExaminationLevel;
  yearOfExamination: number;
  examinationSession: ExaminationSession;
  examinationBoard?: ExaminationBoard;
  studyGroup?: StudyGroup;
  oLevelSubjects?: SubjectDto[];
  aLevelSubjects?: SubjectDto[];
}
