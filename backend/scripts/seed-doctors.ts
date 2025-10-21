import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../src/users/schemas/user.schema';
import { Doctor, DoctorDocument } from '../src/doctors/schemas/doctor.schema';
import { UserRole } from '../src/common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

async function seedDoctors() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    const doctorModel = app.get<Model<DoctorDocument>>(getModelToken(Doctor.name));
    
    // Check if doctors already exist
    const existingDoctors = await doctorModel.countDocuments().exec();
    
    if (existingDoctors > 0) {
      console.log(`${existingDoctors} doctors already exist in the database`);
      return;
    }
    
    const doctorsData = [
      {
        email: 'dr.sarah.ahmed@healthcare.com',
        firstName: 'Sarah',
        lastName: 'Ahmed',
        specialty: 'Cardiologist',
        rating: 4.9,
        bio: 'Experienced cardiologist with 10+ years of experience in heart disease treatment.',
        experience: 10,
        consultationFee: 150
      },
      {
        email: 'dr.michael.chen@healthcare.com',
        firstName: 'Michael',
        lastName: 'Chen',
        specialty: 'Dentist',
        rating: 4.7,
        bio: 'Professional dentist specializing in cosmetic and general dentistry.',
        experience: 8,
        consultationFee: 120
      },
      {
        email: 'dr.emily.rodriguez@healthcare.com',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        specialty: 'Dermatologist',
        rating: 4.8,
        bio: 'Board-certified dermatologist with expertise in skin conditions and treatments.',
        experience: 12,
        consultationFee: 140
      },
      {
        email: 'dr.james.wilson@healthcare.com',
        firstName: 'James',
        lastName: 'Wilson',
        specialty: 'Orthopedics',
        rating: 4.5,
        bio: 'Orthopedic surgeon specializing in joint replacement and sports medicine.',
        experience: 15,
        consultationFee: 180
      },
      {
        email: 'dr.lisa.patel@healthcare.com',
        firstName: 'Lisa',
        lastName: 'Patel',
        specialty: 'General Medicine',
        rating: 4.6,
        bio: 'Family medicine physician providing comprehensive healthcare services.',
        experience: 7,
        consultationFee: 100
      }
    ];
    
    for (const doctorData of doctorsData) {
      // Create user account for doctor
      const hashedPassword = await bcrypt.hash('doctor123', 12);
      
      const user = new userModel({
        email: doctorData.email,
        password: hashedPassword,
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        role: UserRole.DOCTOR,
        isActive: true,
        isEmailVerified: true,
        phone: '+1-555-0123',
        gender: 'Female'
      });
      
      const savedUser = await user.save();
      
      // Create doctor profile
      const doctor = new doctorModel({
        userId: savedUser._id,
        specialty: doctorData.specialty,
        rating: doctorData.rating,
        totalReviews: 25,
        bio: doctorData.bio,
        experience: doctorData.experience,
        consultationFee: doctorData.consultationFee,
        isAvailable: true,
        licenseNumber: `MD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        education: ['Medical School', 'Residency Program'],
        certifications: ['Board Certified'],
        languages: ['English', 'Spanish'],
        availability: {
          monday: { start: '09:00', end: '17:00', isAvailable: true },
          tuesday: { start: '09:00', end: '17:00', isAvailable: true },
          wednesday: { start: '09:00', end: '17:00', isAvailable: true },
          thursday: { start: '09:00', end: '17:00', isAvailable: true },
          friday: { start: '09:00', end: '17:00', isAvailable: true },
          saturday: { start: '10:00', end: '14:00', isAvailable: true },
          sunday: { start: '10:00', end: '14:00', isAvailable: false }
        }
      });
      
      await doctor.save();
      
      console.log(`Created doctor: Dr. ${doctorData.firstName} ${doctorData.lastName} (${doctorData.specialty})`);
    }
    
    console.log('All test doctors created successfully!');
    console.log('Default password for all doctors: doctor123');
    
  } catch (error) {
    console.error('Error creating test doctors:', error);
  } finally {
    await app.close();
  }
}

seedDoctors();
