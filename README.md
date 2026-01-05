Student Registration System Project
Assignment Submission
Course: Web Development
Assignment: 1 - Student Registration System
Student Name: Sneha Pramanik
Date: 05/01/2026
GitHub Repository: [Your GitHub Link Here]

1. Introduction
Hi sir/madam, this is my submission for the JavaScript DOM Manipulation assignment. I created a Student Registration System that lets users add, edit, and delete student records. I tried to make it look professional while keeping it easy to use.

2. What I Built
I made a web application where you can:

Add new students with their details

See all registered students in a table

Edit student information if something is wrong

Delete students when needed

All data stays saved even if you close the browser

3. Files in My Project
index.html
This is the main page. It has:

The header with the title

The form for entering student details

The table for showing all students

A modal (pop-up) for confirming deletions

A notification system for success messages

style.css
This file makes everything look nice. I made sure:

It works on phones, tablets, and computers

The colors are easy on the eyes

Everything is properly spaced

Buttons and forms look clean

There are some simple animations

script.js
This is where all the logic is. It handles:

Saving and loading data from browser storage

Validating the form inputs

Adding, editing, and deleting students

Showing notifications

Managing the scrollbar

4. How to Run My Project
Download all three files (index.html, style.css, script.js)

Put them in the same folder

Open index.html in your browser (just double-click it)

That's it! No installation needed.

5. How to Use the System
Adding a Student
Fill in all the fields in the form

Click "Register Student"

You'll see a success message

The student appears in the table below

Editing a Student
Click the "Edit" button next to the student

The form fills with their details

Make your changes

Click "Update Record"

Deleting a Student
Click the "Delete" button

A confirmation window pops up

Click "Delete" to remove the student

6. Validation Rules I Implemented
I made sure the form checks for:

Student Name: Only letters and spaces allowed

Student ID: Only numbers, and it must be unique

Email: Must look like a proper email (with @ and .)

Contact Number: Only numbers, at least 10 digits

All Fields: Must be filled (can't be empty)

If you enter something wrong, it shows an error message below the field.

7. Challenges I Faced
LocalStorage: Figuring out how to save data so it doesn't disappear on refresh was tricky at first. I used JSON.stringify and JSON.parse to store objects.

Editing Records: Making the form switch between "add" and "edit" modes was challenging. I had to keep track of which student was being edited.

Responsive Design: Getting the table to look good on mobile was hard. I ended up making it scroll horizontally on small screens.

Form Validation: Writing all the regex patterns and showing error messages in the right place took some time to get right.

8. What I Learned
How to use localStorage to save data between sessions

Better understanding of form validation with JavaScript

How to create modal dialogs for confirmations

Making responsive tables that work on all devices

How to use CSS animations to make the interface smoother

9. Assignment Requirements Check
Task 1: Basic Structure (5 marks)
✅ Created index.html with proper structure

✅ Added meaningful title and meta tags

✅ Used semantic HTML tags

Task 2: Header (5 marks)
✅ Catchy title "Student Registration System"

✅ Brief description of what the system does

Task 3: Form and Input Fields (5 marks)
✅ Form with all required fields

✅ Good styling and layout

✅ Includes name, ID, email, contact, class, and address

Task 4: Display Section (15 marks)
✅ Section to display registered students

✅ Shows all student details clearly

✅ Fully responsive on all screen sizes

Task 5: Styling and Design (20 marks)
✅ Applied CSS for visual appeal

✅ Proper spacing and alignment

✅ Good color scheme for readability

Task 6: JavaScript Functionality (40 marks)
✅ Add new student records - works

✅ Edit existing records - works

✅ Delete records with confirmation - works

✅ Data persists after refresh (localStorage) - works

✅ Input validation for all fields - works

✅ Can't add empty rows - works

✅ Dynamic scrollbar - works

Task 7: Documentation and Comments (10 marks)
✅ Organized file structure (no nested folders)

✅ Comments in code explaining important parts

✅ This README file

✅ GitHub repository with separate commits

10. Extra Features I Added
Success Notifications: Shows a green message when you add/edit/delete

Record Counter: Shows how many students are registered

Scroll Indicator: Shows when there are more records to scroll

Hover Effects: Buttons and cards have nice hover animations

Form Reset Button: Clears the form with one click

11. Testing I Did
I tested my project on:

Chrome (Windows) - Everything works

Firefox (Windows) - Everything works

Edge (Windows) - Everything works

My Android phone - Works well

iPad tablet - Works well

I tested:

Adding students with correct and wrong data

Editing students

Deleting students

Refreshing the page (data stays)

Different screen sizes

12. Code Structure
HTML Structure
text
index.html
├── Header (title and description)
├── Main Content
│   ├── Registration Form
│   └── Display Table
├── Footer
├── Delete Confirmation Modal
└── Success Notification
CSS Organization
I organized my CSS:

Reset and base styles

Header styles

Form styles

Table styles

Modal styles

Responsive styles (mobile, tablet, desktop)

JavaScript Functions
Main functions I created:

initSystem() - Initializes everything when page loads

handleFormSubmit() - Handles form submission

displayStudents() - Shows all students in table

editStudent() - Puts student data in form for editing

deleteStudent() - Removes a student

Validation functions for each field

13. GitHub Repository
I created a GitHub repository with separate commits:

First commit: Added HTML structure

Second commit: Added CSS styling

Third commit: Added JavaScript functionality

Fourth commit: Added README file

You can see my commit history shows I worked on each part separately.

16. Submission Files
I'm submitting these files:

index.html - Main HTML file

style.css - CSS file for styling

script.js - JavaScript file for functionality

README.md - This documentation file

All files are in the same folder with no nested structure.

Thank you for reviewing my assignment, sir/Madam. I worked hard on it and learned a lot about DOM manipulation and JavaScript.

Student Signature:
Sneha Pramanik

Date Submitted:
05/01/2026