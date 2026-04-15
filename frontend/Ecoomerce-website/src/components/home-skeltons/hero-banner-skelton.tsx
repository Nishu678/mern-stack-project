import React from 'react'

const HeroBannerSkelton = () => {
    return (
        <div className="container mx-auto px-4 py-12 animate-pulse">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <div className="h-8 w-64 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>

                {/* Navigation */}
                <div className="flex space-x-2">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                </div>
            </div>

            {/* Scrollable Categories */}
            <div className="relative">
                <div
                    className="flex space-x-6 overflow-hidden"
                >
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-64 rounded-xl overflow-hidden"
                        >
                            <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 ">

                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroBannerSkelton