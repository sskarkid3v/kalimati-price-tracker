"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type TrendData = {
  date: string;
  avg_price: number | null;
  min_price: number | null;
  max_price: number | null;
};

export default function TrendChart({ data }: { data: TrendData[] }) {
  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-white rounded-lg border">No trend data available for the last 30 days.</div>;
  }

  // Format date for display
  const formattedData = data.map(d => ({
    ...d,
    displayDate: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="displayDate" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickFormatter={(value) => `Rs ${value}`}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            type="monotone" 
            dataKey="avg_price" 
            name="Average Price" 
            stroke="#16a34a" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="min_price" 
            name="Min Price" 
            stroke="#93c5fd" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="max_price" 
            name="Max Price" 
            stroke="#fca5a5" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
