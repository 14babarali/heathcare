import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../src/users/schemas/user.schema';
import { Doctor, DoctorDocument } from '../src/doctors/schemas/doctor.schema';
import { Patient, PatientDocument } from '../src/patients/schemas/patient.schema';
import { Appointment, AppointmentDocument } from '../src/appointments/schemas/appointment.schema';
import { Prescription, PrescriptionDocument } from '../src/prescriptions/schemas/prescription.schema';
import { Message, MessageDocument } from '../src/messages/schemas/message.schema';
import { Notification, NotificationDocument } from '../src/notifications/schemas/notification.schema';
import { UserRole } from '../src/common/enums/user-role.enum';
import { AppointmentType } from '../src/common/enums/appointment-type.enum';
import { AppointmentStatus } from '../src/common/enums/appointment-status.enum';
import { NotificationType } from '../src/common/enums/notification-type.enum';
import * as bcrypt from 'bcryptjs';

async function seedComprehensive() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    const doctorModel = app.get<Model<DoctorDocument>>(getModelToken(Doctor.name));
    const patientModel = app.get<Model<PatientDocument>>(getModelToken(Patient.name));
    const appointmentModel = app.get<Model<AppointmentDocument>>(getModelToken(Appointment.name));
    const prescriptionModel = app.get<Model<PrescriptionDocument>>(getModelToken(Prescription.name));
    const messageModel = app.get<Model<MessageDocument>>(getModelToken(Message.name));
    const notificationModel = app.get<Model<NotificationDocument>>(getModelToken(Notification.name));
    
    // Clear existing data
    console.log('Clearing existing data...');
    await userModel.deleteMany({});
    await doctorModel.deleteMany({});
    await patientModel.deleteMany({});
    await appointmentModel.deleteMany({});
    await prescriptionModel.deleteMany({});
    await messageModel.deleteMany({});
    await notificationModel.deleteMany({});
    
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    // Create Admin User
    console.log('Creating admin user...');
    const adminUser = new userModel({
      email: 'admin@healthcare.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+1-555-0000',
      dateOfBirth: new Date('1980-01-01'),
      gender: 'Other',
      role: UserRole.ADMINISTRATOR,
      isActive: true,
      isEmailVerified: true
    });
    await adminUser.save();
    
    // Create Doctors
    console.log('Creating doctors...');
    const doctorsData = [
      {
        email: 'dr.sarah.ahmed@healthcare.com',
        firstName: 'Sarah',
        lastName: 'Ahmed',
        specialty: 'Cardiologist',
        rating: 4.9,
        bio: 'Experienced cardiologist with 15+ years of experience in heart disease treatment and prevention.',
        experience: 15,
        consultationFee: 200,
        phone: '+1-555-0101',
        gender: 'Female',
        dateOfBirth: new Date('1975-03-15')
      },
      {
        email: 'dr.michael.chen@healthcare.com',
        firstName: 'Michael',
        lastName: 'Chen',
        specialty: 'Dentist',
        rating: 4.7,
        bio: 'Professional dentist specializing in cosmetic and general dentistry with advanced techniques.',
        experience: 12,
        consultationFee: 150,
        phone: '+1-555-0102',
        gender: 'Male',
        dateOfBirth: new Date('1978-07-22')
      },
      {
        email: 'dr.emily.rodriguez@healthcare.com',
        firstName: 'Emily',
        lastName: 'Rodriguez',
        specialty: 'Dermatologist',
        rating: 4.8,
        bio: 'Board-certified dermatologist with expertise in skin conditions, cosmetic treatments, and dermatopathology.',
        experience: 10,
        consultationFee: 180,
        phone: '+1-555-0103',
        gender: 'Female',
        dateOfBirth: new Date('1982-11-08')
      },
      {
        email: 'dr.james.wilson@healthcare.com',
        firstName: 'James',
        lastName: 'Wilson',
        specialty: 'Orthopedics',
        rating: 4.6,
        bio: 'Orthopedic surgeon specializing in joint replacement, sports medicine, and minimally invasive procedures.',
        experience: 18,
        consultationFee: 250,
        phone: '+1-555-0104',
        gender: 'Male',
        dateOfBirth: new Date('1970-05-12')
      },
      {
        email: 'dr.lisa.patel@healthcare.com',
        firstName: 'Lisa',
        lastName: 'Patel',
        specialty: 'General Medicine',
        rating: 4.5,
        bio: 'Family medicine physician providing comprehensive healthcare services for all ages.',
        experience: 8,
        consultationFee: 120,
        phone: '+1-555-0105',
        gender: 'Female',
        dateOfBirth: new Date('1985-09-30')
      },
      {
        email: 'dr.robert.kim@healthcare.com',
        firstName: 'Robert',
        lastName: 'Kim',
        specialty: 'Neurologist',
        rating: 4.9,
        bio: 'Neurologist specializing in epilepsy, stroke, and movement disorders with cutting-edge treatments.',
        experience: 14,
        consultationFee: 220,
        phone: '+1-555-0106',
        gender: 'Male',
        dateOfBirth: new Date('1973-12-03')
      },
      {
        email: 'dr.maria.garcia@healthcare.com',
        firstName: 'Maria',
        lastName: 'Garcia',
        specialty: 'Pediatrician',
        rating: 4.8,
        bio: 'Pediatrician with expertise in child development, vaccinations, and adolescent medicine.',
        experience: 11,
        consultationFee: 140,
        phone: '+1-555-0107',
        gender: 'Female',
        dateOfBirth: new Date('1980-04-18')
      },
      {
        email: 'dr.david.thompson@healthcare.com',
        firstName: 'David',
        lastName: 'Thompson',
        specialty: 'Psychiatrist',
        rating: 4.7,
        bio: 'Psychiatrist specializing in mood disorders, anxiety, and addiction medicine with therapy integration.',
        experience: 13,
        consultationFee: 190,
        phone: '+1-555-0108',
        gender: 'Male',
        dateOfBirth: new Date('1976-08-25')
      }
    ];
    
    const createdDoctors = [];
    for (const doctorData of doctorsData) {
      const user = new userModel({
        email: doctorData.email,
        password: hashedPassword,
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        phone: doctorData.phone,
        dateOfBirth: doctorData.dateOfBirth,
        gender: doctorData.gender,
        role: UserRole.DOCTOR,
        isActive: true,
        isEmailVerified: true
      });
      
      const savedUser = await user.save();
      
      const doctor = new doctorModel({
        userId: savedUser._id,
        specialty: doctorData.specialty,
        rating: doctorData.rating,
        totalReviews: Math.floor(Math.random() * 50) + 20,
        bio: doctorData.bio,
        experience: doctorData.experience,
        consultationFee: doctorData.consultationFee,
        isAvailable: true,
        licenseNumber: `MD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        education: ['Medical School', 'Residency Program', 'Fellowship Training'],
        certifications: ['Board Certified', 'Medical License', 'Specialty Certification'],
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
      
      const savedDoctor = await doctor.save();
      createdDoctors.push({ user: savedUser, doctor: savedDoctor });
      console.log(`Created doctor: Dr. ${doctorData.firstName} ${doctorData.lastName} (${doctorData.specialty})`);
    }
    
    // Create Patients
    console.log('Creating patients...');
    const patientsData = [
      {
        email: 'john.smith@email.com',
        firstName: 'John',
        lastName: ' ',
        phone: '+1-555-1001',
        dateOfBirth: new Date('1985-06-15'),
        gender: 'Male',
        medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
        allergies: ['Penicillin', 'Shellfish'],
        currentMedications: ['Metformin', 'Lisinopril'],
        emergencyContact: {
          name: 'Jane Smith',
          relationship: 'Spouse',
          phone: '+1-555-1002'
        },
        insuranceInfo: {
          provider: 'Blue Cross Blue Shield',
          policyNumber: 'BC123456789',
          groupNumber: 'GRP001'
        },
        preferredLanguage: 'English'
      },
      {
        email: 'mary.johnson@email.com',
        firstName: 'Mary',
        lastName: 'Johnson',
        phone: '+1-555-1003',
        dateOfBirth: new Date('1990-03-22'),
        gender: 'Female',
        medicalHistory: ['Asthma', 'Seasonal Allergies'],
        allergies: ['Pollen', 'Dust'],
        currentMedications: ['Albuterol Inhaler', 'Loratadine'],
        emergencyContact: {
          name: 'Robert Johnson',
          relationship: 'Father',
          phone: '+1-555-1004'
        },
        insuranceInfo: {
          provider: 'Aetna',
          policyNumber: 'AET987654321',
          groupNumber: 'GRP002'
        },
        preferredLanguage: 'English'
      },
      {
        email: 'carlos.rodriguez@email.com',
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        phone: '+1-555-1005',
        dateOfBirth: new Date('1978-11-08'),
        gender: 'Male',
        medicalHistory: ['High Cholesterol', 'Back Pain'],
        allergies: ['Latex'],
        currentMedications: ['Atorvastatin', 'Ibuprofen'],
        emergencyContact: {
          name: 'Elena Rodriguez',
          relationship: 'Wife',
          phone: '+1-555-1006'
        },
        insuranceInfo: {
          provider: 'Cigna',
          policyNumber: 'CIG456789123',
          groupNumber: 'GRP003'
        },
        preferredLanguage: 'Spanish'
      },
      {
        email: 'sarah.williams@email.com',
        firstName: 'Sarah',
        lastName: 'Williams',
        phone: '+1-555-1007',
        dateOfBirth: new Date('1995-08-14'),
        gender: 'Female',
        medicalHistory: ['Anxiety', 'Migraines'],
        allergies: ['Sulfa drugs'],
        currentMedications: ['Sertraline', 'Sumatriptan'],
        emergencyContact: {
          name: 'Michael Williams',
          relationship: 'Brother',
          phone: '+1-555-1008'
        },
        insuranceInfo: {
          provider: 'UnitedHealth',
          policyNumber: 'UHC789123456',
          groupNumber: 'GRP004'
        },
        preferredLanguage: 'English'
      },
      {
        email: 'ahmed.hassan@email.com',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        phone: '+1-555-1009',
        dateOfBirth: new Date('1982-04-30'),
        gender: 'Male',
        medicalHistory: ['Heart Disease', 'Sleep Apnea'],
        allergies: ['Aspirin'],
        currentMedications: ['Metoprolol', 'CPAP Machine'],
        emergencyContact: {
          name: 'Fatima Hassan',
          relationship: 'Sister',
          phone: '+1-555-1010'
        },
        insuranceInfo: {
          provider: 'Kaiser Permanente',
          policyNumber: 'KP321654987',
          groupNumber: 'GRP005'
        },
        preferredLanguage: 'Arabic'
      },
      {
        email: 'jennifer.brown@email.com',
        firstName: 'Jennifer',
        lastName: 'Brown',
        phone: '+1-555-1011',
        dateOfBirth: new Date('1988-12-05'),
        gender: 'Female',
        medicalHistory: ['Pregnancy', 'Gestational Diabetes'],
        allergies: ['None'],
        currentMedications: ['Prenatal Vitamins'],
        emergencyContact: {
          name: 'David Brown',
          relationship: 'Husband',
          phone: '+1-555-1012'
        },
        insuranceInfo: {
          provider: 'Humana',
          policyNumber: 'HUM654321987',
          groupNumber: 'GRP006'
        },
        preferredLanguage: 'English'
      },
      {
        email: 'li.wei@email.com',
        firstName: 'Li',
        lastName: 'Wei',
        phone: '+1-555-1013',
        dateOfBirth: new Date('1975-01-20'),
        gender: 'Male',
        medicalHistory: ['Arthritis', 'Osteoporosis'],
        allergies: ['Iodine'],
        currentMedications: ['Calcium Supplements', 'Vitamin D'],
        emergencyContact: {
          name: 'Mei Wei',
          relationship: 'Daughter',
          phone: '+1-555-1014'
        },
        insuranceInfo: {
          provider: 'Medicare',
          policyNumber: 'MED987654321',
          groupNumber: 'GRP007'
        },
        preferredLanguage: 'Chinese'
      },
      {
        email: 'emma.davis@email.com',
        firstName: 'Emma',
        lastName: 'Davis',
        phone: '+1-555-1015',
        dateOfBirth: new Date('2000-07-10'),
        gender: 'Female',
        medicalHistory: ['ADHD', 'Depression'],
        allergies: ['Nuts'],
        currentMedications: ['Adderall', 'Fluoxetine'],
        emergencyContact: {
          name: 'Lisa Davis',
          relationship: 'Mother',
          phone: '+1-555-1016'
        },
        insuranceInfo: {
          provider: 'Anthem',
          policyNumber: 'ANT147258369',
          groupNumber: 'GRP008'
        },
        preferredLanguage: 'English'
      }
    ];
    
    const createdPatients = [];
    for (const patientData of patientsData) {
      const user = new userModel({
        email: patientData.email,
        password: hashedPassword,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        phone: patientData.phone,
        dateOfBirth: patientData.dateOfBirth,
        gender: patientData.gender,
        role: UserRole.PATIENT,
        isActive: true,
        isEmailVerified: true
      });
      
      const savedUser = await user.save();
      
      const patient = new patientModel({
        userId: savedUser._id,
        emergencyContact: patientData.emergencyContact,
        medicalHistory: patientData.medicalHistory,
        allergies: patientData.allergies,
        currentMedications: patientData.currentMedications,
        insuranceInfo: patientData.insuranceInfo,
        preferredLanguage: patientData.preferredLanguage,
        notes: `Patient notes for ${patientData.firstName} ${patientData.lastName}`
      });
      
      const savedPatient = await patient.save();
      createdPatients.push({ user: savedUser, patient: savedPatient });
      console.log(`Created patient: ${patientData.firstName} ${patientData.lastName}`);
    }
    
    // Create Appointments
    console.log('Creating appointments...');
    const appointmentTypes = [AppointmentType.IN_PERSON, AppointmentType.ONLINE];
    const appointmentStatuses = [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED];
    
    const createdAppointments = [];
    for (let i = 0; i < 30; i++) {
      const randomDoctor = createdDoctors[Math.floor(Math.random() * createdDoctors.length)];
      const randomPatient = createdPatients[Math.floor(Math.random() * createdPatients.length)];
      const randomType = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
      const randomStatus = appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)];
      
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 30) - 15);
      appointmentDate.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 4) * 15, 0, 0);
      
      const startTime = `${String(appointmentDate.getHours()).padStart(2, '0')}:${String(appointmentDate.getMinutes()).padStart(2, '0')}`;
      const endTime = `${String(appointmentDate.getHours() + 1).padStart(2, '0')}:${String(appointmentDate.getMinutes()).padStart(2, '0')}`;
      
      const problems = [
        'Chest pain and shortness of breath',
        'Routine dental cleaning',
        'Skin rash and itching',
        'Joint pain and stiffness',
        'Annual physical examination',
        'Headaches and dizziness',
        'Child wellness checkup',
        'Anxiety and stress management',
        'Follow-up consultation',
        'Emergency consultation'
      ];
      
      const diagnoses = [
        'Hypertension',
        'Dental caries',
        'Contact dermatitis',
        'Osteoarthritis',
        'Healthy patient',
        'Migraine',
        'Normal development',
        'Generalized anxiety disorder',
        'Stable condition',
        'Acute condition'
      ];
      
      const treatments = [
        'Medication adjustment and lifestyle modifications',
        'Dental cleaning and fluoride treatment',
        'Topical corticosteroid cream',
        'Physical therapy and pain management',
        'Continue current regimen',
        'Pain management and rest',
        'Continue monitoring',
        'Cognitive behavioral therapy',
        'Continue current treatment',
        'Immediate intervention required'
      ];
      
      const appointment = new appointmentModel({
        patientId: randomPatient.patient._id,
        doctorId: randomDoctor.doctor._id,
        appointmentDate: appointmentDate,
        startTime: startTime,
        endTime: endTime,
        type: randomType,
        status: randomStatus,
        problemDescription: problems[Math.floor(Math.random() * problems.length)],
        notes: `Appointment notes for ${randomPatient.user.firstName} ${randomPatient.user.lastName}`,
        diagnosis: randomStatus === AppointmentStatus.COMPLETED ? diagnoses[Math.floor(Math.random() * diagnoses.length)] : undefined,
        treatment: randomStatus === AppointmentStatus.COMPLETED ? treatments[Math.floor(Math.random() * treatments.length)] : undefined,
        followUpDate: randomStatus === AppointmentStatus.COMPLETED ? new Date(appointmentDate.getTime() + 30 * 24 * 60 * 60 * 1000) : undefined,
        meetingLink: randomType === AppointmentType.ONLINE ? `https://meet.healthcare.com/room-${Math.random().toString(36).substr(2, 9)}` : undefined,
        cancellationReason: randomStatus === AppointmentStatus.CANCELLED ? 'Patient requested cancellation' : undefined,
        cancelledBy: randomStatus === AppointmentStatus.CANCELLED ? randomPatient.user._id : undefined,
        cancelledAt: randomStatus === AppointmentStatus.CANCELLED ? new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000) : undefined
      });
      
      const savedAppointment = await appointment.save();
      createdAppointments.push(savedAppointment);
    }
    
    console.log(`Created ${createdAppointments.length} appointments`);
    
    // Create Prescriptions
    console.log('Creating prescriptions...');
    const medications = [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', instructions: 'Take with food' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take in the morning' },
      { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed', duration: '90 days', instructions: 'Inhale 1-2 puffs every 4-6 hours' },
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take at bedtime' },
      { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take with or without food' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily', duration: '7 days', instructions: 'Take with food to avoid stomach upset' },
      { name: 'Loratadine', dosage: '10mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take with or without food' },
      { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', duration: '30 days', instructions: 'Take at first sign of migraine' }
    ];
    
    for (let i = 0; i < 20; i++) {
      const randomAppointment = createdAppointments[Math.floor(Math.random() * createdAppointments.length)];
      const randomMedications = medications.slice(0, Math.floor(Math.random() * 3) + 1);
      
      const prescription = new prescriptionModel({
        patientId: randomAppointment.patientId,
        doctorId: randomAppointment.doctorId,
        appointmentId: randomAppointment._id,
        medications: randomMedications,
        notes: `Prescription notes for appointment on ${randomAppointment.appointmentDate.toDateString()}`,
        isDispensed: Math.random() > 0.3,
        dispensedAt: Math.random() > 0.3 ? new Date() : undefined,
        dispensedBy: Math.random() > 0.3 ? randomAppointment.doctorId : undefined,
        isRefillable: Math.random() > 0.5,
        refillCount: Math.floor(Math.random() * 3),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      });
      
      await prescription.save();
    }
    
    console.log('Created 20 prescriptions');
    
    // Create Messages
    console.log('Creating messages...');
    const messageTemplates = [
      'Thank you for the appointment. I have a few questions about my treatment.',
      'I would like to schedule a follow-up appointment.',
      'I am experiencing some side effects from the medication. Should I continue taking it?',
      'Can you please explain the test results from my last visit?',
      'I need to reschedule my upcoming appointment.',
      'Thank you for your excellent care. I am feeling much better.',
      'I have a question about my prescription refill.',
      'Is it safe to take this medication with my other prescriptions?',
      'I would like to discuss alternative treatment options.',
      'Thank you for the quick response. Your advice was very helpful.'
    ];
    
    for (let i = 0; i < 50; i++) {
      const randomDoctor = createdDoctors[Math.floor(Math.random() * createdDoctors.length)];
      const randomPatient = createdPatients[Math.floor(Math.random() * createdPatients.length)];
      const isFromPatient = Math.random() > 0.5;
      
      const message = new messageModel({
        senderId: isFromPatient ? randomPatient.user._id : randomDoctor.user._id,
        recipientId: isFromPatient ? randomDoctor.user._id : randomPatient.user._id,
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        attachments: Math.random() > 0.8 ? ['document.pdf', 'image.jpg'] : [],
        isRead: Math.random() > 0.3,
        readAt: Math.random() > 0.3 ? new Date() : undefined,
        isDeleted: false,
        replyTo: Math.random() > 0.7 ? new Date() : undefined
      });
      
      await message.save();
    }
    
    console.log('Created 50 messages');
    
    // Create Notifications
    console.log('Creating notifications...');
    const notificationTemplates = [
      { type: NotificationType.APPOINTMENT_REMINDER, title: 'Appointment Reminder', message: 'You have an appointment tomorrow at 10:00 AM' },
      { type: NotificationType.APPOINTMENT_CONFIRMED, title: 'Appointment Confirmed', message: 'Your appointment has been confirmed for next week' },
      { type: NotificationType.APPOINTMENT_CANCELLED, title: 'Appointment Cancelled', message: 'Your appointment has been cancelled' },
      { type: NotificationType.PRESCRIPTION_READY, title: 'Prescription Ready', message: 'Your prescription is ready for pickup' },
      { type: NotificationType.MESSAGE_RECEIVED, title: 'New Message', message: 'You have received a new message from your doctor' },
      { type: NotificationType.SYSTEM_ANNOUNCEMENT, title: 'System Update', message: 'New features have been added to the healthcare portal' }
    ];
    
    for (let i = 0; i < 40; i++) {
      const randomUser = Math.random() > 0.5 ? 
        createdDoctors[Math.floor(Math.random() * createdDoctors.length)].user :
        createdPatients[Math.floor(Math.random() * createdPatients.length)].user;
      const randomTemplate = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
      
      const notification = new notificationModel({
        userId: randomUser._id,
        type: randomTemplate.type,
        title: randomTemplate.title,
        message: randomTemplate.message,
        data: { appointmentId: 'sample-id', prescriptionId: 'sample-id' },
        isRead: Math.random() > 0.4,
        readAt: Math.random() > 0.4 ? new Date() : undefined,
        isDeleted: false
      });
      
      await notification.save();
    }
    
    console.log('Created 40 notifications');
    
    console.log('\n=== SEEDING COMPLETED SUCCESSFULLY ===');
    console.log('Summary:');
    console.log(`- 1 Admin user created`);
    console.log(`- ${createdDoctors.length} Doctors created`);
    console.log(`- ${createdPatients.length} Patients created`);
    console.log(`- ${createdAppointments.length} Appointments created`);
    console.log(`- 20 Prescriptions created`);
    console.log(`- 50 Messages created`);
    console.log(`- 40 Notifications created`);
    console.log('\nAll users have password: 123456');
    console.log('Admin email: admin@healthcare.com');
    console.log('Doctor emails: dr.*@healthcare.com');
    console.log('Patient emails: *@email.com');
    
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seedComprehensive();
