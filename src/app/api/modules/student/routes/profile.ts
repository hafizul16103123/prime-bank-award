import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireStudent, AuthenticatedRequest } from "../../auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireStudent()(request as any);
    if (authError) return authError;

    const userId = request.user?.id;
    
    await dbConnect();
    const student = await Student.findOne({ userId });
    
    return successResponse(student, "Student profile fetched", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
