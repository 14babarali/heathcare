import { Pill } from "lucide-react";
import { useState, useEffect } from "react";
import { prescriptionService } from "@/services/prescriptionService";

interface Prescription {
  id: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  validUntil: string;
  status: string;
  createdAt: string;
  doctor: {
    name: string;
    specialty: string;
  };
}

const PrescriptionRow = ({ prescription, onRefill }: { prescription: Prescription; onRefill: (id: string) => void }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLastRefillDate = (createdAt: string) => {
    return `Last Refill: ${formatDate(createdAt)}`;
  };

  return (
    <div className="space-y-2">
      {prescription.medications.map((medication, index) => (
        <div key={index} className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-blue-600">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{medication.name}</p>
              <p className="text-xs text-gray-500">{medication.frequency} • {getLastRefillDate(prescription.createdAt)}</p>
            </div>
          </div>
          <button 
            onClick={() => onRefill(prescription.id)}
            className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-3 py-2 rounded-md"
          >
            Refill
          </button>
        </div>
      ))}
    </div>
  );
};

export default function RecentPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPrescriptions = async () => {
      try {
        setLoading(true);
        const data = await prescriptionService.getRecentPrescriptions(5);
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching recent prescriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPrescriptions();
  }, []);

  const handleRefill = async (prescriptionId: string) => {
    try {
      await prescriptionService.refillPrescription(prescriptionId);
      // Refresh the prescriptions list
      const data = await prescriptionService.getRecentPrescriptions(5);
      setPrescriptions(data);
    } catch (error) {
      console.error('Error refilling prescription:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Prescriptions</h3>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between bg-blue-50 rounded-lg p-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Prescriptions</h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No recent prescriptions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Prescriptions</h3>
      <div className="space-y-3">
        {prescriptions.map((prescription) => (
          <PrescriptionRow 
            key={prescription.id} 
            prescription={prescription} 
            onRefill={handleRefill}
          />
        ))}
      </div>
    </div>
  );
}
