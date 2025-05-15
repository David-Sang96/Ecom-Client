import { UserInfo } from "@/store/authStore";

export type ReturnImageType = {
  success: boolean;
  message: string;
  user: UserInfo;
} | null;
