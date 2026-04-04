import { NextResponse } from "next/server";
import { authService } from "../services/auth.service";
import { CreateUserDto } from "../dtos";

export async function register(request: Request) {
  try {
    const body: CreateUserDto = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    const user = await authService.register(name, email, password, role, baseUrl);

    return NextResponse.json(
      {
        success: true,
        message: user.message,
        data: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: error.message === "User already exists" ? 409 : 500 }
    );
  }
}