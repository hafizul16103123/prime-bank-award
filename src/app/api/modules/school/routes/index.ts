import { NextResponse } from "next/server";
import { School } from "../models/School";
import dbConnect from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    await dbConnect();
    const schools = await School.find({}).select("name address").sort({ name: 1 });
    return successResponse(schools, "Schools fetched", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, address } = body;

    if (!name || !address) {
      return errorResponse("Name and address are required", 400);
    }

    const school = await School.create({ name, address });
    return successResponse(school, "School created", 201);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}