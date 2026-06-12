const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const hoverElements = document.querySelectorAll('a, button, .tab, .project-card, .magnetic');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(255,255,255,0.05)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// Projects are now loaded securely from projects.js as PROJECT_DATA

const aiProjectsContainer = document.getElementById('ai-projects-container');
const webProjectsContainer = document.getElementById('web-projects-container');
const tabs = document.querySelectorAll('.tab');

function renderProjects() {
    aiProjectsContainer.innerHTML = '';
    webProjectsContainer.innerHTML = '';

    PROJECT_DATA.forEach((proj) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <div class="project-links">
                <a href="${proj.link}" target="_blank" class="magnetic">
                    View Project
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 10.5L10.5 4.5M10.5 4.5V10.125M10.5 4.5H4.875" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
            </div>
        `;
        
        if (proj.category === 'ai') {
            aiProjectsContainer.appendChild(card);
        } else {
            webProjectsContainer.appendChild(card);
        }
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const activeCategory = e.target.getAttribute('data-target');
        
        document.querySelectorAll('.projects-grid').forEach(grid => {
            grid.classList.remove('active');
        });
        document.getElementById(activeCategory + '-projects-container').classList.add('active');
        if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
});

if(typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    document.addEventListener("DOMContentLoaded", () => {
        renderProjects();

        const tl = gsap.timeline();
        tl.from('.hero-giant .reveal-text', { y: 150, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" })
          .from('.hero-bio', { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from('.hero-links a', { y: 10, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.4")
          .from('.marquee-container', { opacity: 0, duration: 1 }, "-=0.5");

        const statusTextEl = document.querySelector('.status-text');
        const statusDotEl = document.querySelector('.status-dot');
        
        if (statusTextEl && statusDotEl) {
            const currentHour = new Date().getHours();
            if (currentHour >= 3 && currentHour < 7) {
                statusTextEl.innerText = "Sleeping (3 AM - 7 AM)";
                statusDotEl.style.backgroundColor = "#5c7cfa";
                statusDotEl.style.boxShadow = "0 0 8px #5c7cfa";
            } else {
                statusTextEl.innerText = "Building AI Agent";
                statusDotEl.style.backgroundColor = "#00ff88";
                statusDotEl.style.boxShadow = "0 0 8px #00ff88";
            }
        }

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const progressEl = document.querySelector('.scroll-progress');
            if (progressEl) progressEl.style.width = scrolled + "%";
        });
        
        console.log("%c Designed & Built by Akhilesh Yadav ", "background: #030303; color: #fff; font-size: 14px; font-weight: bold; padding: 10px; border: 1px solid rgba(255,255,255,0.2);");

        gsap.utils.toArray('.section-header, .creative-footer').forEach(section => {
            gsap.from(section, {
                scrollTrigger: { trigger: section, start: "top 85%" },
                y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
            });
        });

        gsap.from('.cert-item', {
            scrollTrigger: { trigger: '.cert-list', start: "top 85%" },
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        });
        
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time)=>{
          lenis.raf(time * 1000)
        });
        gsap.ticker.lagSmoothing(0, 0);
    });
} else {
    document.addEventListener("DOMContentLoaded", () => {
        renderProjects();
    });
}
