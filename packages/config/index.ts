// Centralized configuration for Stockholm Sauna Directory

interface Config {
  supabase: {
    url: string;
    anonKey: string;
  };
  app: {
    name: string;
    description: string;
    url: string;
  };
  mapbox?: {
    accessToken: string;
  };
}

function getConfig(): Config {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing required Supabase environment variables');
  }

  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    app: {
      name: 'Stockholm Sauna Directory',
      description: 'The most comprehensive directory of saunas in Stockholm',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
    mapbox: {
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '',
    },
  };
}

export default getConfig;
