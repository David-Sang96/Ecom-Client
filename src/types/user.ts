export type UserRole = "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "FREEZE";

export interface UserImage {
  url: string;
  public_id: string;
}

export interface UserBan {
  isBanned: boolean;
  adminId: string | null;
  reason: string;
  bannedAt: Date | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  image: UserImage | null;
  role: UserRole;
  error: number;
  refreshToken: string;
  errorLoginCount: number;
  resetToken: string | null;
  emailVerifyToken: string | null;
  resetTokenExpiry: string | null;
  emailVerifyTokenExpiry: string | null;
  passwordChangedAt: string | null;
  ban: UserBan;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
