import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T | null;
  message: string[] | null;
};

export function successResponse<T>(
  data: T,
  message: string | string[] = "Success",
  statusCode: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      statusCode,
      data,
      message: Array.isArray(message) ? message : [message],
    },
    { status: statusCode }
  );
}

export function errorResponse(
  message: string | string[] = "Error",
  statusCode: number = 500,
  data: any = null
): NextResponse<ApiResponse<any>> {
  return NextResponse.json(
    {
      success: false,
      statusCode,
      data,
      message: Array.isArray(message) ? message : [message],
    },
    { status: statusCode }
  );
}
