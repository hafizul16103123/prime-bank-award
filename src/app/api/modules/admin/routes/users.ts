import { NextResponse } from "next/server";
import { User } from "../../auth/models/User";
import dbConnect from "@/lib/db";
import { requireAdmin, AuthenticatedRequest, authMiddleware } from "../../auth/utils/auth-guard";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = requireAdmin()(request);
    if (authError) return authError;

    await dbConnect();
    const users = await User.find({ isDeleted: false }).select("-password");
    
    return successResponse(users, "Users fetched", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
