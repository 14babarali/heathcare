const ChartsSection = () => {
  const appointmentData = [
    { day: "Mon", value: 12 },
    { day: "Tue", value: 19 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 25 },
    { day: "Fri", value: 22 },
    { day: "Sat", value: 18 },
    { day: "Sun", value: 14 },
  ];

  const maxValue = 30;
  const minValue = 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Appointments Trend - Line Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Appointments Trend</h3>
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
            <span>30</span>
            <span>25</span>
            <span>20</span>
            <span>15</span>
            <span>10</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-8 mr-4 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[10, 15, 20, 25, 30].map((value) => (
                <div
                  key={value}
                  className="absolute w-full border-t border-gray-100"
                  style={{
                    bottom: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
                  }}
                />
              ))}
            </div>
            
            {/* Line chart */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Line path */}
              <path
                d={`M 0,${200 - ((appointmentData[0].value - minValue) / (maxValue - minValue)) * 200} 
                    L 66.67,${200 - ((appointmentData[1].value - minValue) / (maxValue - minValue)) * 200}
                    L 133.33,${200 - ((appointmentData[2].value - minValue) / (maxValue - minValue)) * 200}
                    L 200,${200 - ((appointmentData[3].value - minValue) / (maxValue - minValue)) * 200}
                    L 266.67,${200 - ((appointmentData[4].value - minValue) / (maxValue - minValue)) * 200}
                    L 333.33,${200 - ((appointmentData[5].value - minValue) / (maxValue - minValue)) * 200}
                    L 400,${200 - ((appointmentData[6].value - minValue) / (maxValue - minValue)) * 200}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              
              {/* Data points */}
              {appointmentData.map((item, index) => (
                <circle
                  key={index}
                  cx={index * 66.67}
                  cy={200 - ((item.value - minValue) / (maxValue - minValue)) * 200}
                  r="4"
                  fill="#3b82f6"
                />
              ))}
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-8 right-4 flex justify-between text-xs text-gray-500">
            {appointmentData.map((item, index) => (
              <span key={index}>{item.day}</span>
            ))}
          </div>
          
          {/* Y-axis label */}
          <div className="absolute left-0 top-1/2 transform -rotate-90 -translate-y-1/2 text-xs text-gray-500">
            Appointments
          </div>
        </div>
      </div>

      {/* Patient Demographics - Donut Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Demographics</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              {/* Adults (45%) - Dark blue */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1e40af"
                strokeWidth="8"
                strokeDasharray={`${45 * 2.51} 251`}
                strokeDashoffset="0"
              />
              {/* Seniors (30%) - Light blue */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="8"
                strokeDasharray={`${30 * 2.51} 251`}
                strokeDashoffset={`-${45 * 2.51}`}
              />
              {/* Children (25%) - Medium blue */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="8"
                strokeDasharray={`${25 * 2.51} 251`}
                strokeDashoffset={`-${75 * 2.51}`}
              />
            </svg>
          </div>
        </div>
        
        {/* Legend with proper positioning */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-800 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Adults (18-65): 45.0%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-300 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Seniors (65+): 30.0%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full mr-3"></div>
            <span className="text-sm text-gray-600">Children (0-18): 25.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
