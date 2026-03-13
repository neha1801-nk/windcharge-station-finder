// WindCharge Station Finder – Contact Form

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset errors
        clearErrors();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let hasError = false;

        if (!name.value.trim()) {
            showError(name, 'nameError');
            hasError = true;
        }

        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'emailError');
            hasError = true;
        }

        if (!message.value.trim()) {
            showError(message, 'messageError');
            hasError = true;
        }

        if (hasError) return;

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      Sending...
    `;

        setTimeout(() => {
            // Show success
            document.getElementById('formSuccess').classList.add('show');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Message
      `;

            // Hide success after 5 seconds
            setTimeout(() => {
                document.getElementById('formSuccess').classList.remove('show');
            }, 5000);
        }, 1200);
    });
});

function showError(input, errorId) {
    input.classList.add('error');
    document.getElementById(errorId).style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.classList.remove('error');
    });
    document.querySelectorAll('.form-error').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById('formSuccess')?.classList.remove('show');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
