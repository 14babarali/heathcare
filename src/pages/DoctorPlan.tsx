import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import StatCards from "@/components/doctor-plan/StatCards";
import UpcomingAppointmentsTable from "@/components/doctor-plan/UpcomingAppointmentsTable";
import RecentMessagesCard from "@/components/doctor-plan/RecentMessagesCard";
import QuickNotesCard from "@/components/doctor-plan/QuickNotesCard";
import MiniCalendar from "@/components/doctor-plan/MiniCalendar";
import PatientFeedbackList from "@/components/doctor-plan/PatientFeedbackList";

export default function DoctorPlan() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <StatCards />
            <UpcomingAppointmentsTable />
            <RecentMessagesCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickNotesCard />
              <MiniCalendar />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientFeedbackList />
              <PatientFeedbackList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
