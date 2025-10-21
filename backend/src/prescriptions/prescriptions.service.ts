import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prescription, PrescriptionDocument } from './schemas/prescription.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';
import { Patient, PatientDocument } from '../patients/schemas/patient.schema';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription.name) private prescriptionModel: Model<PrescriptionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private notificationsService: NotificationsService,
  ) {}

  async create(createPrescriptionDto: any, doctorId: string) {
    const prescription = new this.prescriptionModel({
      ...createPrescriptionDto,
      doctorId,
    });

    const savedPrescription = await prescription.save();
    await this.populatePrescription(savedPrescription);

    // Send notification to patient
    await this.notificationsService.create({
      userId: prescription.patientId,
      type: 'prescription_ready' as any,
      title: 'New Prescription Available',
      message: 'You have a new prescription available',
      data: { prescriptionId: savedPrescription._id },
    });

    return savedPrescription;
  }

  async findAll(filters: any = {}) {
    const query: any = {};
    
    if (filters.patientId) query.patientId = filters.patientId;
    if (filters.doctorId) query.doctorId = filters.doctorId;
    if (filters.isDispensed !== undefined) query.isDispensed = filters.isDispensed;

    const prescriptions = await this.prescriptionModel
      .find(query)
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId')
      .sort({ createdAt: -1 })
      .exec();

    // Populate user details
    for (const prescription of prescriptions) {
      await this.populatePrescription(prescription);
    }

    return prescriptions;
  }

  async findOne(id: string) {
    const prescription = await this.prescriptionModel
      .findById(id)
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId')
      .exec();

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    await this.populatePrescription(prescription);
    return prescription;
  }

  async update(id: string, updateData: any) {
    const prescription = await this.prescriptionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId')
      .exec();

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    await this.populatePrescription(prescription);
    return prescription;
  }

  async dispense(id: string, dispensedBy: string) {
    const prescription = await this.prescriptionModel.findById(id).exec();
    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.isDispensed) {
      throw new BadRequestException('Prescription is already dispensed');
    }

    const updatedPrescription = await this.prescriptionModel
      .findByIdAndUpdate(
        id,
        {
          isDispensed: true,
          dispensedAt: new Date(),
          dispensedBy,
        },
        { new: true }
      )
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId')
      .exec();

    await this.populatePrescription(updatedPrescription);
    return updatedPrescription;
  }

  async refill(id: string) {
    const prescription = await this.prescriptionModel.findById(id).exec();
    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (!prescription.isRefillable) {
      throw new BadRequestException('Prescription is not refillable');
    }

    if (prescription.refillCount >= 3) {
      throw new BadRequestException('Maximum refill limit reached');
    }

    const updatedPrescription = await this.prescriptionModel
      .findByIdAndUpdate(
        id,
        {
          $inc: { refillCount: 1 },
          isDispensed: false,
          dispensedAt: undefined,
          dispensedBy: undefined,
        },
        { new: true }
      )
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId')
      .exec();

    await this.populatePrescription(updatedPrescription);

    // Send notification
    await this.notificationsService.create({
      userId: prescription.patientId,
      type: 'prescription_ready' as any,
      title: 'Prescription Refilled',
      message: 'Your prescription has been refilled',
      data: { prescriptionId: prescription._id },
    });

    return updatedPrescription;
  }

  async getPatientPrescriptions(patientId: string) {
    return this.findAll({ patientId });
  }

  async getDoctorPrescriptions(doctorId: string) {
    return this.findAll({ doctorId });
  }

  async getRecentPrescriptions(patientId: string, limit: number = 5) {
    const prescriptions = await this.prescriptionModel
      .find({ patientId })
      .populate('patientId', 'userId')
      .populate('doctorId', 'userId')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    for (const prescription of prescriptions) {
      await this.populatePrescription(prescription);
    }

    return prescriptions;
  }

  private async populatePrescription(prescription: any) {
    if (prescription.patientId && prescription.patientId.userId) {
      const patientUser = await this.userModel.findById(prescription.patientId.userId).exec();
      prescription.patientUser = patientUser;
    }

    if (prescription.doctorId && prescription.doctorId.userId) {
      const doctorUser = await this.userModel.findById(prescription.doctorId.userId).exec();
      prescription.doctorUser = doctorUser;
    }
  }
}
