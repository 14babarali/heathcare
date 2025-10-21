import { useState, useEffect } from "react";
import { notificationService } from "@/services/notificationService";

interface Reminder {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  scheduledFor: string;
  isRead: boolean;
}

const Reminder = ({ reminder }: { reminder: Reminder }) => {
  const getColorClass = (type: string, priority: string) => {
    if (priority === 'high') return 'bg-red-50 border-red-200';
    if (type === 'medication') return 'bg-blue-50 border-blue-200';
    if (type === 'appointment') return 'bg-green-50 border-green-200';
    if (type === 'lab') return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const reminderDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (reminderDate.getTime() === today.getTime()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else if (reminderDate.getTime() === tomorrow.getTime()) {
      return `Tomorrow, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    }
  };

  return (
    <div className={`flex items-center justify-between rounded-lg p-3 border ${getColorClass(reminder.type, reminder.priority)}`}>
      <span className="text-sm text-gray-800">{reminder.title}</span>
      <span className="text-xs text-gray-600">{formatTime(reminder.scheduledFor)}</span>
    </div>
  );
};

export default function UpcomingReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading(true);
        const data = await notificationService.getMyNotifications();
        // Filter for reminder type notifications
        const reminderData = data.filter((notification: any) => 
          notification.type === 'reminder' || 
          notification.type === 'appointment' ||
          notification.type === 'prescription'
        );
        setReminders(reminderData);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Reminders</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-lg p-3 bg-gray-50 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Reminders</h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No upcoming reminders</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Reminders</h3>
      <div className="space-y-3">
        {reminders.map((reminder) => (
          <Reminder key={reminder.id} reminder={reminder} />
        ))}
      </div>
    </div>
  );
}
