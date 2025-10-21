import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Video, 
  MapPin,
  Plus,
  Filter,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  FileText,
  Download
} from "lucide-react";

const AppointmentsContent = () => {
  const { user } = useAuth();
  const userRole = user?.role || "Patient";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("list"); // list, calendar, grid
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from API
  const getRoleSpecificData = () => {
    switch (userRole) {
      case "Administrator":
        return {
          title: "System Appointments",
          description: "Manage all system appointments and scheduling",
          appointments: [
            {
              id: 1,
              patient: "John Smith",
              doctor: "Dr. Sarah Johnson",
              date: "2024-01-20",
              time: "10:00 AM",
              duration: "30 min",
              type: "Consultation",
              status: "confirmed",
              notes: "Follow-up appointment"
            },
            {
              id: 2,
              patient: "Jane Doe",
              doctor: "Dr. Michael Brown",
              date: "2024-01-20",
              time: "2:00 PM",
              duration: "45 min",
              type: "Surgery",
              status: "pending",
              notes: "Pre-operative consultation"
            }
          ]
        };
      case "Doctor":
        return {
          title: "My Appointments",
          description: "Manage your patient appointments and schedule",
          appointments: [
            {
              id: 1,
              patient: "John Smith",
              patientPhone: "+1 (555) 123-4567",
              date: "2024-01-20",
              time: "10:00 AM",
              duration: "30 min",
              type: "Consultation",
              status: "confirmed",
              notes: "Follow-up appointment for hypertension",
              symptoms: "High blood pressure, headaches"
            },
            {
              id: 2,
              patient: "Jane Doe",
              patientPhone: "+1 (555) 987-6543",
              date: "2024-01-20",
              time: "2:00 PM",
              duration: "45 min",
              type: "Surgery",
              status: "pending",
              notes: "Pre-operative consultation",
              symptoms: "Chest pain, shortness of breath"
            },
            {
              id: 3,
              patient: "Bob Wilson",
              patientPhone: "+1 (555) 456-7890",
              date: "2024-01-21",
              time: "9:00 AM",
              duration: "20 min",
              type: "Check-up",
              status: "confirmed",
              notes: "Annual physical examination",
              symptoms: "Routine check-up"
            }
          ]
        };
      case "Patient":
        return {
          title: "My Appointments",
          description: "View and manage your healthcare appointments",
          appointments: [
            {
              id: 1,
              doctor: "Dr. Sarah Johnson",
              doctorSpecialty: "Cardiologist",
              date: "2024-01-20",
              time: "10:00 AM",
              duration: "30 min",
              type: "Consultation",
              status: "confirmed",
              location: "Main Clinic, Room 205",
              notes: "Follow-up appointment for heart condition"
            },
            {
              id: 2,
              doctor: "Dr. Michael Brown",
              doctorSpecialty: "General Practitioner",
              date: "2024-01-22",
              time: "3:00 PM",
              duration: "45 min",
              type: "Check-up",
              status: "pending",
              location: "Main Clinic, Room 101",
              notes: "Annual physical examination"
            }
          ]
        };
      default:
        return {
          title: "Appointments",
          description: "Manage appointments",
          appointments: []
        };
    }
  };

  const data = getRoleSpecificData();

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      confirmed: CheckCircle,
      pending: Clock,
      cancelled: XCircle,
      completed: CheckCircle
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const filteredAppointments = data.appointments.filter(appointment =>
    (userRole === "Patient" ? appointment.doctor : appointment.patient)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          {data.title}
        </h1>
        <p className="text-gray-600">
          {data.description}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${userRole === "Patient" ? "doctors" : "patients"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </button>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-2 text-sm ${viewMode === "calendar" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"}`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"}`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {userRole === "Administrator" ? "All Appointments" : 
                 userRole === "Doctor" ? "Today's Schedule" : "Upcoming Appointments"}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => {
                const StatusIcon = getStatusIcon(appointment.status);
                return (
                  <div
                    key={appointment.id}
                    className="p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {userRole === "Patient" ? appointment.doctor : appointment.patient}
                            </h4>
                            {userRole === "Patient" && (
                              <p className="text-sm text-gray-600">{appointment.doctorSpecialty}</p>
                            )}
                            {userRole === "Doctor" && (
                              <p className="text-sm text-gray-600">{appointment.patientPhone}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.duration}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{appointment.notes}</p>
                        {userRole === "Doctor" && appointment.symptoms && (
                          <p className="text-sm text-red-600">
                            <strong>Symptoms:</strong> {appointment.symptoms}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {appointment.status}
                        </span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {selectedAppointment ? (
            <>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Appointment Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Patient/Doctor</label>
                    <p className="text-gray-900">
                      {userRole === "Patient" ? selectedAppointment.doctor : selectedAppointment.patient}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Date</label>
                      <p className="text-gray-900">{selectedAppointment.date}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Time</label>
                      <p className="text-gray-900">{selectedAppointment.time}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Duration</label>
                      <p className="text-gray-900">{selectedAppointment.duration}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Type</label>
                      <p className="text-gray-900">{selectedAppointment.type}</p>
                    </div>
                  </div>
                  {selectedAppointment.location && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedAppointment.location}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-medium text-gray-900 mb-3">Notes</h4>
                <p className="text-gray-600 mb-4">{selectedAppointment.notes}</p>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <FileText className="w-4 h-4 mr-2" />
                    View Records
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select an appointment
              </h3>
              <p className="text-gray-600">
                Choose an appointment from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsContent;
