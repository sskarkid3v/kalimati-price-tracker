"use client";

import { useState, useMemo } from 'react';
import TrendChart from './TrendChart';
import { Search, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { getEnglishName, searchMatches } from '@/data/translations';

type TrendData = {
  date: string;
  avg_price: number | null;
  min_price: number | null;
  max_price: number | null;
  name: string;
};

type ItemSummary = {
  name: string;
  name_en: string;
  unit: string;
  current_price: number;
  previous_price: number;
  price_diff: number;
  price_pct: number;
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
      const current = trends[trends.length - 1];
      const previous = trends.length > 1 ? trends[trends.length - 2] : null;
      
      const current_price = current?.avg_price || 0;
      const previous_price = previous?.avg_price || current_price;
      const price_diff = current_price - previous_price;
      const price_pct = previous_price !== 0 ? (price_diff / previous_price) * 100 : 0;
      
      summaries.push({
        name,
        name_en: getEnglishName(name),
        unit: "kg",
        current_price,
        previous_price,
        price_diff,
        price_pct,
        trends
      });
    }
    
    // Sort alphabetically by English name for easier browsing
    return summaries.sort((a, b) => a.name_en.localeCompare(b.name_en));
  }, [rawData]);

  const filteredItems = items.filter((p) => {
    if (!search) return true;
    return searchMatches(p.name, search);
  });

  const totalItems = filteredItems.length;
  const pricesUp = filteredItems.filter(i => i.price_diff > 0).length;
  const pricesDown = filteredItems.filter(i => i.price_diff < 0).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Search bar */}
      <div className="relative max-w-xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search in English or नेपालीमा..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-base"
        />
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-center gap-6 text-sm font-medium text-gray-500">
        <span>{totalItems} items</span>
        <span className="flex items-center gap-1 text-red-500">
          <TrendingUp size={14} /> {pricesUp} up
        </span>
        <span className="flex items-center gap-1 text-green-600">
          <TrendingDown size={14} /> {pricesDown} down
        </span>
      </div>
      
      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No vegetables found matching &ldquo;{search}&rdquo;</p>
            <p className="text-gray-400 text-sm mt-1">Try searching in English or Nepali</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedItem === item.name;
            const isUp = item.price_diff > 0;
            const isDown = item.price_diff < 0;
            
            return (
              <div 
                key={item.name} 
                className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isExpanded 
                    ? 'ring-2 ring-green-400 border-transparent shadow-lg col-span-1 sm:col-span-2 lg:col-span-3' 
                    : 'border-gray-100 shadow-sm hover:shadow-md hover:border-green-200'
                }`}
              >
                {/* Card header */}
                <button 
                  className="w-full p-4 flex justify-between items-center text-left cursor-pointer"
                  onClick={() => setExpandedItem(isExpanded ? null : item.name)}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-base truncate">
                        {item.name_en || item.name}
                      </h3>
                      {item.name_en && (
                        <span className="text-xs text-gray-400 font-normal truncate">
                          {item.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xl font-extrabold text-gray-900">
                        Rs. {item.current_price}
                      </span>
                      
                      {isUp && (
                        <span className="inline-flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-xs font-semibold gap-0.5">
                          <TrendingUp size={12} />
                          +{item.price_pct.toFixed(1)}%
                        </span>
                      )}
                      {isDown && (
                        <span className="inline-flex items-center text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-semibold gap-0.5">
                          <TrendingDown size={12} />
                          {item.price_pct.toFixed(1)}%
                        </span>
                      )}
                      {!isUp && !isDown && (
                        <span className="inline-flex items-center text-gray-400 text-xs font-medium gap-0.5">
                          <Minus size={12} />
                          0%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`ml-2 p-1.5 rounded-full transition-colors ${isExpanded ? 'bg-green-100 text-green-600' : 'text-gray-300'}`}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                
                {/* Expanded chart area */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 p-4 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        30-Day Price Trend
                      </h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Min: <strong className="text-gray-700">Rs. {Math.min(...item.trends.map(t => t.min_price || 0))}</strong></span>
                        <span>Max: <strong className="text-gray-700">Rs. {Math.max(...item.trends.map(t => t.max_price || 0))}</strong></span>
                      </div>
                    </div>
                    <div className="h-56 md:h-72 w-full">
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
