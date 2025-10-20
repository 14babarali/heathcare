import { MessageSquare } from "lucide-react";

export default function RecentMessagesCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Messages</h3>
      <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">P</div>
        <div className="flex-1">
          <p className="text-sm text-gray-800"><span className="font-medium">Patient:</span> John sent latest result</p>
          <p className="text-xs text-gray-500">2 minutes ago</p>
        </div>
        <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700">Reply</button>
      </div>
    </div>
  );
}
