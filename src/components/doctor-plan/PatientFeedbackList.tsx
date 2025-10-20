import { Star } from "lucide-react";

const FeedbackCard = ({ name, text }: { name: string; text: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h4 className="text-sm font-semibold text-gray-800 mb-2">Patient Feedback</h4>
      <div className="flex items-center text-yellow-400 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-gray-700 mb-2">{text}</p>
      <p className="text-xs text-gray-500">{name}</p>
    </div>
  );
};

export default function PatientFeedbackList() {
  return (
    <FeedbackCard name="John Carter" text="Excellent care and very professional!" />
  );
}
