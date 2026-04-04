import bcrypt from "bcryptjs";
import { User } from "../../auth/models/User";
import { Student } from "../models/Student";
import dbConnect from "@/lib/db";

export class StudentService {
  async register(
    name: string,
    email: string,
    password: string,
    role: string = "STUDENT",
    studentData: {
      dateOfBirth: string;
      gender: string;
      phoneNumber: string;
      school: string;
      rollNumber?: string;
      photoUrl?: string;
      applyingForLevel: string;
      yearOfExamination: number;
      examinationSession: string;
      examinationBoard?: string;
      studyGroup?: string;
      oLevelSubjects?: any[];
      aLevelSubjects?: any[];
    }
  ) {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      emailVerified: false,
      status: "ACTIVE",
      isDeleted: false,
    });

    const student = await Student.create({
      userId: user._id,
      dateOfBirth: studentData.dateOfBirth,
      gender: studentData.gender,
      phoneNumber: studentData.phoneNumber,
      email,
      school: studentData.school,
      rollNumber: studentData.rollNumber,
      photoUrl: studentData.photoUrl,
      applyingForLevel: studentData.applyingForLevel,
      yearOfExamination: studentData.yearOfExamination,
      examinationSession: studentData.examinationSession,
      examinationBoard: studentData.examinationBoard,
      studyGroup: studentData.studyGroup,
      oLevelSubjects: studentData.oLevelSubjects,
      aLevelSubjects: studentData.aLevelSubjects,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      student: {
        id: student._id,
        email: student.email,
      },
    };
  }
}

export const studentService = new StudentService();
