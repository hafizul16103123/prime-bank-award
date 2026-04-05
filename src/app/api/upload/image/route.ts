import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const pathname = formData.get("pathname") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file provided" },
        { status: 400 }
      );
    }

    const uniqueId = crypto.randomUUID();
    const uniqueName = pathname
      ? `${pathname}-${uniqueId}`
      : `${file.name.split(".")[0]}-${uniqueId}`;
    const extension = file.name.split(".").pop() || "";
    const finalPathname = extension ? `${uniqueName}.${extension}` : uniqueName;

    const blob = await put(finalPathname, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      data: {
        url: blob.url,
        pathname: blob.pathname,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
