import { Bell } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, Admin 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your clinic today
          </p>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          
          {/* Profile Picture */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              alt="Dr. Sarah Johnson"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          
          {/* User Info */}
          <div>
            <p className="font-semibold text-gray-800">Dr. Sarah Johnson</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
