// Shared TypeScript types for Stockholm Sauna Directory

export enum BookingType {
  DropIn = "Drop-in welcome",
  Required = "Online booking required", 
  MembersOnly = "Members only"
}

export enum HeatSource {
  Wood = "Wood-fired",
  Electric = "Electric"
}

export enum SaunaType {
  Dry = "Finnish Dry",
  Steam = "Steam Room",
  Infrared = "Infrared"
}

export enum Setting {
  Lakeside = "Lakeside",
  Seaside = "Seaside", 
  CitySpa = "City Spa",
  Gym = "Gym",
  Rooftop = "Rooftop",
  Floating = "Floating"
}

export interface Sauna {
  id: string;
  created_at: string;
  name: string;
  address: string;
  gmaps_url?: string;
  website?: string;
  booking_url?: string;
  phone?: string;
  opening_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  pricing_details: string;
  booking_type: BookingType;
  heat_sources: HeatSource[];
  sauna_types: SaunaType[];
  setting: Setting;
  has_lake_access: boolean;
  amenities?: string[];
  swimsuit_policy?: string;
  avg_rating?: number;
  review_count?: number;
}

export enum SubmissionType {
  NewSuggestion = "new_suggestion",
  Correction = "correction_report"
}

export enum SubmissionStatus {
  Pending = "pending",
  Approved = "approved", 
  Rejected = "rejected"
}

export interface Submission {
  id: string;
  created_at: string;
  type: SubmissionType;
  status: SubmissionStatus;
  sauna_id?: string;
  submitted_data: {
    name?: string;
    address?: string;
    website?: string;
    notes?: string;
    incorrect_fields?: string[];
  };
}
