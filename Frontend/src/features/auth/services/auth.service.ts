import { authApi } from "../../../api/auth/auth.api";
import type {
  ForgetPassPayload,
  LoginPayload,
  SignupPayload,
} from "../../../api/auth/auth.types";

export const authService = {
  async login(payload: LoginPayload) {
    const res = await authApi.login(payload);

    const loginData = res.data.data;
    localStorage.setItem("token", loginData.token);
    return loginData;
  },

  async register(payload: SignupPayload) {
    const res = await authApi.register(payload);

    const registerData = res.data.data;
    if (registerData.user && registerData.user.token) {
      localStorage.setItem("token", registerData.user.token);
    }
    return registerData;
  },

  async reset(payload: ForgetPassPayload) {
    const res = await authApi.reset(payload);

    return res;
  },
};
