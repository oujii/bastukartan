// Database schemas and client for Stockholm Sauna Directory

import { createClient } from '@supabase/supabase-js';
import getConfig from '@stockholm-sauna/config';

export function createSupabaseClient() {
  const config = getConfig();
  return createClient(config.supabase.url, config.supabase.anonKey);
}

// Re-export types for convenience
export * from '@stockholm-sauna/types';
