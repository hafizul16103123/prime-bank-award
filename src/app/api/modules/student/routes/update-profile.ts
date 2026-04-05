import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireStudent, AuthenticatedRequest } from "../../auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function PUT(request: AuthenticatedRequest) {
  try {
    const authError = requireStudent()(request as any);
    if (authError) return authError;

    const userId = request.user?.id;
    const body = await request.json();

    await dbConnect();
    
    const student = await Student.findOne({ userId });
    if (!student) {
      return errorResponse("Student not found", 404);
    }

    const allowedUpdates = [
      "dateOfBirth", "gender", "phoneNumber", "school", "rollNumber", 
      "photoUrl", "applyingForLevel", "yearOfExamination", "examinationSession",
      "examinationBoard", "studyGroup", "oLevelSubjects", "aLevelSubjects"
    ];

    allowedUpdates.forEach(field => {
      if (body[field] !== undefined) {
        (student as any)[field] = body[field];
      }
    });

    await student.save();

    return successResponse(student, "Profile updated successfully", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}