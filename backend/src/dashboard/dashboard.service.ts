import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Doctor, DoctorDocument } from '../doctors/schemas/doctor.schema';
import { Patient, PatientDocument } from '../patients/schemas/patient.schema';
import { Appointment, AppointmentDocument } from '../appointments/schemas/appointment.schema';
import { Prescription, PrescriptionDocument } from '../prescriptions/schemas/prescription.schema';
import { Message, MessageDocument } from '../messages/schemas/message.schema';
import { Notification, NotificationDocument } from '../notifications/schemas/notification.schema';
import { AppointmentStatus } from '../common/enums/appointment-status.enum';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Prescription.name) private prescriptionModel: Model<PrescriptionDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async getAdminDashboard() {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      upcomingAppointments,
      recentAppointments,
      newMessages,
    ] = await Promise.all([
      this.userModel.countDocuments({ role: UserRole.PATIENT, isActive: true }),
      this.userModel.countDocuments({ role: UserRole.DOCTOR, isActive: true }),
      this.appointmentModel.countDocuments(),
      this.appointmentModel.countDocuments({
        appointmentDate: { $gte: new Date() },
        status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
      }),
      this.appointmentModel
        .find()
        .populate({
          path: 'patientId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .populate({
          path: 'doctorId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .exec(),
      this.messageModel.countDocuments({ isRead: false }),
    ]);

    // Get appointment statistics
    const appointmentStats = await this.appointmentModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get monthly appointment trends
    const monthlyTrends = await this.appointmentModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    // Get daily appointment trends for the last 7 days
    const dailyTrends = await this.appointmentModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: '$createdAt' },
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.date': 1 },
      },
    ]);

    return {
      metrics: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        upcomingAppointments,
        newMessages,
      },
      appointmentStats,
      monthlyTrends,
      dailyTrends,
      recentAppointments,
    };
  }

  async getDoctorDashboard(doctorId: string) {
    const [
      totalAppointments,
      completedAppointments,
      pendingAppointments,
      cancelledAppointments,
      upcomingAppointments,
      recentAppointments,
      unreadMessages,
    ] = await Promise.all([
      this.appointmentModel.countDocuments({ doctorId }),
      this.appointmentModel.countDocuments({ doctorId, status: AppointmentStatus.COMPLETED }),
      this.appointmentModel.countDocuments({ doctorId, status: AppointmentStatus.PENDING }),
      this.appointmentModel.countDocuments({ doctorId, status: AppointmentStatus.CANCELLED }),
      this.appointmentModel
        .find({
          doctorId,
          appointmentDate: { $gte: new Date() },
          status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
        })
        .populate({
          path: 'patientId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .sort({ appointmentDate: 1 })
        .limit(10)
        .exec(),
      this.appointmentModel
        .find({ doctorId })
        .populate({
          path: 'patientId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .exec(),
      this.messageModel.countDocuments({ recipientId: doctorId, isRead: false }),
    ]);

    // Get patient feedback (if you have a feedback system)
    const patientFeedback = await this.appointmentModel
      .find({ doctorId, status: AppointmentStatus.COMPLETED })
      .populate({
        path: 'patientId',
        populate: {
          path: 'userId',
          select: 'firstName lastName email'
        }
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();

    // Get daily appointment trends for the doctor for the last 7 days
    const dailyTrends = await this.appointmentModel.aggregate([
      {
        $match: {
          doctorId,
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: '$createdAt' },
            date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.date': 1 },
      },
    ]);

    return {
      metrics: {
        totalAppointments,
        completedAppointments,
        pendingAppointments,
        cancelledAppointments,
        unreadMessages,
      },
      dailyTrends,
      upcomingAppointments,
      recentAppointments,
      patientFeedback,
    };
  }

  async getPatientDashboard(patientId: string) {
    const [
      totalAppointments,
      upcomingAppointments,
      recentAppointments,
      recentPrescriptions,
      unreadMessages,
      unreadNotifications,
    ] = await Promise.all([
      this.appointmentModel.countDocuments({ patientId }),
      this.appointmentModel
        .find({
          patientId,
          appointmentDate: { $gte: new Date() },
          status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
        })
        .populate({
          path: 'doctorId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .sort({ appointmentDate: 1 })
        .limit(5)
        .exec(),
      this.appointmentModel
        .find({ patientId })
        .populate({
          path: 'doctorId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .exec(),
      this.prescriptionModel
        .find({ patientId })
        .populate({
          path: 'doctorId',
          populate: {
            path: 'userId',
            select: 'firstName lastName email'
          }
        })
        .sort({ createdAt: -1 })
        .limit(5)
        .exec(),
      this.messageModel.countDocuments({ recipientId: patientId, isRead: false }),
      this.notificationModel.countDocuments({ userId: patientId, isRead: false }),
    ]);

    // Get my doctors
    const myDoctors = await this.appointmentModel
      .distinct('doctorId', { patientId })
      .exec();

    const doctorsWithDetails = await Promise.all(
      myDoctors.map(async (doctorId) => {
        const doctor = await this.doctorModel.findById(doctorId).populate('userId').exec();
        return doctor;
      })
    );

    return {
      metrics: {
        totalAppointments,
        unreadMessages,
        unreadNotifications,
      },
      upcomingAppointments,
      recentAppointments,
      recentPrescriptions,
      myDoctors: doctorsWithDetails.filter(doctor => doctor !== null),
    };
  }

  async getDashboardData(userId: string, role: string) {
    switch (role) {
      case UserRole.ADMINISTRATOR:
        return this.getAdminDashboard();
      
      case UserRole.DOCTOR:
        const doctor = await this.doctorModel.findOne({ userId }).exec();
        if (!doctor) throw new Error('Doctor profile not found');
        return this.getDoctorDashboard(doctor._id.toString());
      
      case UserRole.PATIENT:
        const patient = await this.patientModel.findOne({ userId }).exec();
        if (!patient) throw new Error('Patient profile not found');
        return this.getPatientDashboard(patient._id.toString());
      
      default:
        throw new Error('Invalid user role');
    }
  }

  async getQuickStats() {
    const [
      totalUsers,
      totalAppointments,
      totalPrescriptions,
      totalMessages,
    ] = await Promise.all([
      this.userModel.countDocuments({ isActive: true }),
      this.appointmentModel.countDocuments(),
      this.prescriptionModel.countDocuments(),
      this.messageModel.countDocuments(),
    ]);

    return {
      totalUsers,
      totalAppointments,
      totalPrescriptions,
      totalMessages,
    };
  }
}
