import api from '@/lib/api';

// Mock data for development - role-specific
const getMockDashboardData = (userRole: string) => {
  switch (userRole) {
    case 'Administrator':
      return {
        metrics: {
          totalPatients: 156,
          totalDoctors: 12,
          totalAppointments: 89,
          upcomingAppointments: 23,
          newMessages: 7,
        },
        appointmentStats: [
          { _id: 'PENDING', count: 15 },
          { _id: 'CONFIRMED', count: 8 },
          { _id: 'COMPLETED', count: 45 },
          { _id: 'CANCELLED', count: 3 },
        ],
        monthlyTrends: [
          { _id: { year: 2024, month: 1 }, count: 12 },
          { _id: { year: 2024, month: 2 }, count: 18 },
          { _id: { year: 2024, month: 3 }, count: 22 },
        ],
        recentAppointments: [
          {
            _id: '1',
            patientId: { userId: { firstName: 'John', lastName: 'Doe' } },
            doctorId: { userId: { firstName: 'Dr. Smith', lastName: 'Johnson' } },
            appointmentDate: new Date(),
            status: 'PENDING',
          },
        ],
      };

    case 'Doctor':
      return {
        metrics: {
          totalAppointments: 45,
          completedAppointments: 32,
          pendingAppointments: 8,
          cancelledAppointments: 5,
          unreadMessages: 3,
        },
        upcomingAppointments: [
          {
            _id: '1',
            patientId: { userId: { firstName: 'Sarah', lastName: 'Wilson' } },
            appointmentDate: new Date(Date.now() + 3600000), // 1 hour from now
            status: 'CONFIRMED',
          },
          {
            _id: '2',
            patientId: { userId: { firstName: 'Mike', lastName: 'Brown' } },
            appointmentDate: new Date(Date.now() + 7200000), // 2 hours from now
            status: 'PENDING',
          },
        ],
        recentAppointments: [
          {
            _id: '1',
            patientId: { userId: { firstName: 'John', lastName: 'Doe' } },
            appointmentDate: new Date(Date.now() - 3600000),
            status: 'COMPLETED',
          },
        ],
      };

    case 'Patient':
      return {
        metrics: {
          totalAppointments: 8,
          unreadMessages: 2,
          unreadNotifications: 1,
        },
        upcomingAppointments: [
          {
            _id: '1',
            doctorId: { userId: { firstName: 'Dr. Smith', lastName: 'Johnson' } },
            appointmentDate: new Date(Date.now() + 86400000), // Tomorrow
            status: 'CONFIRMED',
          },
        ],
        recentPrescriptions: [
          {
            _id: '1',
            doctorId: { userId: { firstName: 'Dr. Smith', lastName: 'Johnson' } },
            medications: ['Paracetamol', 'Vitamin D'],
            createdAt: new Date(),
          },
        ],
        myDoctors: [
          {
            _id: '1',
            userId: { firstName: 'Dr. Smith', lastName: 'Johnson', specialty: 'Cardiology' },
          },
        ],
      };

    default:
      return {
        metrics: {
          totalPatients: 0,
          totalDoctors: 0,
          totalAppointments: 0,
          upcomingAppointments: 0,
          newMessages: 0,
        },
      };
  }
};

export const dashboardService = {
  async getDashboardData() {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      console.warn('Dashboard API not available, using mock data:', error);
      // Get user role from localStorage to provide role-specific mock data
      const userData = localStorage.getItem('app_auth_user');
      const user = userData ? JSON.parse(userData) : null;
      const userRole = user?.role || 'Administrator';
      return getMockDashboardData(userRole);
    }
  },

  async getQuickStats() {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.warn('Quick stats API not available, using mock data:', error);
      return {
        totalUsers: 168,
        totalAppointments: 89,
        totalPrescriptions: 45,
        totalMessages: 23,
      };
    }
  },
};
