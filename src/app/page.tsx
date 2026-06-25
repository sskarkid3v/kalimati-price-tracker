import { supabase } from '@/lib/supabase';
import PriceList from '@/components/PriceList';
import { Leaf } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const { data: trends, error } = await supabase
    .from('price_trends')
    .select('*')
    .order('name', { ascending: true })
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching prices:', error);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col items-center justify-center mb-10 mt-6 gap-2 text-center">
          <div className="bg-green-100 p-4 rounded-full mb-2">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-green-900 tracking-tight">Kalimati Price Tracker</h1>
          <p className="text-gray-500 text-lg max-w-lg mt-2">Daily wholesale vegetable and fruit prices in Nepal with historical trends.</p>
        </header>

        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm max-w-xl mx-auto text-center font-medium">
            Failed to load prices. Please ensure Supabase is configured correctly.
          </div>
        ) : (
          <PriceList rawData={trends || []} />
        )}
      </div>
    </main>
  );
}
