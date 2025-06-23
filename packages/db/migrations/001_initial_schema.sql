-- Initial database schema for Stockholm Sauna Directory
-- Migration: 001_initial_schema
-- Created: 2025-06-23
-- Description: Creates all tables, enums, and indexes for the sauna directory

-- Create custom enum types
CREATE TYPE booking_type_enum AS ENUM ('Drop-in welcome', 'Online booking required', 'Members only');
CREATE TYPE heat_source_enum AS ENUM ('Wood-fired', 'Electric');
CREATE TYPE sauna_type_enum AS ENUM ('Finnish Dry', 'Steam Room', 'Infrared');
CREATE TYPE setting_enum AS ENUM ('Lakeside', 'Seaside', 'City Spa', 'Gym', 'Rooftop', 'Floating');
CREATE TYPE submission_type_enum AS ENUM ('new_suggestion', 'correction_report');
CREATE TYPE submission_status_enum AS ENUM ('pending', 'approved', 'rejected');

-- Create saunas table
CREATE TABLE saunas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    opening_hours JSONB,
    pricing_details TEXT,
    booking_type booking_type_enum,
    heat_sources heat_source_enum[],
    sauna_types sauna_type_enum[],
    setting setting_enum,
    has_lake_access BOOLEAN DEFAULT FALSE,
    swimsuit_policy TEXT,
    amenities TEXT[],
    gmaps_url TEXT,
    website TEXT,
    booking_url TEXT,
    phone TEXT,
    avg_rating NUMERIC(2, 1),
    review_count INT DEFAULT 0
);

-- Create indexes for performance optimization
CREATE INDEX idx_saunas_setting ON saunas(setting);
CREATE INDEX idx_saunas_booking_type ON saunas(booking_type);
CREATE INDEX idx_saunas_has_lake_access ON saunas(has_lake_access);
CREATE INDEX idx_saunas_name ON saunas(name);

-- Create submissions table for user-generated content
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    type submission_type_enum NOT NULL,
    status submission_status_enum DEFAULT 'pending' NOT NULL,
    sauna_id UUID REFERENCES saunas(id) ON DELETE SET NULL,
    submitted_data JSONB NOT NULL
);

-- Create indexes for submissions
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_type ON submissions(type);
CREATE INDEX idx_submissions_sauna_id ON submissions(sauna_id);

-- Add comments for documentation
COMMENT ON TABLE saunas IS 'Main table storing all sauna information for the Stockholm directory';
COMMENT ON TABLE submissions IS 'User submissions for new saunas and corrections to existing data';
COMMENT ON COLUMN saunas.opening_hours IS 'JSON object with days of week as keys and opening hours as values';
COMMENT ON COLUMN saunas.heat_sources IS 'Array of heat source types (can have multiple)';
COMMENT ON COLUMN saunas.sauna_types IS 'Array of sauna types (can have multiple)';
COMMENT ON COLUMN saunas.amenities IS 'Array of additional amenities available';
COMMENT ON COLUMN submissions.submitted_data IS 'JSON object containing the submitted sauna data or correction details';
