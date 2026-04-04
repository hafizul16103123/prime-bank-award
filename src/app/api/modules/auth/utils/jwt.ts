import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_VERIFY_SECRET = process.env.JWT_VERIFY_SECRET || "your-verify-secret-key-change-in-production";

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface VerifyTokenPayload {
  email: string;
  type: "email_verification";
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function generateVerificationToken(email: string): string {
  const payload: VerifyTokenPayload = { email, type: "email_verification" };
  return jwt.sign(payload, JWT_VERIFY_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyVerificationToken(token: string): VerifyTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_VERIFY_SECRET) as VerifyTokenPayload;
    if (decoded.type === "email_verification") {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}
