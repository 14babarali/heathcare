import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import NextAppointmentCard from "@/components/patient-panel/NextAppointmentCard";
import MyDoctorsGrid from "@/components/patient-panel/MyDoctorsGrid";
import RecentPrescriptions from "@/components/patient-panel/RecentPrescriptions";
import UpcomingReminders from "@/components/patient-panel/UpcomingReminders";

export default function PatientPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <NextAppointmentCard />
            <MyDoctorsGrid />
            <RecentPrescriptions />
            <UpcomingReminders />
          </div>
        </main>
      </div>
    </div>
  );
}
