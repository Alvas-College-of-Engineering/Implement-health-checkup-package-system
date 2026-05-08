# Health Checkup System

A Full-Stack Web Application developed using Spring Boot and React for managing health checkup package bookings.  
The system allows patients to browse health packages, book appointments, and manage bookings efficiently.

---

# Project Overview

The Health Checkup System is designed to simplify the process of selecting and booking medical checkup packages.  
It provides an easy-to-use interface for patients and demonstrates integration between frontend and backend technologies.

The project uses:
- Spring Boot for backend REST APIs
- React.js for frontend user interface
- MySQL/H2 Database for storing patient and booking details

---

# Features

- Browse available health checkup packages
- Book health checkup appointments
- View booking confirmation
- Display all bookings
- Cancel/Delete bookings
- REST API integration
- Responsive user interface

---

# Technologies Used

## Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Maven
- REST API

## Frontend
- React.js
- Axios
- HTML
- CSS
- JavaScript

## Database
- H2 Database / MySQL

---

# Project Structure

```text
health-checkup-system/
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── resources/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── components/
│
└── README.md
```

---

# Application Pages

| Page | Description |
|------|-------------|
| `/` | Home Page |
| `/packages` | Browse all health packages |
| `/book/:id` | Book selected package |
| `/confirmation` | Booking confirmation receipt |
| `/bookings` | View/Delete all bookings |

---

# Packages & Pricing

| Package | Number of Tests | Price |
|----------|----------------|--------|
| Basic | 5 Tests | ₹999 |
| Standard | 9 Tests | ₹2,499 |
| Premium | 12 Tests | ₹4,999 |

---

# API Endpoints

## Package APIs
- `GET /api/packages`
- `GET /api/packages/{id}`

## Patient Booking APIs
- `POST /api/patients`
- `GET /api/patients`
- `DELETE /api/patients/{id}`

---

# Requirements

- Java 17+
- Node.js 18+
- Maven
- VS Code
- Git

---

# Future Enhancements

- Online Payment Integration
- Admin Dashboard
- Appointment Scheduling
- Email Notifications
- Authentication & Authorization

---

# Developed By

**Name:** Santhrupthi M S  
**USN:** 4AL23CS141  
**Course:** Advanced Java