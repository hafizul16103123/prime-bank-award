import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { CreateUserDto } from "../dtos";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function register(request: Request) {
  try {
    const body: CreateUserDto = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return errorResponse("Please provide all required fields", 400);
    }

    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    const user = await authService.register(name, email, password, role, baseUrl);

    return successResponse(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      user.message,
      201
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return errorResponse(
      error.message || "Internal server error",
      error.message === "User already exists" ? 409 : 500
    );
  }
}