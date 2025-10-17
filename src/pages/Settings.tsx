import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import ProfileInformation from "@/components/Settings/ProfileInformation";
import NotificationPreferences from "@/components/Settings/NotificationPreferences";
import DoctorSettings from "@/components/Settings/DoctorSettings";
import PrivacySecurity from "@/components/Settings/PrivacySecurity";
import HelpSupport from "@/components/Settings/HelpSupport";

export default function Settings() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader />
        
        {/* Settings Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
              <p className="text-gray-600">Customize your healthcare experience</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              <ProfileInformation />
              <NotificationPreferences />
              <DoctorSettings />
              <PrivacySecurity />
              <HelpSupport />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
