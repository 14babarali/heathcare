import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(filters: any = {}) {
    const query: any = {};
    
    if (filters.specialty) query.specialty = new RegExp(filters.specialty, 'i');
    if (filters.isAvailable !== undefined) query.isAvailable = filters.isAvailable;
    if (filters.search) {
      query.$or = [
        { specialty: new RegExp(filters.search, 'i') },
      ];
    }

    const doctors = await this.doctorModel.find(query).populate('userId').exec();
    
    // Populate user details for each doctor
    for (const doctor of doctors) {
      if (doctor.userId) {
        const user = await this.userModel.findById(doctor.userId).select('-password').exec();
        doctor.user = user;
      }
    }

    return doctors;
  }

  async findOne(id: string) {
    const doctor = await this.doctorModel.findById(id).populate('userId').exec();
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (doctor.userId) {
      const user = await this.userModel.findById(doctor.userId).select('-password').exec();
      doctor.user = user;
    }

    return doctor;
  }

  async findByUserId(userId: string) {
    const doctor = await this.doctorModel.findOne({ userId }).populate('userId').exec();
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (doctor.userId) {
      const user = await this.userModel.findById(doctor.userId).select('-password').exec();
      doctor.user = user;
    }

    return doctor;
  }

  async update(id: string, updateData: any) {
    const doctor = await this.doctorModel.findByIdAndUpdate(id, updateData, { new: true }).populate('userId').exec();
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (doctor.userId) {
      const user = await this.userModel.findById(doctor.userId).select('-password').exec();
      doctor.user = user;
    }

    return doctor;
  }

  async updateAvailability(id: string, isAvailable: boolean) {
    return this.update(id, { isAvailable });
  }

  async updateRating(id: string, rating: number) {
    const doctor = await this.doctorModel.findById(id).exec();
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const newTotalReviews = doctor.totalReviews + 1;
    const newRating = ((doctor.rating * doctor.totalReviews) + rating) / newTotalReviews;

    return this.update(id, {
      rating: Math.round(newRating * 10) / 10,
      totalReviews: newTotalReviews,
    });
  }

  async getSpecialties() {
    const specialties = await this.doctorModel.distinct('specialty').exec();
    return specialties;
  }

  async getAvailableDoctors(date: string, time: string) {
    // This would need to check against appointments
    // For now, return all available doctors
    return this.findAll({ isAvailable: true });
  }
}
