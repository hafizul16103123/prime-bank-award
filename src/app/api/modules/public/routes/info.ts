import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      message: "Welcome to Prime Bank API",
      version: "1.0.0",
      publicRoutes: [
        "POST /api/register",
        "POST /api/login",
        "POST /api/forget-password",
        "POST /api/reset-password",
        "GET /api/swagger",
      ],
      protectedRoutes: [
        "GET /api/admin/users - Admin only",
        "GET /api/school-admin/students - School Admin & Admin",
        "GET /api/student/profile - Student only",
      ],
    },
  });
}
