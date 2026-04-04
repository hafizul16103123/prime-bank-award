import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Verification } from "../models/Verification";
import { sendOTPEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import { generateToken } from "../utils/jwt";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export class AuthService {
  async register(name: string, email: string, password: string, role: string = "STUDENT") {
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
      emailVerified: false,
      status: "ACTIVE",
      isDeleted: false,
    });

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }

  async login(email: string, password: string) {
    await dbConnect();

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      throw new Error("Invalid credentials");
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
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Verification.deleteMany({ identifier: `forget-password:${email}` });

    await Verification.create({
      identifier: `forget-password:${email}`,
      value: otp,
      expiresAt,
    });

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
