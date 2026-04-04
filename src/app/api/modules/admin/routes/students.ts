import { NextResponse } from "next/server";
import { Student } from "../../student/models/Student";
import dbConnect from "@/lib/db";
import {
  requireAdmin,
  AuthenticatedRequest,
} from "../../auth/utils/auth-guard";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireAdmin()(request as any);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sort_by") || "createdAt";
    const sortOrder = searchParams.get("sort_order") === "asc" ? 1 : -1;

    await dbConnect();

    const query: any = {};

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

    return NextResponse.json({
      success: true,
      data: {
        items: students,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
