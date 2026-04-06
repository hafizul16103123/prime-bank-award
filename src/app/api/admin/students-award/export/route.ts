import {
  Student,
  StudentStatus,
} from "@/app/api/modules/student/models/Student";
import dbConnect from "@/lib/db";
import {
  requireAdmin,
  AuthenticatedRequest,
} from "@/app/api/modules/auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireAdmin()(request as any);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const level = searchParams.get("level");
    const school = searchParams.get("school");
    const search = searchParams.get("search");

    await dbConnect();

    let query: any = {
      status: { $in: [StudentStatus.APPROVED, StudentStatus.AWARDED] },
    };

    if (status) {
      query = {};
      query.status = status;
    }

    if (level) {
      query.applyingForLevel = level;
    }

    if (school) {
      query.school = school;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { school: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ];
    }

    const students = await Student.find(query).sort({ createdAt: -1 }).lean();

    return successResponse(students, "Students exported", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
