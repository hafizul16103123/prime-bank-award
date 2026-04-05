import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T | null;
  message: string[] | null;
};

function transformDocument(data: any): any {
  if (data === null || data === undefined) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => transformDocument(item));
  }

  const jsonStr = JSON.stringify(data);
  let obj = JSON.parse(jsonStr);
  
  function transform(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item: any) => transform(item));
    }
    if (obj && typeof obj === 'object') {
      if (obj._id) {
        obj.id = obj._id;
        delete obj._id;
      }
      if (obj.__v !== undefined) {
        delete obj.__v;
      }
      for (const key in obj) {
        obj[key] = transform(obj[key]);
      }
    }
    return obj;
  }
  
  return transform(obj);
}

export function successResponse<T>(
  data: T,
  message: string | string[] = "Success",
  statusCode: number = 200
): NextResponse<ApiResponse<T>> {
  const transformed = transformDocument(data);
  return NextResponse.json(
    {
      success: true,
      statusCode,
      data: transformed,
      message: Array.isArray(message) ? message : [message],
    },
    { status: statusCode }
  );
}

export function errorResponse<T = unknown>(
  message: string | string[] = "Error",
  statusCode: number = 500,
  data: T | null = null
): NextResponse<ApiResponse<T>> {
  const transformed = transformDocument(data);
  return NextResponse.json(
    {
      success: false,
      statusCode,
      data: transformed,
      message: Array.isArray(message) ? message : [message],
    },
    { status: statusCode }
  );
}
