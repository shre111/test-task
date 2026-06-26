As part of our evaluation process, we would like you to complete a short assignment to demonstrate your ability to build a full-stack application using the MERN stack, along with effective use of AI-assisted development tools (such as Cursor, Lovable, ChatGPT, etc.).
🔹 Objective
Build a simple Assessment Management Application that allows users to:
Create structured assessments
Take assessments
View responses
🔹 Functional Requirements
1. Authentication
Implement User Registration and Login
Only authenticated users should access the application
2. Navigation
Provide a simple menu with the following sections:
Builder
Assessments
Launch Pad
Reports
3. Builder (Assessment Creation)
Accessible only after login
Users should be able to:
Add Categories
Within each category, add:
Factors
Within each Factor, add:
Questions
Support edit functionality
Use an accordion-style UI for hierarchy (Category → Factor → Questions)
4. Question Configuration
Before adding questions:
Show a settings popup to define:
Question types (e.g., multiple choice, rating, etc.)
Number of questions per type
5. Category Management
Users can create multiple categories
Provide a “Load Categories” option:
Displays previously created categories
Allows selection of categories
Selected categories should append to existing ones
6. Save & Assessment Listing
Once the builder data is saved:
Redirect to the Assessments page
Builder should reset to an empty state
7. Launch Pad (Taking Assessment)
Display all questions for a selected assessment
Allow users to submit responses
8. Reports
Display submitted responses in a structured format
🔹 Technical Expectations
Use MERN Stack (MongoDB, Express, React, Node.js)
Use AI tools to assist development
Ensure clean and modular code structure
Basic validation and error handling
🔹 Submission Requirements
Please share:
Live Application URL (deployed)
Source Code Repository (GitHub)
README.md including:
Setup instructions
Architecture overview
Key decisions made
AI Usage Summary:
Tools used
Sample prompts used
What was generated vs manually implemented
🔹 Evaluation Criteria
We will evaluate based on:
Functional completeness
Code quality and structure
Effective use of AI tools
Problem-solving and edge case handling
UI/UX clarity
