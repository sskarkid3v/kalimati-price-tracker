import { supabase } from '@/lib/supabase';
import PriceTable from '@/components/PriceTable';
import Link from 'next/link';
import { ArrowRightLeft } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const { data: prices, error } = await supabase
    .from('today_prices')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching prices:', error);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Kalimati Price Tracker</h1>
            <p className="text-gray-600 mt-1">Daily wholesale vegetable and fruit prices in Nepal</p>
          </div>
          
          <Link 
            href="/compare" 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-700 font-medium"
          >
            <ArrowRightLeft size={18} />
            Compare Items
          </Link>
        </header>

        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            Failed to load prices. Please ensure Supabase is configured correctly.
          </div>
        ) : (
          <PriceTable initialPrices={prices || []} />
        )}
      </div>
    </main>
  );
}
