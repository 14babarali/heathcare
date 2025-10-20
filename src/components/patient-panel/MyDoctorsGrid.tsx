import { Star } from "lucide-react";

const DoctorCard = ({ name, role, rating, avatar }: { name: string; role: string; rating: number; avatar: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
    <img src={avatar} className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
    <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
    <p className="text-xs text-gray-500 mb-2">{role}</p>
    <div className="flex items-center justify-center text-yellow-400 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-yellow-400' : ''}`} />
      ))}
      <span className="ml-2 text-xs text-gray-600">{rating}</span>
    </div>
    <button className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-2 rounded-md">Book Appointment</button>
  </div>
);

export default function MyDoctorsGrid() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center mb-3">
        <div className="w-24 text-blue-700 font-semibold text-sm transform -rotate-90 origin-left hidden sm:block">My Doctors</div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DoctorCard name="Dr. Michael Chen" role="Neurologist" rating={4.8} avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
          <DoctorCard name="Dr. Emily Rodriguez" role="Dermatologist" rating={4.6} avatar="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face" />
          <DoctorCard name="Dr. James Wilson" role="Orthopedics" rating={4.5} avatar="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face" />
        </div>
      </div>
    </div>
  );
}
