import { NextResponse } from "next/server";
import { studentService } from "../services/student.service";
import { CreateStudentDto } from "../dtos";
import { successResponse, errorResponse } from "@/lib/api-response";

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
      return errorResponse("Please provide all required fields", 400);
    }
    if(password !== confirmPassword){
      return errorResponse("Passwords do not match", 400);
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

    return successResponse(
      {
        user: result.user,
        student: result.student,
      },
      result.message,
      201
    );
  } catch (error: any) {
    console.error("Student registration error:", error);
    return errorResponse(
      error.message || "Internal server error",
      error.message === "User already exists" ? 409 : 500
    );
  }
}