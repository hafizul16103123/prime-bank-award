import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { ResetPasswordDto } from "../dtos";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body: ResetPasswordDto = await request.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return errorResponse("Email, OTP and new password are required", 400);
    }

    await authService.resetPassword(email, otp, newPassword);

    return successResponse(null, "Password reset successfully", 200);
  } catch (error: any) {
    console.error("Reset password error:", error);
    return errorResponse(error.message || "Internal server error", 400);
  }
}
