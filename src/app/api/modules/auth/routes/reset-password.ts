import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { ResetPasswordDto } from "../dtos";

export async function POST(request: Request) {
  try {
    const body: ResetPasswordDto = await request.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Email, OTP and new password are required" },
        { status: 400 }
      );
    }

    await authService.resetPassword(email, otp, newPassword);

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}
