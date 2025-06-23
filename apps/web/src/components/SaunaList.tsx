'use client';

import Link from 'next/link';
import type { Sauna } from '@stockholm-sauna/types';
import { generateSaunaSlug } from '../lib/utils';

interface SaunaListProps {
  saunas: Sauna[];
  isLoading?: boolean;
  className?: string;
}

interface SaunaCardProps {
  sauna: Sauna;
}

function SaunaCard({ sauna }: SaunaCardProps) {
  const slug = generateSaunaSlug(sauna.name);

  return (
    <Link href={`/sauna/${slug}`} className="block">
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {sauna.name}
        </h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
          {sauna.setting}
        </span>
      </div>
      
      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
        {sauna.address}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            sauna.booking_type === 'Drop-in welcome' 
              ? 'bg-green-100 text-green-800'
              : sauna.booking_type === 'Online booking required'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {sauna.booking_type}
          </span>
          
          {sauna.has_lake_access && (
            <span className="text-blue-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Lake
            </span>
          )}
        </div>
        
        {sauna.heat_sources && sauna.heat_sources.length > 0 && (
          <span className="text-gray-500">
            {sauna.heat_sources[0]}
          </span>
        )}
      </div>
      </div>
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="animate-pulse">
            <div className="flex justify-between items-start mb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No saunas found</h3>
      <p className="text-gray-500 text-sm">
        We couldn't find any saunas to display. Please try again later.
      </p>
    </div>
  );
}

export default function SaunaList({ saunas, isLoading = false, className = '' }: SaunaListProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!saunas || saunas.length === 0) {
    return (
      <div className={className}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Stockholm Saunas
        </h2>
        <span className="text-sm text-gray-500">
          {saunas.length} location{saunas.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {saunas.map((sauna) => (
          <SaunaCard key={sauna.id} sauna={sauna} />
        ))}
      </div>
    </div>
  );
}
