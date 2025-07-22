import React from "react";

export default function UploadCard() {
  return (
    <div className="col-span-2 bg-blue-100 border border-blue-200 rounded-xl shadow-sm p-8 flex flex-col h-full transition-opacity duration-500 opacity-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl md:text-4xl font-semibold text-blue-800">Upload Lab Test</h3>
      </div>

      <div className="text-lg text-gray-700 mb-6">
        <p className="mb-0">
          Share your lab test results with our community and get free access to all premium features.
        </p>
      </div>

      {/* Requirements Title and Checklist OUTSIDE white card */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Lab Test Requirements:</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Must be from an ISO 17025 certified laboratory</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Test must be conducted within the last 12 months</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Must be for a dietary supplement product</span>
          </div>
        </div>
      </div>

      {/* Upload box */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-lg font-medium text-gray-700 mb-2">Drop your lab test file here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 italic">
          <strong>Disclaimer:</strong> We may reject test submissions and free access at our sole discretion.
        </p>
      </div>

      <div className="mt-auto">
        <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold text-lg hover:bg-blue-700 transition-colors">
          Upload & Get Free Access
        </button>
      </div>
    </div>
  );
}