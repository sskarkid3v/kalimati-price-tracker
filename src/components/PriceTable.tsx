"use client";

import { useState } from 'react';
import Link from 'next/link';

type PriceRow = {
  id: number;
  name: string;
  name_np: string | null;
  unit: string;
  min_price: number | null;
  max_price: number | null;
  avg_price: number | null;
  date: string;
};

export default function PriceTable({ initialPrices }: { initialPrices: PriceRow[] }) {
  const [search, setSearch] = useState("");

  const filteredPrices = initialPrices.filter((p) => {
    const term = search.toLowerCase();
    return p.name.toLowerCase().includes(term) || (p.name_np && p.name_np.includes(term));
  });

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search vegetables (e.g., Potato, आलु)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-50 text-green-800">
              <th className="p-3 border-b font-semibold">Commodity</th>
              <th className="p-3 border-b font-semibold hidden sm:table-cell">Unit</th>
              <th className="p-3 border-b font-semibold text-right">Min (Rs.)</th>
              <th className="p-3 border-b font-semibold text-right">Max (Rs.)</th>
              <th className="p-3 border-b font-semibold text-right">Avg (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No vegetables found matching "{search}"
                </td>
              </tr>
            ) : (
              filteredPrices.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <Link href={`/item/${encodeURIComponent(p.name)}`} className="text-green-700 hover:underline font-medium block">
                      {p.name}
                      {p.name_np && <span className="text-sm text-gray-500 block">{p.name_np}</span>}
                    </Link>
                    <span className="text-xs text-gray-400 sm:hidden block mt-1">Unit: {p.unit}</span>
                  </td>
                  <td className="p-3 hidden sm:table-cell text-gray-600">{p.unit}</td>
                  <td className="p-3 text-right">{p.min_price}</td>
                  <td className="p-3 text-right">{p.max_price}</td>
                  <td className="p-3 text-right font-semibold">{p.avg_price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
