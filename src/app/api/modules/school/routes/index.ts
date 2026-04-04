import { NextResponse } from "next/server";
import { School } from "../models/School";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const schools = await School.find({}).select("name address").sort({ name: 1 });
    return NextResponse.json({ success: true, data: schools });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, address } = body;

    if (!name || !address) {
      return NextResponse.json({ success: false, message: "Name and address are required" }, { status: 400 });
    }

    const school = await School.create({ name, address });
    return NextResponse.json({ success: true, data: school }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}