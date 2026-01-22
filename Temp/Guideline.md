Role: Act as a Senior Enterprise Architect and Lead Full-Stack Engineer. Context: We are initializing the "Plan Mode" for a scalable, enterprise-grade Web Application. Goal: Create a comprehensive implementation plan and architectural blueprint.



1\. Technology Stack \& Requirements:

\- Frontend: 

&nbsp;	- React (TypeScript) + Vite + Tailwind CSS.

&nbsp;	- UI Library: shadcn/ui.

&nbsp;	- Responsiveness: Mobile-first design.

\- Backend: 

&nbsp;	- Python FastAPI.

&nbsp;	- API Style: GraphQL (Use Strawberry library).

&nbsp;	- Auth: OAuth2 (JWT).

\- Architecture Pattern: 

&nbsp;	- Clean Architecture with MVVM for Frontend.

&nbsp;	- CSR Architecture for Backend.

\- Database:

&nbsp;	- Core Data: AWS RDS (PostgreSQL).

&nbsp;	- Logs/Audit: AWS DynamoDB.

\- Testing: 

&nbsp;	- Playwright (E2E).



2\. Deployment Strategy (AWS Serverless):

\- Frontend Hosting: AWS Amplify.

\- Backend Compute: AWS Lambda (wrapped with Mangum adapter for FastAPI).

\- API Gateway: AWS API Gateway (HTTP API).

\- Queue: AWS SQS (for async tasks).

\- Infrastructure: AWS CDK (Infrastructure as Code).



3\. Specific Instruction: 

\- Folder Structure \& Organization:

\- Visual Style: Present the folder structure using a Windows-style hierarchical tree format (strictly nested, clear parent-child relationships).

\- Organization Logic: Do not group files by type (e.g., do not put all controllers in one folder). Instead, use a Domain-Driven/Feature-Sliced approach.

&nbsp;	- Example: A User feature folder should contain its own components, hooks (ViewModel), api\_service, and tests all nested strictly inside the User directory.

&nbsp;	- Note: Ensure file paths in the code remain POSIX compliant (/) for AWS Linux compatibility, even though the visual tree is Windows-style.



4\. Deliverables:

\- High-Level Architecture Summary: Explain how FastAPI on Lambda talks to RDS via Proxy.

\- The Folder Structure: A detailed ASCII tree diagram showing the deep nesting of the Frontend and Backend.

\- Key Configuration: Provide the package.json (Frontend) and requirements.txt (Backend).

\- Action Plan: Step-by-step implementation order.



EOL

