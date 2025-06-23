# Technical Assumptions

## Repository Structure: Monorepo
A **Monorepo** (a single repository for all our code) is recommended. This is the best practice for modern full-stack applications like ours, as it will allow us to easily share code and types between our frontend website and any backend services.

## Service Architecture: Serverless
For the MVP, a **Serverless** architecture is recommended. We can use Serverless Functions for any backend logic we need. This approach is highly scalable, cost-effective, and simplifies deployment.

## Testing requirements
A comprehensive testing strategy is required, including:
* **Unit Tests:** To verify individual functions and components.
* **Integration Tests:** To ensure different parts of the application work together correctly.
* **End-to-End (E2E) Tests:** To simulate real user journeys from start to finish.

## Additional Technical Assumptions and Requests
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
