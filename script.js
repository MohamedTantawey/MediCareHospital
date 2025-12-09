// Hospital Management System - JavaScript Functions

// Initialize LocalStorage with dummy data
function initializeData() {
  // Check if data already exists
  if (!localStorage.getItem("users")) {
    const users = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@hospital.com",
        password: "admin123",
        role: "admin",
      },
      {
        id: 2,
        name: "Dr. John Smith",
        email: "john@hospital.com",
        password: "doctor123",
        role: "doctor",
        specialization: "Cardiology",
        experience: "10 years",
      },
      {
        id: 3,
        name: "Dr. Emily Johnson",
        email: "emily@hospital.com",
        password: "doctor123",
        role: "doctor",
        specialization: "Neurology",
        experience: "8 years",
      },
      {
        id: 4,
        name: "Sarah Patient",
        email: "sarah@gmail.com",
        password: "patient123",
        role: "patient",
      },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!localStorage.getItem("appointments")) {
    const appointments = [
      {
        id: 1,
        patientId: 4,
        patientName: "Sarah Patient",
        doctorId: 2,
        doctorName: "Dr. John Smith",
        department: "Cardiology",
        date: "2023-06-15",
        time: "10:00",
        status: "Approved",
      },
      {
        id: 2,
        patientId: 4,
        patientName: "Sarah Patient",
        doctorId: 3,
        doctorName: "Dr. Emily Johnson",
        department: "Neurology",
        date: "2023-06-20",
        time: "14:30",
        status: "Pending",
      },
    ];
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }

  if (!localStorage.getItem("departments")) {
    const departments = [
      {
        id: 1,
        name: "Cardiology",
        description: "Heart and cardiovascular treatments",
      },
      {
        id: 2,
        name: "Neurology",
        description: "Brain and nervous system disorders",
      },
      { id: 3, name: "Orthopedics", description: "Bone and muscle injuries" },
      { id: 4, name: "Pediatrics", description: "Child healthcare services" },
      {
        id: 5,
        name: "Ophthalmology",
        description: "Eye care and vision correction",
      },
      { id: 6, name: "Dental", description: "Teeth and oral health care" },
    ];
    localStorage.setItem("departments", JSON.stringify(departments));
  }

  if (!localStorage.getItem("doctors")) {
    const doctors = [
      {
        id: 2,
        name: "Dr. John Smith",
        email: "john@hospital.com",
        specialization: "Cardiology",
        experience: "10 years",
        department: "Cardiology",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 3,
        name: "Dr. Emily Johnson",
        email: "emily@hospital.com",
        specialization: "Neurology",
        experience: "8 years",
        department: "Neurology",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    ];
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }

  // Also initialize in sessionStorage if not already there (for debugging)
  if (!sessionStorage.getItem("dataInitialized")) {
    sessionStorage.setItem("dataInitialized", "true");
  }
}

// Get current user from session storage
function getCurrentUser() {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// Save current user to session storage
function setCurrentUser(user) {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}

// Clear current user from session storage
function clearCurrentUser() {
  sessionStorage.removeItem("currentUser");
}

// Show alert message
function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  const container = document.querySelector(".container") || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Show modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
  }
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Handle login
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.querySelector('input[name="role"]:checked').value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.email === email && u.password === password && u.role === role
  );

  if (user) {
    setCurrentUser(user);
    showAlert("Login successful!", "success");

    // Redirect based on role
    setTimeout(() => {
      switch (user.role) {
        case "admin":
          window.location.href = "admin-dashboard.html";
          break;
        case "doctor":
          window.location.href = "doctor-dashboard.html";
          break;
        case "patient":
          window.location.href = "patient-dashboard.html";
          break;
        default:
          window.location.href = "index.html";
      }
    }, 1000);
  } else {
    showAlert("Invalid credentials or role mismatch!", "danger");
  }
}

// Handle registration
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.querySelector('input[name="role"]:checked').value;

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    showAlert("User with this email already exists!", "danger");
    return;
  }

  // Create new user
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: name,
    email: email,
    password: password,
    role: role,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showAlert("Registration successful! Please login.", "success");

  // Redirect to login page
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
}

// Handle logout
function handleLogout() {
  clearCurrentUser();
  window.location.href = "index.html";
}

// Format date for display
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Get user by ID
function getUserById(id) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find((user) => user.id == id);
}

// Get doctor by ID
function getDoctorById(id) {
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  return doctors.find((doctor) => doctor.id == id);
}

// Get department by ID
function getDepartmentById(id) {
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  return departments.find((dept) => dept.id == id);
}

