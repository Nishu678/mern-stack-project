"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Revenue",
    value: "$12,450",
    change: "+12%",
    icon: DollarSign,
    color: "text-green-600 bg-green-100",
  },
  {
    title: "Orders",
    value: "320",
    change: "+8%",
    icon: ShoppingCart,
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Customers",
    value: "1,200",
    change: "+5%",
    icon: Users,
    color: "text-purple-600 bg-purple-100",
  },
  {
    title: "Products",
    value: "85",
    change: "-2%",
    icon: Package,
    color: "text-orange-600 bg-orange-100",
  },
];

const UserCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <Card
          key={index}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 gap-0 py-0"
        >
          <CardContent className="p-5 flex flex-col gap-4">
            {/* Top Section */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.color}`}
              >
                <item.icon className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span
                className={`font-medium ${
                  item.change.includes("-") ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.change}
              </span>
              <span className="text-gray-400">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserCards;
