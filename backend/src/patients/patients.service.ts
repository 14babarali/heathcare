import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    const patients = await this.patientModel.find().populate('userId').exec();
    
    // Populate user details for each patient
    for (const patient of patients) {
      if (patient.userId) {
        const user = await this.userModel.findById(patient.userId).select('-password').exec();
        patient.user = user;
      }
    }

    return patients;
  }

  async findOne(id: string) {
    const patient = await this.patientModel.findById(id).populate('userId').exec();
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    if (patient.userId) {
      const user = await this.userModel.findById(patient.userId).select('-password').exec();
      patient.user = user;
    }

    return patient;
  }

  async findByUserId(userId: string) {
    const patient = await this.patientModel.findOne({ userId }).populate('userId').exec();
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    if (patient.userId) {
      const user = await this.userModel.findById(patient.userId).select('-password').exec();
      patient.user = user;
    }

    return patient;
  }

  async update(id: string, updateData: any) {
    const patient = await this.patientModel.findByIdAndUpdate(id, updateData, { new: true }).populate('userId').exec();
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    if (patient.userId) {
      const user = await this.userModel.findById(patient.userId).select('-password').exec();
      patient.user = user;
    }

    return patient;
  }

  async updateMedicalHistory(id: string, medicalHistory: string[]) {
    return this.update(id, { medicalHistory });
  }

  async updateAllergies(id: string, allergies: string[]) {
    return this.update(id, { allergies });
  }

  async updateCurrentMedications(id: string, currentMedications: string[]) {
    return this.update(id, { currentMedications });
  }

  async updateInsuranceInfo(id: string, insuranceInfo: any) {
    return this.update(id, { insuranceInfo });
  }
}