// Get appointments for current user
function getAppointmentsForUser() {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  switch (currentUser.role) {
    case "patient":
      return appointments.filter((appt) => appt.patientId == currentUser.id);
    case "doctor":
      return appointments.filter((appt) => appt.doctorId == currentUser.id);
    case "admin":
      return appointments;
    default:
      return [];
  }
}

// Book appointment
function bookAppointment(event) {
  event.preventDefault();

  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "patient") {
    showAlert(
      "You must be logged in as a patient to book appointments!",
      "danger"
    );
    return;
  }

  const doctorId = document.getElementById("doctor").value;
  const department = document.getElementById("department").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!doctorId || !department || !date || !time) {
    showAlert("Please fill in all fields!", "danger");
    return;
  }

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const doctor = doctors.find((d) => d.id == doctorId);

  if (!doctor) {
    showAlert("Selected doctor not found!", "danger");
    return;
  }

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const newAppointment = {
    id:
      appointments.length > 0
        ? Math.max(...appointments.map((a) => a.id)) + 1
        : 1,
    patientId: currentUser.id,
    patientName: currentUser.name,
    doctorId: parseInt(doctorId),
    doctorName: doctor.name,
    department: department,
    date: date,
    time: time,
    status: "Pending",
  };

  appointments.push(newAppointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  showAlert("Appointment booked successfully!", "success");

  // Reset form
  document.getElementById("appointmentForm").reset();

  // Refresh dashboard data
  refreshDashboard();
}

// Cancel appointment
function cancelAppointment(appointmentId) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const updatedAppointments = appointments.map((appt) => {
    if (appt.id == appointmentId) {
      return { ...appt, status: "Cancelled" };
    }
    return appt;
  });

  localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

  showAlert("Appointment cancelled successfully!", "success");

  // Refresh dashboard data
  refreshDashboard();
}

// Refresh dashboard data
function refreshDashboard() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  switch (currentUser.role) {
    case "patient":
      updatePatientStatistics();
      displayPatientAppointments();
      break;
    case "doctor":
      updateDoctorStatistics();
      displayDoctorAppointments();
      break;
    case "admin":
      updateAdminStatistics();
      displayAllAppointments();
      displayDoctorsList();
      displayDepartmentsList();
      break;
  }
}

// Update appointment status
function updateAppointmentStatus(appointmentId, status) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const updatedAppointments = appointments.map((appt) => {
    if (appt.id == appointmentId) {
      return { ...appt, status: status };
    }
    return appt;
  });

  localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

  showAlert(`Appointment ${status.toLowerCase()} successfully!`, "success");

  // Refresh dashboard data
  refreshDashboard();
}

// Display departments in dropdown
function displayDepartmentsDropdown() {
  const departmentSelect = document.getElementById("department");
  if (!departmentSelect) return;

  const departments = JSON.parse(localStorage.getItem("departments")) || [];

  departmentSelect.innerHTML = '<option value="">Select Department</option>';
  departments.forEach((dept) => {
    const option = document.createElement("option");
    option.value = dept.name;
    option.textContent = dept.name;
    departmentSelect.appendChild(option);
  });
}

// Display doctors in dropdown
function displayDoctorsDropdown() {
  const doctorSelect = document.getElementById("doctor");
  if (!doctorSelect) return;

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

  doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id;
    option.textContent = doctor.name;
    doctorSelect.appendChild(option);
  });
}

