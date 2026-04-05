import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireAdminOrSchoolAdmin, AuthenticatedRequest } from "../../auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest) {
  try {
    const adminError = requireAdminOrSchoolAdmin()(request as any);
    
    if (adminError) {
      return errorResponse("Access denied. Admin or School Admin only.", 403);
    }

    await dbConnect();

    const statusCounts = await Student.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalStudents = await Student.countDocuments();

    const result = {
      total: totalStudents,
      Pending: 0,
      Approved: 0,
      Declined: 0
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