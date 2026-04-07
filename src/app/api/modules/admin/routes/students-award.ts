import { NextResponse } from "next/server";
import { Student, StudentStatus } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import {
  requireAdmin,
  AuthenticatedRequest,
  requireAdminOrSchoolAdmin,
} from "../../auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireAdminOrSchoolAdmin()(request as any);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const level = searchParams.get("level");
    const school = searchParams.get("school");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sort_by") || "createdAt";
    const sortOrder = searchParams.get("sort_order") === "asc" ? 1 : -1;

    await dbConnect();

    const user = (request as any).user;
    let query: any = {
      status: { $in: [StudentStatus.APPROVED, StudentStatus.AWARDED] },
    };
    const userSchool = user?.school ?? null;
    if (user.role == "SCHOOL_ADMIN") {
      if (!userSchool) {
        return errorResponse("School not assigned to this user", 403);
      }
      query.school = userSchool;
    }

    if (status) {
      query = {};
      if (user.role == "SCHOOL_ADMIN") {
        query.school = userSchool;
      }
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

    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      Student.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Student.countDocuments(query),
    ]);

    return successResponse(
      {
        items: students,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Students fetched",
      200,
    );
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
