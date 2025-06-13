import React from "react";

const CardsSkeleton = () => {
  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md animate-pulse flex flex-col"
        >
          <div className="h-52 bg-gray-200 rounded-t-2xl" />

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
              <div className="h-3 bg-gray-300 rounded mb-2 w-1/4" />
              <div className="h-6 bg-gray-300 rounded mb-4 w-1/2" />
            </div>
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded-xl" />
              <div className="h-10 bg-gray-300 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSkeleton;