// Display patient appointments
function displayPatientAppointments() {
  const appointmentsContainer = document.getElementById("appointmentsList");
  if (!appointmentsContainer) return;

  const appointments = getAppointmentsForUser();

  if (appointments.length === 0) {
    appointmentsContainer.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

  appointments.forEach((appt) => {
    html += `
            <tr>
                <td>${appt.doctorName}</td>
                <td>${appt.department}</td>
                <td>${formatDate(appt.date)}</td>
                <td>${appt.time}</td>
                <td>
                  <span class="badge badge-${appt.status.toLowerCase()}">${
      appt.status
    }</span>
                </td>
                <td class="action-buttons">
        `;

    if (appt.status === "Pending") {
      html += `<button class="btn btn-sm btn-danger" onclick="cancelAppointment(${appt.id})">Cancel</button>`;
    } else {
      html += "-";
    }

    html += `
                </td>
            </tr>
        `;
  });

  html += `
            </tbody>
        </table>
    `;

  appointmentsContainer.innerHTML = html;
}

// Display doctor appointments
function displayDoctorAppointments() {
  const appointmentsContainer = document.getElementById("appointmentsList");
  if (!appointmentsContainer) return;

  const appointments = getAppointmentsForUser();

  if (appointments.length === 0) {
    appointmentsContainer.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Patient</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

  appointments.forEach((appt) => {
    html += `
            <tr>
                <td>${appt.patientName}</td>
                <td>${appt.department}</td>
                <td>${formatDate(appt.date)}</td>
                <td>${appt.time}</td>
                <td>${appt.status}</td>
                <td class="action-buttons">
        `;

    if (appt.status === "Pending") {
      html += `
                <button class="btn btn-sm btn-success" onclick="updateAppointmentStatus(${appt.id}, 'Approved')">Approve</button>
                <button class="btn btn-sm btn-danger" onclick="updateAppointmentStatus(${appt.id}, 'Rejected')">Reject</button>
            `;
    } else if (appt.status === "Approved") {
      html += `<button class="btn btn-sm btn-warning" onclick="updateAppointmentStatus(${appt.id}, 'Completed')">Complete</button>`;
    } else {
      html += `<span class="badge">${appt.status}</span>`;
    }

    html += `
                </td>
            </tr>
        `;
  });

  html += `
            </tbody>
        </table>
    `;

  appointmentsContainer.innerHTML = html;
}

// Display all appointments (admin)
function displayAllAppointments() {
  const appointmentsContainer = document.getElementById("appointmentsList");
  if (!appointmentsContainer) return;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  if (appointments.length === 0) {
    appointmentsContainer.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

  appointments.forEach((appt) => {
    html += `
            <tr>
                <td>${appt.patientName}</td>
                <td>${appt.doctorName}</td>
                <td>${appt.department}</td>
                <td>${formatDate(appt.date)}</td>
                <td>${appt.time}</td>
                <td>${appt.status}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="updateAppointmentStatus(${
                      appt.id
                    }, 'Approved')">Approve</button>
                    <button class="btn btn-sm btn-warning" onclick="updateAppointmentStatus(${
                      appt.id
                    }, 'Rejected')">Reject</button>
                    <button class="btn btn-sm btn-danger" onclick="cancelAppointment(${
                      appt.id
                    })">Cancel</button>
                </td>
            </tr>
        `;
  });

  html += `
            </tbody>
        </table>
    `;

  appointmentsContainer.innerHTML = html;
}

// Display doctors list
function displayDoctorsList() {
  const doctorsContainer = document.getElementById("doctorsList");
  if (!doctorsContainer) return;

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

  if (doctors.length === 0) {
    doctorsContainer.innerHTML = "<p>No doctors found.</p>";
    return;
  }

  let html = '<div class="doctor-grid">';
  doctors.forEach((doctor) => {
    html += `
            <div class="card">
                <div class="doctor-image">
                    <img src="${
                      doctor.image ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }" alt="${doctor.name}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${doctor.name}</h3>
                    <p><strong>Specialization:</strong> ${
                      doctor.specialization
                    }</p>
                    <p><strong>Experience:</strong> ${doctor.experience}</p>
                    <p><strong>Department:</strong> ${doctor.department}</p>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        `;
  });
  html += "</div>";

  doctorsContainer.innerHTML = html;
}

// Display doctors by department
function displayDoctorsByDepartment(departmentName) {
  const doctorsContainer = document.getElementById("doctorsList");
  if (!doctorsContainer) return;

  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const departmentDoctors = doctors.filter(
    (doctor) => doctor.department === departmentName
  );

  if (departmentDoctors.length === 0) {
    doctorsContainer.innerHTML = "<p>No doctors found in this department.</p>";
    return;
  }

  let html = '<div class="doctor-grid">';
  departmentDoctors.forEach((doctor) => {
    html += `
            <div class="card">
                <div class="doctor-image">
                    <img src="${
                      doctor.image ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }" alt="${doctor.name}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${doctor.name}</h3>
                    <p><strong>Specialization:</strong> ${
                      doctor.specialization
                    }</p>
                    <p><strong>Experience:</strong> ${doctor.experience}</p>
                </div>
            </div>
        `;
  });
  html += "</div>";

  doctorsContainer.innerHTML = html;
}

// Display departments list
function displayDepartmentsList() {
  const departmentsContainer = document.getElementById("departmentsList");
  if (!departmentsContainer) return;

  const departments = JSON.parse(localStorage.getItem("departments")) || [];

  if (departments.length === 0) {
    departmentsContainer.innerHTML = "<p>No departments found.</p>";
    return;
  }

  let html = '<div class="department-grid">';
  departments.forEach((dept) => {
    // Define image URLs based on department name
    let imageUrl = "";
    switch (dept.name.toLowerCase()) {
      case "cardiology":
        imageUrl =
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        break;
      case "neurology":
        imageUrl =
          "https://images.unsplash.com/photo-1581595219319-5cb5b1f0b2c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        break;
      case "orthopedics":
        imageUrl =
          "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        break;
      case "pediatrics":
        imageUrl =
          "https://images.unsplash.com/photo-1506996057269-194b97c71f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        break;
      case "ophthalmology":
        imageUrl =
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        break;
      case "dental":
        imageUrl =
          "https://images.unsplash.com/photo-1588776814234-ecb0592f0981?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
        break;
      default:
        imageUrl =
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }

    html += `
            <div class="department-card">
                <div class="department-img" style="background-image: url('${imageUrl}')"></div>
                <div class="department-content">
                    <h3>${dept.name}</h3>
                    <p>${dept.description}</p>
                    <a href="departments/${dept.name.toLowerCase()}.html" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
  });
  html += "</div>";

  departmentsContainer.innerHTML = html;
}

// Add new doctor
function addDoctor(event) {
  event.preventDefault();

  const name = document.getElementById("doctorName").value;
  const email = document.getElementById("doctorEmail").value;
  const specialization = document.getElementById("doctorSpecialization").value;
  const experience = document.getElementById("doctorExperience").value;
  const department = document.getElementById("doctorDepartment").value;

  // Simple validation
  if (!name || !email || !specialization || !experience || !department) {
    showAlert("Please fill in all fields!", "danger");
    return;
  }

  // Check if doctor with this email already exists
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    showAlert("A user with this email already exists!", "danger");
    return;
  }

  // Create new doctor user
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: name,
    email: email,
    password: "doctor123", // Default password
    role: "doctor",
    specialization: specialization,
    experience: experience,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Add to doctors list
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const newDoctor = {
    id: newUser.id,
    name: name,
    email: email,
    specialization: specialization,
    experience: experience,
    department: department,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  doctors.push(newDoctor);
  localStorage.setItem("doctors", JSON.stringify(doctors));

  showAlert("Doctor added successfully!", "success");

  // Close modal and reset form
  closeModal("addDoctorModal");
  document.getElementById("addDoctorForm").reset();

  // Refresh dashboard data
  refreshDashboard();
  updateAdminStatistics();
}

// Add new department
function addDepartment(event) {
  event.preventDefault();

  const name = document.getElementById("departmentName").value;
  const description = document.getElementById("departmentDescription").value;

  // Simple validation
  if (!name || !description) {
    showAlert("Please fill in all fields!", "danger");
    return;
  }

  // Check if department already exists
  const departments = JSON.parse(localStorage.getItem("departments")) || [];
  const existingDept = departments.find((dept) => dept.name === name);

  if (existingDept) {
    showAlert("A department with this name already exists!", "danger");
    return;
  }

  // Add new department
  const newDepartment = {
    id:
      departments.length > 0
        ? Math.max(...departments.map((d) => d.id)) + 1
        : 1,
    name: name,
    description: description,
  };

  departments.push(newDepartment);
  localStorage.setItem("departments", JSON.stringify(departments));

  showAlert("Department added successfully!", "success");

  // Close modal and reset form
  closeModal("addDepartmentModal");
  document.getElementById("addDepartmentForm").reset();

  // Refresh dashboard data
  refreshDashboard();
  updateAdminStatistics();
}

// Populate department dropdown in add doctor form
function populateDepartmentDropdown() {
  const departmentSelect = document.getElementById("doctorDepartment");
  if (!departmentSelect) return;

  const departments = JSON.parse(localStorage.getItem("departments")) || [];

  departmentSelect.innerHTML = '<option value="">Select Department</option>';
  departments.forEach((dept) => {
    const option = document.createElement("option");
    option.value = dept.name;
    option.textContent = dept.name;
    departmentSelect.appendChild(option);
  });
}

// Initialize dashboard
function initDashboard() {
  // Ensure data is initialized
  initializeData();

  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Display welcome message
  const welcomeElement = document.getElementById("welcomeMessage");
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome, ${currentUser.name}!`;
  }

  // Display user info
  const userInfoElement = document.getElementById("userInfo");
  if (userInfoElement) {
    userInfoElement.innerHTML = `
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Role:</strong> ${
              currentUser.role.charAt(0).toUpperCase() +
              currentUser.role.slice(1)
            }</p>
        `;
  }

  // Display role-specific content
  switch (currentUser.role) {
    case "patient":
      updatePatientStatistics();
      displayPatientAppointments();
      displayDepartmentsDropdown();
      displayDoctorsDropdown();
      break;
    case "doctor":
      updateDoctorStatistics();
      displayDoctorAppointments();
      break;
    case "admin":
      // Update statistics
      updateAdminStatistics();
      displayAllAppointments();
      displayDoctorsList();
      displayDepartmentsList();
      populateDepartmentDropdown();

      // Add event listeners for admin forms
      const addDoctorForm = document.getElementById("addDoctorForm");
      if (addDoctorForm) {
        addDoctorForm.addEventListener("submit", addDoctor);
      }

      const addDepartmentForm = document.getElementById("addDepartmentForm");
      if (addDepartmentForm) {
        addDepartmentForm.addEventListener("submit", addDepartment);
      }
      break;
  }
}

// Update admin dashboard statistics
function updateAdminStatistics() {
  // Get data from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const departments = JSON.parse(localStorage.getItem("departments")) || [];

  // Update statistics
  document.getElementById("totalUsers").textContent = users.length;
  document.getElementById("totalDoctors").textContent = doctors.length;
  document.getElementById("totalAppointments").textContent =
    appointments.length;
  document.getElementById("totalDepartments").textContent = departments.length;
}

// Update doctor dashboard statistics
function updateDoctorStatistics() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const doctorAppointments = appointments.filter(
    (appt) => appt.doctorId == currentUser.id
  );

  const pendingAppointments = doctorAppointments.filter(
    (appt) => appt.status === "Pending"
  ).length;
  const approvedAppointments = doctorAppointments.filter(
    (appt) => appt.status === "Approved"
  ).length;
  const uniquePatients = [
    ...new Set(doctorAppointments.map((appt) => appt.patientId)),
  ].length;

  document.getElementById("pendingAppointments").textContent =
    pendingAppointments;
  document.getElementById("approvedAppointments").textContent =
    approvedAppointments;
  document.getElementById("totalPatients").textContent = uniquePatients;
}

// Update patient dashboard statistics
function updatePatientStatistics() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const patientAppointments = appointments.filter(
    (appt) => appt.patientId == currentUser.id
  );

  const upcomingAppointments = patientAppointments.filter(
    (appt) => appt.status === "Pending" || appt.status === "Approved"
  ).length;
  const appointmentHistory = patientAppointments.length;

  // For favorite doctors, we'll count unique doctors the patient has appointments with
  const favoriteDoctors = [
    ...new Set(patientAppointments.map((appt) => appt.doctorId)),
  ].length;

  document.getElementById("upcomingAppointments").textContent =
    upcomingAppointments;
  document.getElementById("appointmentHistory").textContent =
    appointmentHistory;
  document.getElementById("favoriteDoctors").textContent = favoriteDoctors;
}

// Document ready function
document.addEventListener("DOMContentLoaded", function () {
  // Initialize data
  initializeData();

  // Set up event listeners
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  const appointmentForm = document.getElementById("appointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", bookAppointment);
  }

  // Initialize dashboard if on a dashboard page
  if (window.location.pathname.includes("-dashboard.html")) {
    // Small delay to ensure DOM is fully loaded
    setTimeout(initDashboard, 100);
  }

  // Initialize department page if on a department page
  if (window.location.pathname.includes("/departments/")) {
    const pathParts = window.location.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];
    let departmentName =
      fileName.replace(".html", "").charAt(0).toUpperCase() +
      fileName.replace(".html", "").slice(1);

    // Special case for department names which have different capitalization
    if (fileName === "ophthalmology.html") {
      departmentName = "Ophthalmology";
    } else if (fileName === "pediatrics.html") {
      departmentName = "Pediatrics";
    } else if (fileName === "dental.html") {
      departmentName = "Dental";
    } else if (fileName === "orthopedics.html") {
      departmentName = "Orthopedics";
    } else if (fileName === "neurology.html") {
      departmentName = "Neurology";
    } else if (fileName === "cardiology.html") {
      departmentName = "Cardiology";
    }

    displayDoctorsByDepartment(departmentName);
  }

  // Display departments on homepage and services page
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname.includes("services.html")
  ) {
    displayDepartmentsList();
  }

  // Set up role selection
  const roleOptions = document.querySelectorAll(".role-option");
  roleOptions.forEach((option) => {
    option.addEventListener("click", function () {
      roleOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      const roleInput = document.getElementById(this.dataset.role);
      if (roleInput) {
        roleInput.checked = true;
      }
    });
  });

  // Set up modal close buttons
  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });
});
