import api from '@/lib/api';

export interface DoctorFilters {
  specialty?: string;
  isAvailable?: boolean;
  rating?: number;
}

export interface UpdateDoctorRequest {
  specialty?: string;
  licenseNumber?: string;
  bio?: string;
  experience?: number;
  education?: string[];
  certifications?: string[];
  languages?: string[];
  consultationFee?: number;
  isAvailable?: boolean;
}

export interface UpdateRatingRequest {
  rating: number;
}

export const doctorService = {
  async getDoctors(filters?: DoctorFilters) {
    const response = await api.get('/doctors', { params: filters });
    return response.data;
  },

  async getSpecialties() {
    const response = await api.get('/doctors/specialties');
    return response.data;
  },

  async getAvailableDoctors(date: string, time: string) {
    const response = await api.get('/doctors/available', { 
      params: { date, time } 
    });
    return response.data;
  },

  async getMyProfile() {
    const response = await api.get('/doctors/my-profile');
    return response.data;
  },

  async updateMyProfile(data: UpdateDoctorRequest) {
    const response = await api.patch('/doctors/my-profile', data);
    return response.data;
  },

  async updateAvailability(isAvailable: boolean) {
    const response = await api.patch('/doctors/my-profile/availability', { isAvailable });
    return response.data;
  },

  async getDoctor(id: string) {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  async updateDoctor(id: string, data: UpdateDoctorRequest) {
    const response = await api.patch(`/doctors/${id}`, data);
    return response.data;
  },

  async updateRating(id: string, rating: number) {
    const response = await api.patch(`/doctors/${id}/rating`, { rating });
    return response.data;
  },
};
