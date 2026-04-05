import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { ForgetPasswordDto } from "../dtos";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body: ForgetPasswordDto = await request.json();
    const { email } = body;

    if (!email) {
      return errorResponse("Email is required", 400);
    }

    await authService.forgetPassword(email);

    return successResponse(null, "OTP sent to email successfully", 200);
  } catch (error: any) {
    console.error("Forget password error:", error);
    return errorResponse(
      error.message || "Internal server error",
      error.message === "User not found" ? 404 : 500
    );
  }
}
