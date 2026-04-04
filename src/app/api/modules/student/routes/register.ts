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
      confirmPassword,
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

    if (!name || !email || !password || !dateOfBirth || !gender || !phoneNumber || !school || !applyingForLevel || !yearOfExamination || !examinationSession || !confirmPassword  ) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }
    if(password !== confirmPassword){
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
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
    }, baseUrl);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: {
          user: result.user,
          student: result.student,
        },
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