const ReviewConfirm = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Review & Confirm
          </h2>
          <p className="text-lg text-gray-600">
            Double-check your appointment details before booking
          </p>
        </div>

        {/* Summary Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Selected Doctor:</span>
                <p className="font-bold text-gray-800">Dr. Sarah Ahmed</p>
              </div>
              <div>
                <span className="text-gray-600">Date & Time:</span>
                <p className="font-bold text-gray-800">March 15, 2024 - 10:00 AM</p>
              </div>
              <div>
                <span className="text-gray-600">Consultation Type:</span>
                <p className="font-bold text-gray-800">In-person</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Patient Name:</span>
                <p className="font-bold text-gray-800">John Doe</p>
              </div>
              <div>
                <span className="text-gray-600">Contact:</span>
                <p className="font-bold text-gray-800">+1 (555) 123-4567</p>
              </div>
              <div>
                <span className="text-gray-600">Uploaded Files:</span>
                <p className="font-bold text-gray-800">1 document</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-4">
              Book Appointment Now
            </button>
            <div>
              <button className="text-gray-600 hover:text-gray-800 underline">
                Cancel or Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewConfirm;
