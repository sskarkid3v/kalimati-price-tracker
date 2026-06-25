"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Item = { name: string; name_np: string | null };
type TrendData = { date: string; [key: string]: string | number };

export default function CompareView() {
  const [items, setItems] = useState<Item[]>([]);
  const [item1, setItem1] = useState<string>('');
  const [item2, setItem2] = useState<string>('');
  const [chartData, setChartData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch unique item names
    async function fetchItems() {
      const { data } = await supabase
        .from('today_prices')
        .select('name, name_np')
        .order('name');
      if (data) setItems(data);
    }
    fetchItems();
  }, []);

  useEffect(() => {
    if (!item1 || !item2) return;
    
    async function fetchComparison() {
      setLoading(true);
      
      const { data: data1 } = await supabase
        .from('price_trends')
        .select('date, avg_price')
        .eq('name', item1)
        .order('date', { ascending: true });
        
      const { data: data2 } = await supabase
        .from('price_trends')
        .select('date, avg_price')
        .eq('name', item2)
        .order('date', { ascending: true });

      if (data1 && data2) {
        // Merge data by date
        const merged: Record<string, TrendData> = {};
        
        data1.forEach(d => {
          merged[d.date] = { date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), [item1]: d.avg_price };
        });
        
        data2.forEach(d => {
          if (!merged[d.date]) {
             merged[d.date] = { date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
          }
          merged[d.date][item2] = d.avg_price;
        });

        setChartData(Object.values(merged).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      }
      
      setLoading(false);
    }
    
    fetchComparison();
  }, [item1, item2]);

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to all prices
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Compare Vegetables</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item 1</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            value={item1} 
            onChange={e => setItem1(e.target.value)}
          >
            <option value="">Select first item...</option>
            {items.map(i => (
              <option key={i.name} value={i.name}>{i.name} {i.name_np ? `(${i.name_np})` : ''}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Item 2</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            value={item2} 
            onChange={e => setItem2(e.target.value)}
          >
            <option value="">Select second item...</option>
            {items.map(i => (
              <option key={i.name} value={i.name}>{i.name} {i.name_np ? `(${i.name_np})` : ''}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading comparison...</p>}
      
      {!loading && item1 && item2 && chartData.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} tickMargin={10} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `Rs ${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey={item1} stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey={item2} stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
