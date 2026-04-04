import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { LoginDto } from "../dtos";

export async function POST(request: Request) {
  try {
    const body: LoginDto = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await authService.login(email, password);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: error.message === "Invalid credentials" ? 401 : 500 }
    );
  }
}
