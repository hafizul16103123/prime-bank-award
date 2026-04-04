import { NextResponse } from "next/server";
import { studentService } from "../services/student.service";
import { CreateStudentDto } from "../dtos";

export async function POST(request: Request) {
  try {
    const body: CreateStudentDto = await request.json();
    const {
      name,
      email,
      password,
      role,
      dateOfBirth,
      gender,
      phoneNumber,
      school,
      rollNumber,
      photoUrl,
      applyingForLevel,
      yearOfExamination,
      examinationSession,
      examinationBoard,
      studyGroup,
      oLevelSubjects,
      aLevelSubjects,
    } = body;

    if (!name || !email || !password || !dateOfBirth || !gender || !phoneNumber || !school || !applyingForLevel || !yearOfExamination || !examinationSession) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const result = await studentService.register(name, email, password, role, {
      dateOfBirth,
      gender,
      phoneNumber,
      school,
      rollNumber,
      photoUrl,
      applyingForLevel,
      yearOfExamination,
      examinationSession,
      examinationBoard,
      studyGroup,
      oLevelSubjects,
      aLevelSubjects,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student registered successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Student registration error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: error.message === "User already exists" ? 409 : 500 }
    );
  }
}
