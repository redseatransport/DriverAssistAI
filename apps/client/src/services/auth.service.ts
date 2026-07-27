import api from "../api/api";
import {ENDPOINTS} from "../api/endpoints";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.types";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);

    return response.data;
  }

  async getProfile() {
    const response = await api.get(ENDPOINTS.AUTH.PROFILE);

    return response.data.user;
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, data);

    return response.data;
  }
}

export default new AuthService();
