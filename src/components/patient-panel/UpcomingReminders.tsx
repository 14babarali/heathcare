const Reminder = ({ text, color, time }: { text: string; color: string; time: string }) => (
  <div className={`flex items-center justify-between rounded-lg p-3 ${color}`}>
    <span className="text-sm text-gray-800">{text}</span>
    <span className="text-xs text-gray-600">{time}</span>
  </div>
);

export default function UpcomingReminders() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Upcoming Reminders</h3>
      <div className="space-y-3">
        <Reminder text="Medication Reminder" color="bg-blue-50" time="Today, 8:00 PM" />
        <Reminder text="Schedule Blood Test" color="bg-green-50" time="Tomorrow, 9:00 AM" />
        <Reminder text="Lab Results Ready" color="bg-yellow-50" time="Oct 20, 11:00 AM" />
      </div>
    </div>
  );
}
