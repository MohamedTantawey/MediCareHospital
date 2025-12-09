# Digital Hospital Management System

A complete hospital management system built with HTML, CSS, and vanilla JavaScript using LocalStorage for data persistence.

## Features

### Authentication & Roles

- **Admin**: Manage doctors, departments, and view all appointments
- **Doctor**: View and manage appointments, set availability
- **Patient**: Book appointments, view appointment history
- **Visitor**: Browse services and departments without login

### Core Functionality

- Role-based authentication with LocalStorage
- Appointment booking system
- Department and doctor management
- Responsive design for all devices

## File Structure

```
/Hospital-Management-System/
├── index.html
├── login.html
├── register.html
├── admin-dashboard.html
├── doctor-dashboard.html
├── patient-dashboard.html
├── services.html
├── contact.html
├── /departments/
│     ├── cardiology.html
│     ├── neurology.html
│     ├── orthopedics.html
│     ├── pediatrics.html
│     ├── ophthalmology.html
│     └── dental.html
├── styles.css
├── script.js
└── README.md
```

## Getting Started

1. Open `index.html` in a web browser
2. Use the navigation menu to explore different sections
3. Register as a new user or use predefined credentials:
   - **Admin**: admin@hospital.com / admin123
   - **Doctor**: john@hospital.com / doctor123
   - **Patient**: sarah@gmail.com / patient123

## Technical Implementation

### Data Storage

All data is stored in the browser's LocalStorage:

- Users (patients, doctors, admins)
- Appointments
- Doctors information
- Departments

### Key Components

#### Authentication System

- Login with email/password and role selection
- Session management with sessionStorage
- Role-based access control

#### Dashboards

- **Admin Dashboard**: Manage all system entities
- **Doctor Dashboard**: View and manage assigned appointments
- **Patient Dashboard**: Book and manage appointments

#### Appointment System

- Booking form with department and doctor selection
- Status management (Pending, Approved, Rejected, Completed, Cancelled)
- Date/time validation

## Responsive Design

The system is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices

## Technologies Used

- HTML5
- CSS3 (Flexbox and Grid layouts)
- Vanilla JavaScript (ES6+)
- LocalStorage API
- Font Awesome icons

## Browser Compatibility

Tested on modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Security Notes

This is a frontend-only demonstration application:

- Passwords are stored in plain text (not suitable for production)
- No server-side validation
- Intended for educational purposes only

## Customization

To customize the system:

1. Modify `styles.css` for visual changes
2. Update `script.js` for functionality changes
3. Add new departments by creating HTML files in `/departments/`
4. Extend user roles by modifying authentication logic

## Support

For issues or questions, please check the browser console for error messages and ensure JavaScript is enabled.
