import { NextResponse } from "next/server";
import { User } from "../../auth/models/User";
import dbConnect from "@/lib/db";
import { requireAdmin, AuthenticatedRequest, authMiddleware } from "../../auth/utils/auth-guard";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireAdmin()(request);
    if (authError) return authError;

    await dbConnect();
    const users = await User.find({ isDeleted: false }).select("-password");
    
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "Internal server error",
    }, { status: 500 });
  }
}
