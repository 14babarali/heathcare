import { CalendarClock, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { appointmentService } from "@/services/appointmentService";
import { doctorService } from "@/services/doctorService";

interface NextAppointment {
  id: string;
  doctorId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  doctor?: {
    id: string;
    name: string;
    specialty: string;
    avatar?: string;
  };
}

export default function NextAppointmentCard() {
  const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextAppointment = async () => {
      try {
        setLoading(true);
        const appointments = await appointmentService.getUpcomingAppointments();
        if (appointments && appointments.length > 0) {
          const nextAppt = appointments[0];
          // Fetch doctor details
          const doctor = await doctorService.getDoctor(nextAppt.doctorId);
          setNextAppointment({
            ...nextAppt,
            doctor: {
              id: doctor.id,
              name: doctor.name,
              specialty: doctor.specialty,
              avatar: doctor.avatar
            }
          });
        }
      } catch (error) {
        console.error('Error fetching next appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextAppointment();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!nextAppointment) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Next Appointment</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No upcoming appointments</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Next Appointment</h3>
        <button className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-2 rounded-md">View Details</button>
      </div>
      <div className="flex items-center gap-4">
        <img 
          src={nextAppointment.doctor?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"} 
          className="w-12 h-12 rounded-lg object-cover" 
          alt={nextAppointment.doctor?.name}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{nextAppointment.doctor?.name}</p>
          <p className="text-xs text-gray-500">{nextAppointment.doctor?.specialty}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
              <CalendarClock className="w-3 h-3 mr-1" /> {formatTime(nextAppointment.startTime)}, {formatDate(nextAppointment.appointmentDate)}
            </span>
            <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700">
              <BadgeCheck className="w-3 h-3 mr-1" /> {nextAppointment.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
