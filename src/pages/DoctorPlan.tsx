import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import StatCards from "@/components/doctor-plan/StatCards";
import UpcomingAppointmentsTable from "@/components/doctor-plan/UpcomingAppointmentsTable";
import RecentMessagesCard from "@/components/doctor-plan/RecentMessagesCard";
import QuickNotesCard from "@/components/doctor-plan/QuickNotesCard";
import MiniCalendar from "@/components/doctor-plan/MiniCalendar";
import PatientFeedbackList from "@/components/doctor-plan/PatientFeedbackList";
import { useState, useEffect } from "react";

export default function DoctorPlan() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-white flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="flex-shrink-0">
        <AdminSidebar 
          isOpen={isSidebarOpen}
          onToggle={handleMenuToggle}
          isMobile={isMobile}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <AdminHeader 
            onMenuToggle={handleMenuToggle}
            isMobile={isMobile}
          />
        </div>
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-4 lg:space-y-6">
            <StatCards />
            <UpcomingAppointmentsTable />
            <RecentMessagesCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <QuickNotesCard />
              <MiniCalendar />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <PatientFeedbackList />
              <PatientFeedbackList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
