import { NextRequest, NextResponse } from "next/server";
import { verifyToken, extractTokenFromHeader } from "./jwt";
import { JwtPayload } from "./jwt";

export enum UserRole {
  ADMIN = "ADMIN",
  SCHOOL_ADMIN = "SCHOOL_ADMIN",
  STUDENT = "STUDENT",
}

export interface AuthenticatedRequest extends NextRequest {
  user?: JwtPayload;
}

export function authMiddleware(req: AuthenticatedRequest) {
  const authHeader = req.headers.get("authorization");
  
  const token = extractTokenFromHeader(authHeader);
  
  if (!token) {
    return { authenticated: false, user: null };
  }

  const user = verifyToken(token);
  
  if (!user) {
    return { authenticated: false, user: null };
  }

  return { authenticated: true, user };
}

export function requireAuth(roles: UserRole[] = []) {
  return (req: AuthenticatedRequest): NextResponse | null => {
    const { authenticated, user } = authMiddleware(req);

    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    if (roles.length > 0 && !roles.includes(user!.role as UserRole)) {
      return NextResponse.json(
        { success: false, message: "Forbidden - Insufficient permissions" },
        { status: 403 }
      );
    }

    (req as any).user = user;
    return null;
  };
}

export function requireAdmin() {
  return requireAuth([UserRole.ADMIN]);
}

export function requireSchoolAdmin() {
  return requireAuth([UserRole.SCHOOL_ADMIN]);
}

export function requireStudent() {
  return requireAuth([UserRole.STUDENT]);
}

export function requireAdminOrSchoolAdmin() {
  return requireAuth([UserRole.ADMIN, UserRole.SCHOOL_ADMIN]);
}

export function requireAnyRole() {
  return requireAuth([UserRole.ADMIN, UserRole.SCHOOL_ADMIN, UserRole.STUDENT]);
}
