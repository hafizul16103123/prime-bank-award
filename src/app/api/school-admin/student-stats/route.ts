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

    await dbConnect();

    const statusCounts = await Student.aggregate([
      { $match: { school: userSchool } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalStudents = await Student.countDocuments({ school: userSchool });

    const result = {
      total: totalStudents,
      PENDING: 0,
      APPROVED: 0,
      DECLINED: 0
    };

    statusCounts.forEach((item: any) => {
      if (item._id) {
        result[item._id as keyof typeof result] = item.count;
      }
    });

    return successResponse(result, "Student stats fetched", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
