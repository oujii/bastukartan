# Epics

## Epic 1: The Ultimate Sauna Directory MVP

**Goal:** Launch a lightning-fast, comprehensive, and accurate directory for Stockholm saunas with the best search, filtering, and "Sauna Now" features on the market.

### Story 1.1: Project Initialization & Setup
As a developer, I want to initialize the Next.js & Supabase project with the correct repository structure and configurations, so that we have a stable and modern foundation to build upon.
* **Acceptance Criteria:**
    1.  A Monorepo structure is created and initialized with Git.
    2.  A new Next.js application is set up with TypeScript and Tailwind CSS.
    3.  A new project is created on Vercel and linked to the repository for continuous deployment.
    4.  A new project is created on Supabase.
    5.  Environment variable files are created to securely store keys for connecting to Supabase.

### Story 1.2: Database Schema & Seeding
As a developer, I want to create the `saunas` table in the Supabase database based on our defined schema, so that we can properly store and manage all sauna information.
* **Acceptance Criteria:**
    1.  A database migration script is created that defines the `saunas` table.
    2.  The table includes all columns from our "Sauna Listing Schema" (e.g., `name`, `address`, `setting`, `heat_source`, `booking_type`, etc.).
    3.  The script can be run to apply the schema to the Supabase database.
    4.  A separate "seed" script is created to populate the database with an initial 10-20 saunas for development and testing.

### Story 1.3: Home Page with Map & List View
As a user, I want to see all listed saunas on an interactive map and in a simple list on the home page, so that I can get an overview of my options in Stockholm.
* **Acceptance Criteria:**
    1.  The home page successfully fetches all sauna records from the Supabase database.
    2.  An interactive map displays a pin for the location of each sauna.
    3.  A scrollable list below the map displays the name and neighborhood of each sauna.
    4.  The page is responsive and displays cleanly on both desktop and mobile.

### Story 1.4: Sauna Detail Page
As a user, I want to click on a sauna from the map or list and be taken to a dedicated page, so that I can view all of its detailed information.
* **Acceptance Criteria:**
    1.  Clicking a map pin or a list item navigates to a unique URL for that sauna (e.g., `/sauna/hellasgarden`).
    2.  The detail page fetches and displays all information for the selected sauna.
    3.  All information is presented in a clean, readable layout.
    4.  The page includes a "Back to Directory" link.

### Story 1.5: Basic Site Layout & Navigation
As a user, I want to see a consistent header and footer across all pages, so that I can easily recognize the brand and navigate the site.
* **Acceptance Criteria:**
    1.  A reusable Header component is created containing the site's name/logo.
    2.  A reusable Footer component is created containing basic informational links.
    3.  The Header and Footer are present on the Home Page and all Sauna Detail Pages.

### Story 1.6: Advanced Filtering
As a user, I want to use advanced filters on the home page to narrow down the sauna directory, so that I can find a sauna that perfectly matches my needs.
* **Acceptance Criteria:**
    1.  A filter bar/panel is added to the Home Page UI.
    2.  It includes controls to filter by: Setting, Booking Type, Heat Source, and Price Range.
    3.  Applying any filter instantly updates both the map and the list view.
    4.  Multiple filters can be active at the same time.
    5.  A "Clear Filters" button is available to reset the view.

### Story 1.7: The "Sauna Now" Feature
As a user, I want to click a "Sauna Now" button, so I can instantly see which saunas are open and accept drop-ins right now.
* **Acceptance Criteria:**
    1.  A prominent "Sauna Now" button is on the home page.
    2.  Clicking it applies a "Booking Type: Drop-in welcome" filter and a time-based filter.
    3.  The map and list update instantly to show only saunas that meet these criteria.
    4.  The button's appearance changes to show the filter is active.

### Story 1.8: Localization & Launch Polish
As a developer, I want to implement the dual-language (Swedish/English) functionality and perform final performance optimizations, so that the site is ready for a professional public launch.
* **Acceptance Criteria:**
    1.  The language toggle is implemented per our strategy.
    2.  All static UI text is available in both Swedish and English.
    3.  URLs are structured correctly for SEO (`/en/`, `/sv/`).
    4.  The website achieves a Google Lighthouse performance score of 90+ for mobile.