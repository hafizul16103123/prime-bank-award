import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { ForgetPasswordDto } from "../dtos";

export async function POST(request: Request) {
  try {
    const body: ForgetPasswordDto = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    await authService.forgetPassword(email);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to email successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forget password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: error.message === "User not found" ? 404 : 500 }
    );
  }
}
