document.addEventListener('DOMContentLoaded', () => {
   // Function to set the theme based on the stored value in localStorage
function setTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('night-mode');
        document.getElementById('mode-toggle').textContent = 'Switch to Day Mode';
    } else {
        document.body.classList.remove('night-mode');
        document.getElementById('mode-toggle').textContent = 'Switch to Night Mode';
    }
}

function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

    // Star Rating System
    const stars = document.querySelectorAll('.stars .star');
    const ratingMessage = document.getElementById('ratingMessage');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('active'));
            const rating = star.dataset.value;
            stars.forEach(s => {
                if (s.dataset.value <= rating) s.classList.add('active');
            });
            ratingMessage.textContent = `You rated this course ${rating} stars!`;
        });
    });

    // FAQ Section Toggle
    const faqs = document.querySelectorAll('.faq');
    faqs.forEach(faq => {
        const question = faq.querySelector('.question');
        const answer = faq.querySelector('.answer');
        const svg = question.querySelector('svg');

        question.addEventListener('click', () => {
            const isExpanded = answer.style.display === 'block';
            answer.style.display = isExpanded ? 'none' : 'block';
            svg.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // Greeting App
    const greetBtn = document.getElementById('greet-btn');
    const greetingMessage = document.getElementById('greeting-message');
    greetBtn.addEventListener('click', () => {
        const hour = new Date().getHours();
        let greeting = "Hello!";
        if (hour >= 5 && hour < 12) greeting = "Good morning!";
        else if (hour >= 12 && hour < 18) greeting = "Good afternoon!";
        else if (hour >= 18 && hour < 22) greeting = "Good evening!";
        else greeting = "Good night!";
        greetingMessage.textContent = greeting;
    });

    // "Read More" Button
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreText = document.getElementById('moreText');
    readMoreBtn.addEventListener('click', () => {
        const isVisible = moreText.style.display === 'block';
        moreText.style.display = isVisible ? 'none' : 'block';
        readMoreBtn.textContent = isVisible ? 'Read More' : 'Read Less';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Toggle
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach(faq => {
        const question = faq.querySelector('.question');
        const answer = faq.querySelector('.answer');
        const svg = question.querySelector('svg');

        question.addEventListener('click', () => {
            // Toggle visibility of the answer
            const isExpanded = answer.style.display === 'true';
            answer.style.display = isExpanded ? 'false' : 'true';

            // Rotate the arrow icon
            if (svg) {
                svg.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });
});
