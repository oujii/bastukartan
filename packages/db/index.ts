// Database schemas and client for Stockholm Sauna Directory

import { createClient } from '@supabase/supabase-js';
import getConfig from '@stockholm-sauna/config';
import type { Sauna, Submission } from '@stockholm-sauna/types';

export function createSupabaseClient() {
  const config = getConfig();
  return createClient(config.supabase.url, config.supabase.anonKey);
}

// Database helper functions
export class SaunaRepository {
  private supabase;

  constructor() {
    this.supabase = createSupabaseClient();
  }

  async getAllSaunas(): Promise<Sauna[]> {
    const { data, error } = await this.supabase
      .from('saunas')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getSaunaById(id: string): Promise<Sauna | null> {
    const { data, error } = await this.supabase
      .from('saunas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  async getSaunasByFilter(filters: {
    setting?: string;
    booking_type?: string;
    has_lake_access?: boolean;
  }): Promise<Sauna[]> {
    let query = this.supabase.from('saunas').select('*');

    if (filters.setting) {
      query = query.eq('setting', filters.setting);
    }
    if (filters.booking_type) {
      query = query.eq('booking_type', filters.booking_type);
    }
    if (filters.has_lake_access !== undefined) {
      query = query.eq('has_lake_access', filters.has_lake_access);
    }

    const { data, error } = await query.order('name');
    if (error) throw error;
    return data || [];
  }

  async createSauna(sauna: Omit<Sauna, 'id' | 'created_at'>): Promise<Sauna> {
    const { data, error } = await this.supabase
      .from('saunas')
      .insert([sauna])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateSauna(id: string, updates: Partial<Sauna>): Promise<Sauna> {
    const { data, error } = await this.supabase
      .from('saunas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Migration and seeding utilities
export async function runMigrations() {
  const { runMigrations } = require('./migrate.js');
  return runMigrations();
}

export async function seedDatabase() {
  const { seedDatabase } = require('./seed.js');
  return seedDatabase();
}

// Re-export types for convenience
export * from '@stockholm-sauna/types';
