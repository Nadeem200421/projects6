"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function ShopDetailsPage() {
  const { id } = useParams();

  const shop = useSelector((state: RootState) =>
    state.data.shops.find((s) => s.id === id)
  );

  if (!shop) {
    return (
      <div className="py-10">
        <p className="text-red-500">Shop not found.</p>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {shop.name}
      </h1>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        📍 {shop.location} &nbsp; | &nbsp; 🕒 {shop.hours}
      </div>

      <p className="text-base leading-relaxed">
        {shop.description}
      </p>
    </div>
  );
}
