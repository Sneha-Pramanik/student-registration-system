// script.js
// Student registration system with local storage

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let editingIndex = null;
    
    // DOM elements
    const form = document.getElementById('registrationForm');
    const tableBody = document.getElementById('tableBody');
    const noRecordsRow = document.getElementById('noRecordsRow');
    const recordCount = document.getElementById('recordCount');
    const tableContainer = document.getElementById('tableContainer');
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');
    const deleteModal = document.getElementById('deleteModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    const closeModal = document.querySelector('.close-btn');
    const successNotification = document.getElementById('successNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const currentYear = document.getElementById('currentYear');
    
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize the system
    initSystem();
    
    // Function to initialize the system
    function initSystem() {
        displayStudents();
        updateRecordCount();
        checkScrollbar();
        
        // Set up event listeners
        form.addEventListener('submit', handleFormSubmit);
        updateBtn.addEventListener('click', handleUpdate);
        cancelDelete.addEventListener('click', closeDeleteModal);
        confirmDelete.addEventListener('click', deleteStudent);
        closeModal.addEventListener('click', closeDeleteModal);
        
        // Close modal when clicking outside
        deleteModal.addEventListener('click', function(e) {
            if (e.target === deleteModal) {
                closeDeleteModal();
            }
        });
        
        // Add input validation listeners
        document.getElementById('studentName').addEventListener('input', validateName);
        document.getElementById('studentId').addEventListener('input', validateId);
        document.getElementById('email').addEventListener('input', validateEmail);
        document.getElementById('contact').addEventListener('input', validateContact);
    }
    
    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('studentName').value.trim();
        const id = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const studentClass = document.getElementById('class').value.trim();
        const address = document.getElementById('address').value.trim();
        
        // Validate all fields
        const isNameValid = validateName();
        const isIdValid = validateId();
        const isEmailValid = validateEmail();
        const isContactValid = validateContact();
        
        // Check if any field is empty
        if (!name || !id || !email || !contact || !studentClass || !address) {
            showNotification('Please fill in all fields before submitting.', false);
            return;
        }
        
        // If validation passes
        if (isNameValid && isIdValid && isEmailValid && isContactValid) {
            // Create student object
            const student = {
                name,
                id,
                email,
                contact,
                class: studentClass,
                address
            };
            
            // Add to students array
            students.push(student);
            
            // Save to local storage
            localStorage.setItem('students', JSON.stringify(students));
            
            // Update display
            displayStudents();
            updateRecordCount();
            
            // Show success message
            showNotification('Student registered successfully!');
            
            // Reset form
            form.reset();
            
            // Clear error messages
            clearErrorMessages();
            
            // Check if scrollbar is needed
            checkScrollbar();
        } else {
            showNotification('Please fix validation errors before submitting.', false);
        }
    }
    
    // Function to display students in the table
    function displayStudents() {
        // Clear table body
        tableBody.innerHTML = '';
        
        if (students.length === 0) {
            // Show "no records" message
            tableBody.appendChild(noRecordsRow);
            noRecordsRow.style.display = '';
            scrollIndicator.style.display = 'none';
            return;
        }
        
        // Hide "no records" row
        noRecordsRow.style.display = 'none';
        
        // Add each student to the table
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>${student.class}</td>
                <td>${student.address}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-index="${index}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" data-index="${index}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                editStudent(index);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openDeleteModal(index);
            });
        });
        
        // Show scroll indicator if needed
        checkScrollbar();
    }
    
    // Function to edit a student record
    function editStudent(index) {
        const student = students[index];
        
        // Fill form with student data
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentId').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;
        document.getElementById('class').value = student.class;
        document.getElementById('address').value = student.address;
        
        // Set editing index
        editingIndex = index;
        
        // Change button visibility
        submitBtn.style.display = 'none';
        updateBtn.style.display = 'flex';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        
        // Show notification
        showNotification('Editing student record. Click "Update Record" to save changes.');
    }
    
    // Function to handle update button click
    function handleUpdate() {
        if (editingIndex === null) return;
        
        // Get form values
        const name = document.getElementById('studentName').value.trim();
        const id = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const studentClass = document.getElementById('class').value.trim();
        const address = document.getElementById('address').value.trim();
        
        // Validate all fields
        const isNameValid = validateName();
        const isIdValid = validateId();
        const isEmailValid = validateEmail();
        const isContactValid = validateContact();
        
        // Check if any field is empty
        if (!name || !id || !email || !contact || !studentClass || !address) {
            showNotification('Please fill in all fields before updating.', false);
            return;
        }
        
        // If validation passes
        if (isNameValid && isIdValid && isEmailValid && isContactValid) {
            // Update student object
            students[editingIndex] = {
                name,
                id,
                email,
                contact,
                class: studentClass,
                address
            };
            
            // Save to local storage
            localStorage.setItem('students', JSON.stringify(students));
            
            // Update display
            displayStudents();
            updateRecordCount();
            
            // Show success message
            showNotification('Student record updated successfully!');
            
            // Reset form and editing state
            form.reset();
            editingIndex = null;
            
            // Change button visibility back
            submitBtn.style.display = 'flex';
            updateBtn.style.display = 'none';
            
            // Clear error messages
            clearErrorMessages();
        } else {
            showNotification('Please fix validation errors before updating.', false);
        }
    }
    
    // Function to open delete confirmation modal
    function openDeleteModal(index) {
        editingIndex = index;
        deleteModal.classList.add('active');
    }
    
    // Function to close delete confirmation modal
    function closeDeleteModal() {
        deleteModal.classList.remove('active');
        editingIndex = null;
    }
    
    // Function to delete a student record
    function deleteStudent() {
        if (editingIndex === null) return;
        
        // Remove student from array
        students.splice(editingIndex, 1);
        
        // Save to local storage
        localStorage.setItem('students', JSON.stringify(students));
        
        // Update display
        displayStudents();
        updateRecordCount();
        
        // Show success message
        showNotification('Student record deleted successfully!');
        
        // Close modal
        closeDeleteModal();
        
        // Check if scrollbar is still needed
        checkScrollbar();
    }
    
    // Function to update the record count
    function updateRecordCount() {
        recordCount.textContent = students.length;
    }
    
    // Function to show notification
    function showNotification(message, isSuccess = true) {
        notificationMessage.textContent = message;
        
        // Set background color based on success/error
        if (isSuccess) {
            successNotification.style.background = 'linear-gradient(to right, #2ecc71, #27ae60)';
        } else {
            successNotification.style.background = 'linear-gradient(to right, #e74c3c, #c0392b)';
        }
        
        // Show notification
        successNotification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            successNotification.classList.remove('show');
        }, 3000);
    }
    
    // Function to check if scrollbar is needed and show indicator
    function checkScrollbar() {
        if (tableContainer.scrollHeight > tableContainer.clientHeight) {
            scrollIndicator.style.display = 'flex';
            
            // Hide indicator after 5 seconds
            setTimeout(() => {
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                    scrollIndicator.style.opacity = '0.8';
                }, 500);
            }, 5000);
        } else {
            scrollIndicator.style.display = 'none';
        }
    }
    
    // Validation functions
    function validateName() {
        const nameInput = document.getElementById('studentName');
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();
        
        // Check if empty
        if (name === '') {
            nameError.textContent = 'Student name is required';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Check if contains only letters and spaces
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            nameError.textContent = 'Name can only contain letters and spaces';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Clear error if valid
        nameError.textContent = '';
        nameInput.style.borderColor = '#e0e0e0';
        return true;
    }
    
    function validateId() {
        const idInput = document.getElementById('studentId');
        const idError = document.getElementById('idError');
        const id = idInput.value.trim();
        
        // Check if empty
        if (id === '') {
            idError.textContent = 'Student ID is required';
            idInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Check if contains only numbers
        const idRegex = /^\d+$/;
        if (!idRegex.test(id)) {
            idError.textContent = 'Student ID can only contain numbers';
            idInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Check if ID already exists (except when editing)
        const isEditing = editingIndex !== null;
        const existingIndex = students.findIndex((student, index) => 
            student.id === id && (!isEditing || index !== editingIndex)
        );
        
        if (existingIndex !== -1) {
            idError.textContent = 'Student ID already exists';
            idInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Clear error if valid
        idError.textContent = '';
        idInput.style.borderColor = '#e0e0e0';
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        
        // Check if empty
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Check if valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Clear error if valid
        emailError.textContent = '';
        emailInput.style.borderColor = '#e0e0e0';
        return true;
    }
    
    function validateContact() {
        const contactInput = document.getElementById('contact');
        const contactError = document.getElementById('contactError');
        const contact = contactInput.value.trim();
        
        // Check if empty
        if (contact === '') {
            contactError.textContent = 'Contact number is required';
            contactInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Check if contains only numbers
        const contactRegex = /^\d+$/;
        if (!contactRegex.test(contact)) {
            contactError.textContent = 'Contact number can only contain numbers';
            contactInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Check if at least 10 digits
        if (contact.length < 10) {
            contactError.textContent = 'Contact number must be at least 10 digits';
            contactInput.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Clear error if valid
        contactError.textContent = '';
        contactInput.style.borderColor = '#e0e0e0';
        return true;
    }
    
    // Function to clear all error messages
    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.style.borderColor = '#e0e0e0';
        });
    }
});