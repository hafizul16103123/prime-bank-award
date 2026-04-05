import { put } from "@vercel/blob";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const pathname = formData.get("pathname") as string | null;

    if (!file) {
      return errorResponse("No image file provided", 400);
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

    return successResponse(
      {
        url: blob.url,
        pathname: blob.pathname,
      },
      "Image uploaded successfully",
      200
    );
  } catch (error: any) {
    return errorResponse(error.message, 500);
  }
}
