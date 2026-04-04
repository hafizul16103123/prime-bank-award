import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import { requireAdminOrSchoolAdmin, AuthenticatedRequest } from "../../auth/utils/auth-guard";

export async function GET(request: AuthenticatedRequest) {
  try {
    const adminError = requireAdminOrSchoolAdmin()(request as any);
    
    if (adminError) {
      return NextResponse.json(
        { success: false, message: "Access denied. Admin or School Admin only." },
        { status: 403 }
      );
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
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0
    };

    statusCounts.forEach((item: any) => {
      if (item._id) {
        result[item._id as keyof typeof result] = item.count;
      }
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    }, { status: 500 });
  }
}