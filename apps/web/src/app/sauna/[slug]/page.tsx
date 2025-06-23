import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Sauna } from '@stockholm-sauna/types';
import { SaunaRepository } from '@stockholm-sauna/db';
import { generateSaunaSlug, formatOpeningHours, isSaunaOpen } from '../../../lib/utils';

interface PageProps {
  params: { slug: string };
}

interface ApiResponse {
  success: boolean;
  data: Sauna;
  error?: string;
  message?: string;
}

async function getSaunaBySlug(slug: string): Promise<Sauna | null> {
  try {
    // Use SaunaRepository directly for server-side rendering
    const saunaRepository = new SaunaRepository();
    const saunas = await saunaRepository.getAllSaunas();

    // Find sauna by slug using the same logic as the API
    const searchName = slug.replace(/-/g, ' ').toLowerCase();
    const sauna = saunas.find(s => {
      const normalizedSaunaName = s.name.toLowerCase()
        .replace(/[åä]/g, 'a')
        .replace(/[ö]/g, 'o')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const normalizedSearchName = searchName.toLowerCase().trim();

      return normalizedSaunaName.includes(normalizedSearchName) ||
             normalizedSearchName.includes(normalizedSaunaName) ||
             normalizedSaunaName.split(' ').some(word => normalizedSearchName.includes(word));
    });

    return sauna || null;
  } catch (error) {
    console.error('Error fetching sauna:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const sauna = await getSaunaBySlug(params.slug);
  
  if (!sauna) {
    return {
      title: 'Sauna Not Found - Stockholm Sauna Directory',
      description: 'The requested sauna could not be found.',
    };
  }
  
  return {
    title: `${sauna.name} - Stockholm Sauna Directory`,
    description: `Discover ${sauna.name} in ${sauna.setting}. ${sauna.pricing_details}`,
    openGraph: {
      title: `${sauna.name} - Stockholm Sauna Directory`,
      description: `Discover ${sauna.name} in ${sauna.setting}. ${sauna.pricing_details}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  try {
    const saunaRepository = new SaunaRepository();
    const saunas = await saunaRepository.getAllSaunas();
    
    return saunas.map((sauna) => ({
      slug: generateSaunaSlug(sauna.name),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function SaunaDetailPage({ params }: PageProps) {
  const sauna = await getSaunaBySlug(params.slug);
  
  if (!sauna) {
    notFound();
  }
  
  const isOpen = sauna.opening_hours ? isSaunaOpen(sauna.opening_hours) : false;
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Directory
            </Link>
            
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{sauna.name}</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{sauna.name}</h1>
                <p className="text-gray-600 mb-4">{sauna.address}</p>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {sauna.setting}
                  </span>
                  
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    sauna.booking_type === 'Drop-in welcome' 
                      ? 'bg-green-100 text-green-800'
                      : sauna.booking_type === 'Online booking required'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {sauna.booking_type}
                  </span>
                  
                  {sauna.has_lake_access && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                      </svg>
                      Lake Access
                    </span>
                  )}
                  
                  {isOpen && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Open Now
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {sauna.pricing_details && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-gray-700">{sauna.pricing_details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Opening Hours */}
            {sauna.opening_hours && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Opening Hours</h2>
                <div className="space-y-2">
                  {Object.entries(sauna.opening_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="capitalize font-medium text-gray-700">
                        {day}
                      </span>
                      <span className={`text-sm ${hours.toLowerCase() === 'closed' ? 'text-red-600' : 'text-gray-600'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sauna Features */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sauna Features</h2>
              
              {sauna.heat_sources && sauna.heat_sources.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Heat Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {sauna.heat_sources.map((source, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {sauna.sauna_types && sauna.sauna_types.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Sauna Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {sauna.sauna_types.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {sauna.swimsuit_policy && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Swimsuit Policy</h3>
                  <p className="text-gray-600 text-sm">{sauna.swimsuit_policy}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact & Booking</h2>
              
              <div className="space-y-3">
                {sauna.phone && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${sauna.phone}`} className="text-blue-600 hover:text-blue-700">
                      {sauna.phone}
                    </a>
                  </div>
                )}
                
                {sauna.website && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                    </svg>
                    <a href={sauna.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      Visit Website
                    </a>
                  </div>
                )}
                
                {sauna.booking_url && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <a href={sauna.booking_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      Book Online
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            {sauna.amenities && sauna.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-1 gap-2">
                  {sauna.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
