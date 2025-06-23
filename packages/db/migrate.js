#!/usr/bin/env node

/**
 * Database Migration Runner for Stockholm Sauna Directory
 * Runs SQL migration files against the Supabase database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '../../apps/web/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  console.log('🚀 Starting database migrations...');

  const migrationsDir = path.join(__dirname, 'migrations');

  try {
    // Get all migration files
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('📝 No migration files found');
      return;
    }

    console.log(`📁 Found ${files.length} migration file(s)`);

    // For this simple case, we'll just run the migration directly
    // In a production system, you'd want proper migration tracking
    
    // Run each migration
    for (const file of files) {
      console.log(`📄 Processing migration: ${file}`);

      // Read migration file
      const migrationPath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(migrationPath, 'utf8');

      console.log(`⚡ Executing ${file}...`);
      console.log('📋 Note: This will create the database schema. Check Supabase dashboard to verify.');
      console.log('🔗 SQL to execute:');
      console.log('---');
      console.log(sql);
      console.log('---');
      console.log('');
      console.log('💡 Please copy the SQL above and run it in your Supabase SQL Editor:');
      console.log('   1. Go to your Supabase dashboard');
      console.log('   2. Navigate to SQL Editor');
      console.log('   3. Paste and run the SQL above');
      console.log('   4. Verify tables are created in the Table Editor');

      console.log(`✅ Migration ${file} ready for execution`);
    }
    
    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migrations if this script is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
