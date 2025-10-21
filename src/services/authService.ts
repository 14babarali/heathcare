import api from '@/lib/api';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  ChangePasswordRequest, 
  ProfileResponse 
} from '@/types';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async loginByEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login-email', { email, password });
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  async getProfile(): Promise<ProfileResponse> {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await api.patch('/auth/change-password', data);
    return response.data;
  },
};
