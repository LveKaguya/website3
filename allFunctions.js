// Utility Functions
function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginLink = document.getElementById('loginLink');
    const logoutSection = document.getElementById('logoutSection');

    if (loggedInUser) {
        loginLink.style.display = 'none';
        logoutSection.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        logoutSection.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    checkLoginStatus();
    window.location.href = 'index.html'; // Redirect to the homepage
}

// Signup Functionality
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailPattern.test(email)) {
        alert('Invalid email format.');
        return;
    }

    if (!passwordPattern.test(password)) {
        alert('Password must include uppercase, lowercase, a number, and a special character.');
        return;
    }

    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    alert('Signup successful! Please log in.');
    window.location.href = 'login.html';
});

// Login Functionality
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Incorrect email or password.');
    }
});

// Display Profile Details
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (document.getElementById('profileDetails')) {
        if (loggedInUser) {
            document.getElementById('profileDetails').innerHTML = `
                <p>Name: ${loggedInUser.name}</p>
                <p>Email: ${loggedInUser.email}</p>
            `;

            const subscription = JSON.parse(localStorage.getItem('subscription'));
            const subscriptionDetails = document.getElementById('subscriptionDetails');
            const noSubscriptionMessage = document.getElementById('noSubscriptionMessage');

            if (subscription) {
                subscriptionDetails.innerHTML = `
                    <p>Subscription Type: ${subscription.type}</p>
                    <p>Price: ${subscription.price}</p>
                    <p>Status: ${subscription.status}</p>
                `;
                noSubscriptionMessage.style.display = 'none';
            }
        } else {
            alert('Please log in first.');
            window.location.href = 'login.html';
        }
    }
});

// Handle Subscriptions
document.getElementById('subscribeButton')?.addEventListener('click', function () {
    localStorage.setItem('subscription', JSON.stringify({
        type: 'Monthly Subscription',
        price: '$29/month',
        status: 'Active'
    }));
    alert('You have successfully subscribed to the Monthly Plan!');
});

document.getElementById('lifetimeButton')?.addEventListener('click', function () {
    localStorage.setItem('subscription', JSON.stringify({
        type: 'Lifetime Subscription',
        price: '$399',
        status: 'Active'
    }));
    alert('You have successfully upgraded to the Lifetime Plan!');
});

// Payment Form Validation
document.getElementById('paymentForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expirationDate = document.getElementById('expirationDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        alert('Please enter a valid name on the card.');
        return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number.');
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
        alert('Please enter a valid expiration date (MM/YY).');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV.');
        return;
    }

    localStorage.setItem('paymentDetails', JSON.stringify({ cardName, cardNumber, expirationDate, cvv }));
    alert('Payment method saved successfully!');
    document.getElementById('paymentForm').reset();
});

// Apply Theme Based on User Preference
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    document.getElementById('mode-toggle')?.addEventListener('click', function () {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
})();
