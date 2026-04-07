import { Student } from "../../../modules/student/models/Student";
import dbConnect from "@/lib/db";
import { requireAdmin, AuthenticatedRequest, requireAdminOrSchoolAdmin } from "../../../modules/auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = requireAdminOrSchoolAdmin()(request as any);
    if (authError) return authError;

    const { id } = await params;

    if (!id) {
      return errorResponse("Student ID is required", 400);
    }

    await dbConnect();

    const student = await Student.findById(id).lean();

    if (!student) {
      return errorResponse("Student not found", 404);
    }

    return successResponse(student, "Student details fetched", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}

export async function PATCH(request: AuthenticatedRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = requireAdminOrSchoolAdmin()(request as any);
    if (authError) return authError;

    const { id } = await params;

    if (!id) {
      return errorResponse("Student ID is required", 400);
    }

    const body = await request.json();

    await dbConnect();

    const student = await Student.findById(id);
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

    return successResponse(student, "Student profile updated successfully", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}

