# Health Checkup System

Full-stack web app — Spring Boot backend + React frontend.

## How to Run in VS Code

### Step 1 — Start Backend
Open terminal in VS Code and run:
```
cd backend
.\mvnw.cmd spring-boot:run
```
Wait for: `Started HealthCheckupApplication on port 8080`

### Step 2 — Start Frontend
Open a NEW terminal (click + in terminal panel):
```
cd frontend
npm install
npm start
```
Browser opens at http://localhost:3000

## Pages
- `/`            — Home page
- `/packages`    — Browse Basic / Standard / Premium packages
- `/book/:id`    — Book a package (fill patient details)
- `/confirmation`— Booking confirmation receipt
- `/bookings`    — View, cancel and delete all bookings

## Packages & Pricing
| Package  | Tests | Price  |
|----------|-------|--------|
| Basic    | 5     | ₹999   |
| Standard | 9     | ₹2,499 |
| Premium  | 12    | ₹4,999 |

## Requirements
- Java 17+
- Node.js 18+
