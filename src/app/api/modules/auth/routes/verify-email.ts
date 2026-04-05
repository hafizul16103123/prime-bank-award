import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return errorResponse("Token is required", 400);
    }

    const result = await authService.verifyEmail(token);

    return successResponse(null, result.message, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 400);
  }
}