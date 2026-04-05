import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Verification } from "../models/Verification";
import { sendVerificationEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import { generateToken, generateVerificationToken, verifyVerificationToken } from "../utils/jwt";

export class AuthService {
  async register(name: string, email: string, password: string, role: string = "STUDENT", baseUrl?: string, school?: string) {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      school: school || undefined,
      emailVerified: false,
      status: "ACTIVE",
      isDeleted: false,
    });

    const verificationToken = generateVerificationToken(email);

    await Verification.deleteMany({ identifier: `verify-email:${email}` });

    await Verification.create({
      identifier: `verify-email:${email}`,
      value: verificationToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    if (baseUrl) {
      const verificationLink = `${baseUrl}/verify-email?token=${verificationToken}`;
      await sendVerificationEmail(email, verificationLink, name);
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "Registration successful. Please verify your email to login.",
    };
  }

  async verifyEmail(token: string) {
    const decoded = verifyVerificationToken(token);
    if (!decoded) {
      throw new Error("Invalid or expired verification token");
    }

    const { email } = decoded;

    await dbConnect();

    const verification = await Verification.findOne({
      identifier: `verify-email:${email}`,
      value: token,
    });

    if (!verification) {
      throw new Error("Invalid verification token");
    }

    if (verification.expiresAt < new Date()) {
      await Verification.deleteOne({ _id: verification._id });
      throw new Error("Verification token has expired");
    }

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new Error("User not found");
    }

    user.emailVerified = true;
    user.isUserConfirmed = true;
    await user.save();

    await Verification.deleteOne({ _id: verification._id });

    return { message: "Email verified successfully. You can now login." };
  }

  async login(email: string, password: string) {
    await dbConnect();

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Account is not active");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      school: user.school
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: user.school ?? null,
      token,
    };
  }

  async forgetPassword(email: string) {
    await dbConnect();

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.status === "DELETED" || user.status === "BLOCKED") {
      throw new Error("User account is not active");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Verification.deleteMany({ identifier: `forget-password:${email}` });

    await Verification.create({
      identifier: `forget-password:${email}`,
      value: otp,
      expiresAt,
    });

    const { sendOTPEmail } = await import("@/lib/email");
    await sendOTPEmail(email, otp);

    return { message: "OTP sent to email successfully" };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    await dbConnect();

    const verification = await Verification.findOne({
      identifier: `forget-password:${email}`,
      value: otp,
    });

    if (!verification) {
      throw new Error("Invalid OTP");
    }

    if (verification.expiresAt < new Date()) {
      await Verification.deleteOne({ _id: verification._id });
      throw new Error("OTP has expired");
    }

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    await Verification.deleteOne({ _id: verification._id });

    return { message: "Password reset successfully" };
  }
}

export const authService = new AuthService();