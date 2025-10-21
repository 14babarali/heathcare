import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import MetricCards from "@/components/Admin/MetricCards";
import ChartsSection from "@/components/Admin/ChartsSection";
import RecentAppointments from "@/components/Admin/RecentAppointments";
import QuickActions from "@/components/Admin/QuickActions";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
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
    <div className="h-screen bg-gray-50 flex overflow-hidden">
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
          {/* Metric Cards */}
          <MetricCards />
          
          {/* Charts Section */}
          <div className="mt-6 lg:mt-8">
            <ChartsSection />
          </div>
          
          {/* Bottom Section */}
          <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <RecentAppointments />
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
}
