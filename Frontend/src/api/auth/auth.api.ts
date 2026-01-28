import { apiClient } from "../client";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SignupPayload,
} from "./auth.types";

export const authApi = {
  register: (data: SignupPayload) =>
    apiClient.post<RegisterResponse>("/auth/register", data),

  login: (data: LoginPayload) => {
    return apiClient.post<LoginResponse>("/auth/login", data);
  },

  forgotPassword: (data: ForgotPasswordPayload) =>
    apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", data),

  resetPassword:(data:ResetPasswordPayload)=>
    apiClient.patch<ResetPasswordResponse>
};
    