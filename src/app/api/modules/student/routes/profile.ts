import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireStudent, AuthenticatedRequest } from "../../auth/utils/auth-guard";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireStudent()(request as any);
    if (authError) return authError;

    const userId = request.user?.id;
    
    await dbConnect();
    const student = await Student.findOne({ userId });
    
    return NextResponse.json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    }, { status: 500 });
  }
}
