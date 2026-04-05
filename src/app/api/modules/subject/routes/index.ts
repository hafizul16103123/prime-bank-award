import { NextResponse } from "next/server";
import { Subject } from "../models/Subject";
import dbConnect from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group");
    const level = searchParams.get("level");

    const query: any = {};
    if (group) query.group = group;
    if (level) query.level = level;

    const subjects = await Subject.find(query).select("name group level code").sort({ name: 1 });
    return successResponse(subjects, "Subjects fetched", 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, group, level, code } = body;

    if (!name || !group || !level || !code) {
      return errorResponse("All fields are required", 400);
    }

    const subject = await Subject.create({ name, group, level, code });
    return successResponse(subject, "Subject created", 201);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}