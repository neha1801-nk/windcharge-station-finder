// WindCharge Station Finder – Shared App Logic

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initWindWidget();
    highlightActiveNav();
});

/* ---------- Navbar ---------- */
function initNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar__links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

/* ---------- Active Nav Highlight ---------- */
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ---------- Wind Monitoring Widget ---------- */
function initWindWidget() {
    const widget = document.querySelector('.wind-widget');
    if (!widget) return;

    updateWindData();
    setInterval(updateWindData, 5000);
}

function updateWindData() {
    const speedEl = document.getElementById('wind-speed');
    const dirEl = document.getElementById('wind-direction');
    const statusEl = document.getElementById('wind-status');
    if (!speedEl) return;

    // Simulated wind data
    const speed = (8 + Math.random() * 18).toFixed(1);
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const dir = directions[Math.floor(Math.random() * directions.length)];

    speedEl.textContent = speed + ' km/h';
    if (dirEl) dirEl.textContent = dir;

    if (statusEl) {
        if (speed >= 12) {
            statusEl.textContent = '⚡ Generating Power';
            statusEl.className = 'wind-widget__status wind-widget__status--active';
        } else {
            statusEl.textContent = '○ Low Wind';
            statusEl.className = 'wind-widget__status';
            statusEl.style.background = '#fef3e2';
            statusEl.style.color = '#e67e22';
        }
    }
}

/* ---------- Get Directions Helper ---------- */
function getDirections(lat, lng) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        // Try Apple Maps, fallback to Google Maps
        window.open(`maps://maps.apple.com/?daddr=${lat},${lng}`, '_blank');
        setTimeout(() => {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }, 500);
    } else {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
}
