import { Calendar, ChevronDown } from "lucide-react";

const AppointmentDetails = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Appointment Details
          </h2>
          <p className="text-lg text-gray-600">
            Fill in your information to complete the booking
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-blue-600 rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white text-gray-700"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-white font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white text-gray-700"
                />
              </div>

              {/* Select Time */}
              <div>
                <label className="block text-white font-bold mb-2">
                  Select Time
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none bg-white text-gray-700">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="block text-white font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white text-gray-700"
                />
              </div>

              {/* Select Date */}
              <div>
                <label className="block text-white font-bold mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white text-gray-700"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Appointment Type */}
              <div>
                <label className="block text-white font-bold mb-2">
                  Appointment Type
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="appointmentType"
                      value="in-person"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-white font-medium">In-person</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="appointmentType"
                      value="online"
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-white font-medium">Online Consultation</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentDetails;
