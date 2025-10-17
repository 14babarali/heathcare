import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import MetricCards from "@/components/Admin/MetricCards";
import ChartsSection from "@/components/Admin/ChartsSection";
import RecentAppointments from "@/components/Admin/RecentAppointments";
import QuickActions from "@/components/Admin/QuickActions";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Metric Cards */}
          <MetricCards />
          
          {/* Charts Section */}
          <div className="mt-8">
            <ChartsSection />
          </div>
          
          {/* Bottom Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentAppointments />
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
}
