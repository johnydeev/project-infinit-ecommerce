import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md flex flex-col font-poppins relative animate-pulse transition-all duration-500">
      <div className="flex items-center justify-between p-4">
        <div className="w-1/2 bg-gray-300 h-12 animate-pulse"></div>
        <div className="flex flex-col items-end">
          <div className="flex items-start gap-1 font-bold text-lg">
            <div className="bg-gray-300 h-6 w-20 animate-pulse"></div>
            <div className="bg-gray-300 h-6 w-12 animate-pulse"></div>
          </div>
          <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="bg-gray-300 h-8 w-16 ml-4 animate-pulse"></div>
        <div className="bg-primary font-semibold text-white px-8 py-3 rounded-tl-2xl hover:bg-tertiary transition-all duration-300 ease-in-out">
          <div className="bg-gray-300 h-8 w-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
