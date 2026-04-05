import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { LoginDto } from "../dtos";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body: LoginDto = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const user = await authService.login(email, password);

    return successResponse(user, "Login successful", 200);
  } catch (error: any) {
    console.error("Login error:", error);
    return errorResponse(
      error.message || "Internal server error",
      error.message === "Invalid credentials" ? 401 : 500
    );
  }
}
