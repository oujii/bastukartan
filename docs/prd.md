# Stockholm Sauna Directory - Product Requirements Document (PRD)

## Goals and Background Context

### Goals

* To create the most comprehensive, accurate, and user-friendly directory of all saunas in the Stockholm area.
* To serve the distinct needs of both international tourists looking for unique experiences and local residents seeking wellness options.
* To become the top-ranking website on search engines (SEO) for "sauna in Stockholm" and related queries.
* To deliver a unique "Sauna Now" feature that allows users to instantly find available drop-in saunas nearby.
* To build a strong foundation (brand and technical) for future expansion into other cities and for introducing a booking system in a later phase.

### Background Context

The wellness market is a significant and growing trend, yet there is no single, high-quality resource dedicated to discovering saunas in Stockholm. Information is currently scattered across various spa websites, gym pages, blogs, and articles, making it difficult for users to compare options and find what they need.

This project aims to solve that problem by creating a centralized directory. The core value is to aggregate and present detailed, structured information—including sauna types, heat sources, pricing, booking rules, setting (lakeside vs. city), and opening hours—in a consistent and easily searchable format. The initial launch (MVP) will focus exclusively on the Stockholm market to ensure data quality and build a strong local brand before any potential expansion. A key part of the strategy is a dual-language approach (Swedish and English) to effectively serve both locals and tourists from day one.

## Requirements

### Functional (Final MVP Set)

* **FR1:** The system shall display a directory of all saunas listed for the Stockholm area.
* **FR2:** Each sauna in the directory must have a unique, detailed page displaying all information from our defined schema.
* **FR3:** Users must be able to search for saunas by name or geographic area.
* **FR4:** The directory must provide advanced filtering capabilities based on key data points.
* **FR5:** The system shall display search and filter results on an interactive map.
* **FR6:** The site must feature a prominent "Sauna Now" function.
* **FR7 (Updated):** Users must be able to submit a **star rating (1-5)** for each sauna. (Text reviews will be implemented in a future version).
* **FR8:** The system must provide a simple user registration and login mechanism to enable star ratings.
* **FR9:** Each sauna detail page shall feature a button for users to **report incorrect information**, which flags the listing for admin review.
* **FR10 (New):** The system shall provide a simple "Suggest a Sauna" form for users to submit saunas that are not currently in the directory.

### Non-Functional

* **NFR1 (SEO):** The entire website architecture, from URLs to page structure and metadata, must be built using modern SEO best practices to achieve the highest possible search rankings.
* **NFR2 (Localization):** The website must fully support both Swedish and English languages, utilizing SEO-friendly URLs (e.g., `/en/` and `/sv/`) and a clear, user-controlled language toggle.
* **NFR3 (Performance):** The website must be highly performant, with page load times under 2 seconds on a standard mobile connection to ensure a good user experience and support SEO goals.
* **NFR4 (Usability):** The website must be responsive and provide an intuitive user experience on all major device types (desktop, tablet, and mobile).
* **NFR5 (Data Accuracy):** The system must include an administrative interface for easily adding, updating, and verifying sauna information to ensure the directory remains current and trustworthy.

## User Interface Design Goals

### Overall UX Vision
The website should feel like a premium, trustworthy, and highly efficient utility. The user experience must be fast, intuitive, and map-centric. For tourists, it should feel welcoming and easy to navigate. For locals, it should be a powerful tool they can rely on. The design should be clean, uncluttered, and perform flawlessly on mobile devices.

### Key Interaction Paradigms
* **Map-First Discovery:** The primary way users will explore saunas is through an interactive map that updates in real-time as filters are applied. A toggleable list view will be available as a secondary option.
* **Filter-Driven Workflow:** Finding the perfect sauna will be driven by a powerful and easy-to-use set of filters based on our defined data points (e.g., Drop-in, Lakeside, Wood-fired).
* **"One-Click to Value":** The "Sauna Now" feature will be a central, immediately accessible button on the main screen, providing instant value to users.

### Core Screens and Views
This is a conceptual list of the main "pages" or views the user will interact with for the MVP:
* **Home/Search View:** The main page featuring the map, filters, search bar, and the "Sauna Now" button.
* **Sauna Detail View:** A dedicated page for each sauna, displaying all its information clearly.
* **Submit Rating Form:** A simple modal or page for users to leave a star rating.
* **Suggest a Sauna Form:** A page where users can submit new, unlisted saunas.
* **Report Incorrect Info Form:** A modal activated from the detail page.
* **Login / User Profile View:** A minimal page for users to see their past ratings.

### Accessibility
We will target **WCAG 2.1 Level AA** as our standard. This ensures the site is usable by people with a wide range of disabilities, which is crucial for a public-facing website.

### Branding
A "clean, modern, Scandinavian" aesthetic is recommended. The color palette should feel both warm (like a sauna) and cool (like a Swedish lake), with a clean, highly-readable font.

### Target Device and Platforms
This will be a **mobile-first responsive web application**. It must function perfectly on all modern browsers and devices, from a small smartphone screen to a large desktop monitor, with a particular focus on fast performance for on-the-go mobile users.

## Technical Assumptions

### Repository Structure: Monorepo
A **Monorepo** (a single repository for all our code) is recommended. This is the best practice for modern full-stack applications like ours, as it will allow us to easily share code and types between our frontend website and any backend services.

