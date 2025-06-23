/**
 * Integration test for database schema migration
 * Tests that migration scripts are properly formatted and seed data is valid
 */

import { describe, it, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

describe('Database Schema Migration', () => {
  const migrationsDir = path.join(__dirname, '../../packages/db/migrations');
  const seedDataPath = path.join(__dirname, '../../packages/db/seed-data.json');

  it('should have migration files in correct format', () => {
    expect(fs.existsSync(migrationsDir)).toBe(true);
    
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    expect(files.length).toBeGreaterThan(0);
    expect(files[0]).toBe('001_initial_schema.sql');
  });

  it('should have valid SQL in migration files', () => {
    const migrationFile = path.join(migrationsDir, '001_initial_schema.sql');
    expect(fs.existsSync(migrationFile)).toBe(true);
    
    const sql = fs.readFileSync(migrationFile, 'utf8');
    
    // Check for required SQL statements
    expect(sql).toContain('CREATE TYPE booking_type_enum');
    expect(sql).toContain('CREATE TYPE heat_source_enum');
    expect(sql).toContain('CREATE TYPE sauna_type_enum');
    expect(sql).toContain('CREATE TYPE setting_enum');
    expect(sql).toContain('CREATE TABLE saunas');
    expect(sql).toContain('CREATE TABLE submissions');
    expect(sql).toContain('CREATE INDEX idx_saunas_setting');
    expect(sql).toContain('CREATE INDEX idx_saunas_booking_type');
  });

  it('should have valid seed data', () => {
    expect(fs.existsSync(seedDataPath)).toBe(true);
    
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
    
    expect(Array.isArray(seedData)).toBe(true);
    expect(seedData.length).toBeGreaterThanOrEqual(10);
    
    // Validate first sauna entry structure
    const firstSauna = seedData[0];
    expect(firstSauna).toHaveProperty('name');
    expect(firstSauna).toHaveProperty('address');
    expect(firstSauna).toHaveProperty('opening_hours');
    expect(firstSauna).toHaveProperty('pricing_details');
    expect(firstSauna).toHaveProperty('booking_type');
    expect(firstSauna).toHaveProperty('heat_sources');
    expect(firstSauna).toHaveProperty('sauna_types');
    expect(firstSauna).toHaveProperty('setting');
    expect(firstSauna).toHaveProperty('has_lake_access');
    
    // Validate enum values
    const validBookingTypes = ['Drop-in welcome', 'Online booking required', 'Members only'];
    const validHeatSources = ['Wood-fired', 'Electric'];
    const validSaunaTypes = ['Finnish Dry', 'Steam Room', 'Infrared'];
    const validSettings = ['Lakeside', 'Seaside', 'City Spa', 'Gym', 'Rooftop', 'Floating'];
    
    seedData.forEach((sauna, index) => {
      expect(validBookingTypes).toContain(sauna.booking_type);
      expect(validSettings).toContain(sauna.setting);
      expect(typeof sauna.has_lake_access).toBe('boolean');
      
      sauna.heat_sources.forEach((source: string) => {
        expect(validHeatSources).toContain(source);
      });
      
      sauna.sauna_types.forEach((type: string) => {
        expect(validSaunaTypes).toContain(type);
      });
    });
  });

  it('should have proper opening hours format', () => {
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    seedData.forEach((sauna: any) => {
      expect(sauna.opening_hours).toBeDefined();
      
      daysOfWeek.forEach(day => {
        expect(sauna.opening_hours).toHaveProperty(day);
        expect(typeof sauna.opening_hours[day]).toBe('string');
      });
    });
  });

  it('should have migration and seed scripts available', () => {
    const dbPackagePath = path.join(__dirname, '../../packages/db/package.json');
    const packageJson = JSON.parse(fs.readFileSync(dbPackagePath, 'utf8'));
    
    expect(packageJson.scripts).toHaveProperty('migrate');
    expect(packageJson.scripts).toHaveProperty('seed');
    expect(packageJson.scripts.migrate).toBe('node migrate.js');
    expect(packageJson.scripts.seed).toBe('node seed.js');
  });
});
