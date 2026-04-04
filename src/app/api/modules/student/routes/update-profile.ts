import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireStudent, AuthenticatedRequest } from "../../auth/utils/auth-guard";

export async function PUT(request: AuthenticatedRequest) {
  try {
    const authError = requireStudent()(request as any);
    if (authError) return authError;

    const userId = request.user?.id;
    const body = await request.json();

    await dbConnect();
    
    const student = await Student.findOne({ userId });
    if (!student) {
      return NextResponse.json({
        success: false,
        message: "Student not found",
      }, { status: 404 });
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

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: student,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    }, { status: 500 });
  }
}