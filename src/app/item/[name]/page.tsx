import { supabase } from '@/lib/supabase';
import TrendChart from '@/components/TrendChart';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

export default async function ItemPage(props: { params: Promise<{ name: string }> }) {
  const params = await props.params;
  const decodedName = decodeURIComponent(params.name);

  const { data: trends, error } = await supabase
    .from('price_trends')
    .select('*')
    .eq('name', decodedName)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching trend:', error);
  }

  // Get the most recent price to show current status
  const currentPrice = trends && trends.length > 0 ? trends[trends.length - 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all prices
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{decodedName}</h1>
          
          {currentPrice ? (
            <div className="flex gap-6 mt-4">
              <div className="bg-green-50 px-4 py-3 rounded-lg border border-green-100">
                <span className="text-sm text-green-800 block mb-1">Latest Average</span>
                <span className="text-2xl font-bold text-green-700">Rs. {currentPrice.avg_price}</span>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-600 block mb-1">Range</span>
                <span className="text-lg font-medium text-gray-700">Rs. {currentPrice.min_price} - {currentPrice.max_price}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No current price data available.</p>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">30-Day Price Trend</h2>
        <TrendChart data={trends || []} />
      </div>
    </main>
  );
}
