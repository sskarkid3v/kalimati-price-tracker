"use client";

import { useState, useMemo } from 'react';
import TrendChart from './TrendChart';
import { Search, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';

type TrendData = {
  date: string;
  avg_price: number | null;
  min_price: number | null;
  max_price: number | null;
  name: string;
};

type ItemSummary = {
  name: string;
  name_np: string | null;
  unit: string;
  current_price: number | null;
  previous_price: number | null;
  price_diff: number;
  trends: TrendData[];
};

export default function PriceList({ rawData }: { rawData: TrendData[] }) {
  const [search, setSearch] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Process raw trends data into grouped items
  const items = useMemo(() => {
    const grouped: Record<string, TrendData[]> = {};
    rawData.forEach(d => {
      if (!grouped[d.name]) grouped[d.name] = [];
      grouped[d.name].push(d);
    });

    const summaries: ItemSummary[] = [];
    
    for (const [name, trends] of Object.entries(grouped)) {
      // Data is ordered by date from supabase view
      const current = trends[trends.length - 1];
      const previous = trends.length > 1 ? trends[trends.length - 2] : null;
      
      const current_price = current?.avg_price || 0;
      const previous_price = previous?.avg_price || current_price;
      const price_diff = current_price - previous_price;
      
      summaries.push({
        name: name,
        name_np: name, // We don't have name_np in price_trends view easily unless joined, we'll fall back to name
        unit: "kg", // We'll hardcode or ignore unit for now, as price_trends lacks unit unless we add it
        current_price,
        previous_price,
        price_diff,
        trends
      });
    }
    
    return summaries;
  }, [rawData]);

  const filteredItems = items.filter((p) => {
    const term = search.toLowerCase();
    return p.name.toLowerCase().includes(term);
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative max-w-xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search vegetables..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors text-lg"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            No vegetables found matching "{search}"
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedItem === item.name;
            const isUp = item.price_diff > 0;
            const isDown = item.price_diff < 0;
            
            return (
              <div 
                key={item.name} 
                className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ${isExpanded ? 'ring-2 ring-green-500 border-transparent shadow-md' : 'border-gray-200 shadow-sm hover:border-green-300'}`}
              >
                <div 
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpandedItem(isExpanded ? null : item.name)}
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xl font-extrabold text-gray-900">Rs. {item.current_price}</span>
                      
                      {isUp && (
                        <div className="flex items-center text-red-500 bg-red-50 px-2 py-0.5 rounded text-sm font-medium">
                          <TrendingUp size={14} className="mr-1" />
                          +{item.price_diff.toFixed(2)}
                        </div>
                      )}
                      {isDown && (
                        <div className="flex items-center text-green-600 bg-green-50 px-2 py-0.5 rounded text-sm font-medium">
                          <TrendingDown size={14} className="mr-1" />
                          {item.price_diff.toFixed(2)}
                        </div>
                      )}
                      {!isUp && !isDown && (
                        <div className="flex items-center text-gray-400 text-sm font-medium">
                          <Minus size={14} className="mr-1" />
                          0.00
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">30-Day Trend</h4>
                    <div className="h-48 w-full">
                      <TrendChart data={item.trends} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