### Service Architecture: Serverless
For the MVP, a **Serverless** architecture is recommended. We can use Serverless Functions for any backend logic we need. This approach is highly scalable, cost-effective, and simplifies deployment.

### Testing requirements
A comprehensive testing strategy is required, including:
* **Unit Tests:** To verify individual functions and components.
* **Integration Tests:** To ensure different parts of the application work together correctly.
* **End-to-End (E2E) Tests:** To simulate real user journeys from start to finish.

### Additional Technical Assumptions and Requests
* **Framework: Next.js (using React)**
    * **Rationale:** The industry standard for building high-performance, SEO-friendly websites.
* **Language: TypeScript**
    * **Rationale:** Adds type safety, which drastically reduces bugs and makes the project easier to maintain.
* **Deployment & Hosting: Vercel**
    * **Rationale:** Offers seamless, zero-configuration deployment, a global CDN for speed, and a generous free tier for the MVP.
* **Backend & Database: Supabase**
    * **Rationale:** Provides a powerful PostgreSQL database, authentication, and instant APIs with minimal setup.
* **Styling: Tailwind CSS**
    * **Rationale:** A modern, utility-first CSS framework that allows for building custom, high-performance designs very quickly.

## Epics

### Epic 1: The Ultimate Sauna Directory MVP

**Goal:** Launch a lightning-fast, comprehensive, and accurate directory for Stockholm saunas with the best search, filtering, and "Sauna Now" features on the market.

#### Story 1.1: Project Initialization & Setup
As a developer, I want to initialize the Next.js & Supabase project with the correct repository structure and configurations, so that we have a stable and modern foundation to build upon.
* **Acceptance Criteria:**
    1.  A Monorepo structure is created and initialized with Git.
    2.  A new Next.js application is set up with TypeScript and Tailwind CSS.
    3.  A new project is created on Vercel and linked to the repository for continuous deployment.
    4.  A new project is created on Supabase.
    5.  Environment variable files are created to securely store keys for connecting to Supabase.

#### Story 1.2: Database Schema & Seeding
As a developer, I want to create the `saunas` table in the Supabase database based on our defined schema, so that we can properly store and manage all sauna information.
* **Acceptance Criteria:**
    1.  A database migration script is created that defines the `saunas` table.
    2.  The table includes all columns from our "Sauna Listing Schema" (e.g., `name`, `address`, `setting`, `heat_source`, `booking_type`, etc.).
    3.  The script can be run to apply the schema to the Supabase database.
    4.  A separate "seed" script is created to populate the database with an initial 10-20 saunas for development and testing.

#### Story 1.3: Home Page with Map & List View
As a user, I want to see all listed saunas on an interactive map and in a simple list on the home page, so that I can get an overview of my options in Stockholm.
* **Acceptance Criteria:**
    1.  The home page successfully fetches all sauna records from the Supabase database.
    2.  An interactive map displays a pin for the location of each sauna.
    3.  A scrollable list below the map displays the name and neighborhood of each sauna.
    4.  The page is responsive and displays cleanly on both desktop and mobile.

#### Story 1.4: Sauna Detail Page
As a user, I want to click on a sauna from the map or list and be taken to a dedicated page, so that I can view all of its detailed information.
* **Acceptance Criteria:**
    1.  Clicking a map pin or a list item navigates to a unique URL for that sauna (e.g., `/sauna/hellasgarden`).
    2.  The detail page fetches and displays all information for the selected sauna.
    3.  All information is presented in a clean, readable layout.
    4.  The page includes a "Back to Directory" link.

#### Story 1.5: Basic Site Layout & Navigation
As a user, I want to see a consistent header and footer across all pages, so that I can easily recognize the brand and navigate the site.
* **Acceptance Criteria:**
    1.  A reusable Header component is created containing the site's name/logo.
    2.  A reusable Footer component is created containing basic informational links.
    3.  The Header and Footer are present on the Home Page and all Sauna Detail Pages.

#### Story 1.6: Advanced Filtering
As a user, I want to use advanced filters on the home page to narrow down the sauna directory, so that I can find a sauna that perfectly matches my needs.
* **Acceptance Criteria:**
    1.  A filter bar/panel is added to the Home Page UI.
    2.  It includes controls to filter by: Setting, Booking Type, Heat Source, and Price Range.
    3.  Applying any filter instantly updates both the map and the list view.
    4.  Multiple filters can be active at the same time.
    5.  A "Clear Filters" button is available to reset the view.

#### Story 1.7: The "Sauna Now" Feature
As a user, I want to click a "Sauna Now" button, so I can instantly see which saunas are open and accept drop-ins right now.
* **Acceptance Criteria:**
    1.  A prominent "Sauna Now" button is on the home page.
    2.  Clicking it applies a "Booking Type: Drop-in welcome" filter and a time-based filter.
    3.  The map and list update instantly to show only saunas that meet these criteria.
    4.  The button's appearance changes to show the filter is active.

#### Story 1.8: Localization & Launch Polish
As a developer, I want to implement the dual-language (Swedish/English) functionality and perform final performance optimizations, so that the site is ready for a professional public launch.
* **Acceptance Criteria:**
    1.  The language toggle is implemented per our strategy.
    2.  All static UI text is available in both Swedish and English.
    3.  URLs are structured correctly for SEO (`/en/`, `/sv/`).
    4.  The website achieves a Google Lighthouse performance score of 90+ for mobile.