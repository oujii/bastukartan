#!/usr/bin/env node

/**
 * Database Seeding Script for Stockholm Sauna Directory
 * Populates the database with initial sauna data for development and testing
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

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Load seed data
    const seedDataPath = path.join(__dirname, 'seed-data.json');
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
    
    console.log(`📊 Found ${seedData.length} saunas to seed`);
    
    // Check if data already exists
    const { data: existingSaunas, error: checkError } = await supabase
      .from('saunas')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('❌ Error checking existing data:', checkError.message);
      console.log('💡 Make sure you have run the migration script first!');
      process.exit(1);
    }
    
    if (existingSaunas && existingSaunas.length > 0) {
      console.log('⚠️  Database already contains sauna data');
      console.log('Would you like to:');
      console.log('1. Skip seeding (recommended)');
      console.log('2. Clear existing data and reseed');
      console.log('');
      console.log('For safety, this script will not automatically clear data.');
      console.log('If you want to reseed, please manually clear the saunas table first.');
      return;
    }
    
    // Insert seed data
    console.log('📝 Inserting seed data...');
    
    for (let i = 0; i < seedData.length; i++) {
      const sauna = seedData[i];
      console.log(`   ${i + 1}/${seedData.length}: ${sauna.name}`);
      
      const { error } = await supabase
        .from('saunas')
        .insert([sauna]);
      
      if (error) {
        console.error(`❌ Error inserting ${sauna.name}:`, error.message);
        throw error;
      }
    }
    
    console.log('✅ All seed data inserted successfully!');
    
    // Verify the data
    const { data: insertedSaunas, error: verifyError } = await supabase
      .from('saunas')
      .select('id, name')
      .order('name');
    
    if (verifyError) {
      console.error('❌ Error verifying data:', verifyError.message);
    } else {
      console.log(`🎉 Verification: ${insertedSaunas.length} saunas in database`);
      console.log('📋 Seeded saunas:');
      insertedSaunas.forEach((sauna, index) => {
        console.log(`   ${index + 1}. ${sauna.name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
