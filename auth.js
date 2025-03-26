// User authentication state
let isAuthenticated = false;
let currentUser = null;

// Check if user is already logged in
function checkAuthState() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        isAuthenticated = true;
        updateAuthUI();
    }
}

// Sign up function
function signUp(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get existing users or create new array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        alert('Bu email allaqachon ro\'yxatdan o\'tgan!');
        return;
    }

    // Create new user
    const user = {
        fullName,
        email,
        password
    };

    // Add user to array and save
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Log in the user
    currentUser = user;
    isAuthenticated = true;
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Update UI and redirect
    alert('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
    window.location.href = 'index.html';
}

// Sign in function
function signIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Muvaffaqiyatli kirdingiz!');
        window.location.href = 'index.html';
    } else {
        alert('Email yoki parol noto\'g\'ri!');
    }
}

// Log out function
function logOut() {
    console.log('Logging out user');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html'; // Sahifani yangilash
}

// Update UI based on auth state
function updateAuthUI() {
    const authContainer = document.querySelector('.auth');
    if (!authContainer) {
        console.log('Auth container not found');
        return;
    }

    const userData = localStorage.getItem('currentUser');
    console.log('Current user data:', userData);

    if (userData) {
        const currentUser = JSON.parse(userData);
        console.log('User is authenticated:', currentUser);
        
        authContainer.innerHTML = `
            <div class="user-account">
                <button class="account-btn">
                    <i class="fas fa-user"></i>
                    <span>${currentUser.fullName}</span>
                </button>
                <div class="account-dropdown">
                    <button onclick="logOut()">Chiqish</button>
                </div>
            </div>
            <a href="cart.html" class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
            </a>
        `;
    } else {
        console.log('User is not authenticated');
        
        authContainer.innerHTML = `
            <button><a href="signup.html">Sign Up</a></button>
            <button><a href="signin.html">Sign In</a></button>
            <a href="cart.html" class="cart-icon">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
            </a>
        `;
    }
}

// Initialize auth state
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, checking auth state');
    checkAuthState();
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', signUp);
    }

    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', signIn);
    }
}); 