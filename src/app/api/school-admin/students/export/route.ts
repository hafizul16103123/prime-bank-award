import { Student } from "@/app/api/modules/student/models/Student";
import dbConnect from "@/lib/db";
import { requireSchoolAdmin, AuthenticatedRequest } from "@/app/api/modules/auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireSchoolAdmin()(request as any);
    if (authError) return authError;

    const user = (request as any).user;
    const userSchool = user?.school;

    if (!userSchool) {
      return errorResponse("School not assigned to this user", 403);
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const level = searchParams.get("level");
    const search = searchParams.get("search");

    await dbConnect();

    const query: any = { school: userSchool };

    if (status) {
      query.status = status;
    }

    if (level) {
      query.applyingForLevel = level;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ];
    }

    const students = await Student.find(query).sort({ createdAt: -1 }).lean();

    return successResponse(students, "Students exported", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
