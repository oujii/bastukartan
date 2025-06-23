'use client';

import { useEffect, useState } from 'react';
import Map from '../components/Map';
import SaunaList from '../components/SaunaList';
import type { Sauna } from '@stockholm-sauna/types';

interface ApiResponse {
  success: boolean;
  data: Sauna[];
  count: number;
  error?: string;
  message?: string;
}

export default function Home() {
  const [saunas, setSaunas] = useState<Sauna[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSaunas() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/saunas');
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch saunas');
        }

        if (data.success) {
          setSaunas(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch saunas');
        }
      } catch (err) {
        console.error('Error fetching saunas:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSaunas();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stockholm Sauna Directory</h1>
              <p className="text-gray-600 text-sm mt-1">
                Discover the best saunas in Stockholm
              </p>
            </div>
            {!isLoading && saunas.length > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{saunas.length}</div>
                <div className="text-sm text-gray-500">Locations</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Map View</h2>
                <p className="text-sm text-gray-600">Interactive map showing all sauna locations</p>
              </div>
              <div className="h-96 lg:h-[500px]">
                <Map saunas={saunas} className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Locations</h2>
                <p className="text-sm text-gray-600">Browse all available saunas</p>
              </div>
              <div className="p-4">
                <SaunaList
                  saunas={saunas}
                  isLoading={isLoading}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
