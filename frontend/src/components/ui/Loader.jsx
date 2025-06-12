import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-white">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin mb-4"
          width="48"
          height="48"
          viewBox="0 0 50 50"
        >
          <circle
            className="opacity-20"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
          />
          <path
            className="opacity-80"
            fill="#2563eb"
            d="M25 5a20 20 0 0 1 20 20h-4a16 16 0 0 0-16-16V5z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Ceylon Escape
        </h1>
        <p className="text-gray-600">Loading your adventure...</p>
      </div>
    </div>
  );
}