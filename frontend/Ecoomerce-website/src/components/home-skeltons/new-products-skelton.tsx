import React from "react";

const NewProductsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
          <div>
            <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-56 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-lg border overflow-hidden"
          >
            {/* Image */}
            <div className="aspect-square bg-gray-200"></div>

            {/* Details */}
            <div className="p-3">
              <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>

              <div className="h-3 w-16 bg-gray-200 rounded mb-3"></div>

              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProductsSkeleton;
