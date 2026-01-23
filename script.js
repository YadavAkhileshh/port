const themes = {
    cream: {
        bg: '#F8F5F0',
        bgRgb: '248, 245, 240',
        text: '#3D3830',
        textLight: '#6B6358',
        cardBg: 'rgba(255, 255, 255, 0.35)',
        border: 'rgba(0, 0, 0, 0.04)',
        link: '#9B8B6E',
        circleColor: 'rgba(200, 185, 165, 0.3)'
    },
    blush: {
        bg: '#FAF5F3',
        bgRgb: '250, 245, 243',
        text: '#4A3F3A',
        textLight: '#7A6B62',
        cardBg: 'rgba(255, 255, 255, 0.35)',
        border: 'rgba(0, 0, 0, 0.04)',
        link: '#C49A8A',
        circleColor: 'rgba(210, 175, 165, 0.3)'
    },
    sage: {
        bg: '#F5F7F4',
        bgRgb: '245, 247, 244',
        text: '#3A4238',
        textLight: '#5A6858',
        cardBg: 'rgba(255, 255, 255, 0.35)',
        border: 'rgba(0, 0, 0, 0.04)',
        link: '#7A9A7A',
        circleColor: 'rgba(160, 185, 160, 0.3)'
    },
    lavender: {
        bg: '#F7F5F8',
        bgRgb: '247, 245, 248',
        text: '#3E3A42',
        textLight: '#6A6272',
        cardBg: 'rgba(255, 255, 255, 0.35)',
        border: 'rgba(0, 0, 0, 0.04)',
        link: '#A08AAA',
        circleColor: 'rgba(180, 165, 195, 0.3)'
    },
    mist: {
        bg: '#F4F6F7',
        bgRgb: '244, 246, 247',
        text: '#383D40',
        textLight: '#5A6368',
        cardBg: 'rgba(255, 255, 255, 0.35)',
        border: 'rgba(0, 0, 0, 0.04)',
        link: '#7A95A5',
        circleColor: 'rgba(160, 180, 195, 0.3)'
    }
};

let mobileDropdownOpen = false;

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;

    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--bg-rgb', theme.bgRgb);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--text-light', theme.textLight);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--link', theme.link);
    root.style.setProperty('--circle-color', theme.circleColor);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        const isActive = btn.classList.contains('theme-' + themeName);
        btn.classList.toggle('active', isActive);
    });

    document.querySelectorAll('.ambient-orb').forEach(orb => {
        orb.style.background = theme.circleColor;
    });

    try {
        localStorage.setItem('portfolio-theme', themeName);
    } catch (e) { }

    closeMobileDropdown();
}

function toggleMobileDropdown() {
    const dropdown = document.querySelector('.mobile-theme-dropdown');
    const toggle = document.querySelector('.mobile-theme-toggle');
    if (!dropdown || !toggle) return;

    mobileDropdownOpen = !mobileDropdownOpen;
    dropdown.classList.toggle('open', mobileDropdownOpen);
    toggle.classList.toggle('open', mobileDropdownOpen);
}

function closeMobileDropdown() {
    const dropdown = document.querySelector('.mobile-theme-dropdown');
    const toggle = document.querySelector('.mobile-theme-toggle');
    if (dropdown && toggle) {
        mobileDropdownOpen = false;
        dropdown.classList.remove('open');
        toggle.classList.remove('open');
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

function createAmbientOrbs() {
    const container = document.querySelector('.ambient-bg');
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = 'ambient-orb';
        container.appendChild(orb);
    }
}

function initThemeButtons() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const classes = Array.from(btn.classList);
            const themeClass = classes.find(c => c.startsWith('theme-') && c !== 'theme-btn');
            if (themeClass) {
                applyTheme(themeClass.replace('theme-', ''));
            }
        });
    });

    const toggle = document.querySelector('.mobile-theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileDropdown();
        });
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-theme-dropdown') && !e.target.closest('.mobile-theme-toggle')) {
        closeMobileDropdown();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createAmbientOrbs();
    initThemeButtons();
    initScrollAnimations();

    const saved = localStorage.getItem('portfolio-theme') || 'cream';
    applyTheme(saved);
});
