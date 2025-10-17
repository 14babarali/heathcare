import { Upload, X, FileText } from "lucide-react";

const ProblemDescription = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#F0F7FF' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Tell Us What's Wrong
          </h2>
          <p className="text-lg text-gray-600">
            Describe your symptoms and upload any relevant documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card - Problem Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Problem Description
            </h3>
            
            {/* Main Description */}
            <div className="mb-6">
              <textarea
                placeholder="Describe your symptoms, duration, or any discomfort you're feeling..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Note to Doctor */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Note to Doctor (optional)
              </label>
              <textarea
                placeholder="Any details you want your doctor to know before the appointment?"
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Right Card - Upload Files */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Files
            </h3>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-4 hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Upload X-rays, Reports, or Images
              </p>
              <p className="text-gray-500 mb-2">
                Drag and drop files here or click to browse
              </p>
              <p className="text-sm text-gray-400">
                Accepted formats: JPG, PNG, PDF (Max 10MB each)
              </p>
            </div>

            {/* Uploaded Files List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      blood-test-results.pdf
                    </p>
                    <p className="text-xs text-gray-500">2.4 MB</p>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Doctor Illustration */}
            <div className="mt-4">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Doctor reviewing X-ray"
                className="w-full h-32 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemDescription;
