// Event listener when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to the Registration/Login/Profile Page!');
    
    // Fetch and fill user profile if on the profile page
    if (document.getElementById('profileForm')) {
        fetchUserProfile();
    }
});

// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contactNo').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate email (only Gmail allowed)
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        Swal.fire('Error', 'Please enter a valid Gmail address!', 'error');
        return;
    }

    // Validate password length
    if (password.length < 8) {
        Swal.fire('Error', 'Password must be at least 8 characters long!', 'error');
        return;
    }

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
        Swal.fire('Error', 'Passwords do not match!', 'error');
        return;
    }

    // Save user data in localStorage (for demo purposes)
    const userData = {
        username,
        email,
        contactNo,
        password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // Debugging: Check that the users are saved
    console.log('Users saved in localStorage:', users);

    // Show success prompt and redirect
    Swal.fire('Success', 'Registration successful! You can now login.', 'success').then(() => {
        window.location.href = 'login.html';  // Redirect to the login page
    });
});


// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        Swal.fire('Success', 'Login successful!', 'success').then(() => {
            window.location.href = 'user_home.html'; // Redirect to user home page
        });
    } else {
        Swal.fire('Error', 'Invalid credentials. Please try again or register.', 'error');
    }
});

// Fetch and Fill User Profile (for testing, if needed)
function fetchUserProfile() {
    const username = localStorage.getItem('loggedInUsername');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === username);

    if (user) {
        document.getElementById("username").value = user.username;
        document.getElementById("email").value = user.email;
        document.getElementById("contact").value = user.contactNo;
    } else {
        Swal.fire('Error', 'No user found!', 'error');
    }
}

// Update Profile (for testing)
document.getElementById('updateProfileForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contact').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate if password and confirm password match
    if (password !== confirmPassword) {
        Swal.fire('Error', 'Passwords do not match!', 'error');
        return;
    }

    // Update user data in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex !== -1) {
        users[userIndex] = { username, email, contactNo, password };
        localStorage.setItem('users', JSON.stringify(users));
        
        Swal.fire('Success', 'Profile updated successfully!', 'success').then(() => {
            window.location.href = 'user_home.html';  // Redirect to user home page after update
        });
    } else {
        Swal.fire('Error', 'User not found in the system!', 'error');
    }
});
