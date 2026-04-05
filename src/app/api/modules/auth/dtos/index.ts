export enum UserRole {
  STUDENT = "STUDENT",
  SCHOOL_ADMIN = "SCHOOL_ADMIN",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
  BLOCKED = "BLOCKED",
}

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  school?: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class ForgetPasswordDto {
  email: string;
}

export class ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
