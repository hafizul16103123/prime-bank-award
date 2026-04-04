import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireSchoolAdmin, AuthenticatedRequest } from "../../auth/utils/auth-guard";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireSchoolAdmin()(request as any);
    if (authError) return authError;

    await dbConnect();
    const students = await Student.find().populate("userId", "name email");
    
    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    }, { status: 500 });
  }
}
