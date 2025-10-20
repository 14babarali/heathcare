import { Pill } from "lucide-react";

const PrescriptionRow = ({ name, dose, date }: { name: string; dose: string; date: string }) => (
  <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-blue-600">
        <Pill className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{dose} • {date}</p>
      </div>
    </div>
    <button className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-2 rounded-md">Refill</button>
  </div>
);

export default function RecentPrescriptions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Prescriptions</h3>
      <div className="space-y-3">
        <PrescriptionRow name="Ulsinapril 10mg" dose="1x Daily" date="Last Refill: Oct 10, 2024" />
        <PrescriptionRow name="Metformin 500mg" dose="2x Daily" date="Last Refill: Oct 01, 2024" />
      </div>
    </div>
  );
}
