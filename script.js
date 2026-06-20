const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 75;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() * 0.4 - 0.2) * 2;
        this.speedY = (Math.random() * 0.4 - 0.2) * 2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        const isOverclock = document.documentElement.getAttribute('data-theme') === 'overclock';
        ctx.fillStyle = isOverclock ? 'rgba(220, 38, 38, 0.25)' : 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    let maxDistance = 110;
    const isOverclock = document.documentElement.getAttribute('data-theme') === 'overclock';
    
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                let opacity = (1 - (distance / maxDistance)) * 0.15;
                ctx.strokeStyle = isOverclock ? `rgba(220, 38, 38, ${opacity})` : `rgba(56, 189, 248, ${opacity})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateBackground);
}

initParticles();
animateBackground();

const eventsData = [
    { title: "Web Development Workshop", category: "technical", desc: "Build responsive layout structures using advanced semantic layouts." },
    { title: "AI & Machine Learning Session", category: "technical", desc: "Explore neural predictive matrix logic frameworks and neural systems." },
    { title: "Coding Challenge", category: "technical", desc: "Race against constraints to resolve core engineering algorithmic queries." },
    { title: "Resume Building Panel", category: "professional", desc: "Optimize documentation layouts and presentation syntax to clear tracking tools." },
    { title: "LinkedIn Optimization Work", category: "professional", desc: "Maximize networking impressions and establish your distinct engineering profile." },
    { title: "Career Guidance Talk", category: "professional", desc: "Connect with industrial leaders mapping out corporate paths across tech sectors." },
    { title: "Tech Quiz Arena", category: "interactive", desc: "Test structural comprehension against the clock in live computational trivia rounds." },
    { title: "Innovation Pitch", category: "interactive", desc: "Pitch architecture design blueprints and MVP builds directly to industrial judges." },
    { title: "Problem-Solving Challenge", category: "interactive", desc: "Deconstruct production edge cases and debug design components systematically." }
];

function displayCards(filteredEvents) {
    const eventsGrid = document.getElementById('events-grid');
    if (!eventsGrid) return;
    eventsGrid.innerHTML = '';
    
    if(filteredEvents.length === 0) {
        eventsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-dim); padding: 40px;">No matching records found.</p>`;
        return;
    }

    filteredEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card glass-card'; 
        card.innerHTML = `
            <span class="card-tag">${event.category}</span>
            <h3>${event.title}</h3>
            <p>${event.desc}</p>
        `;
        eventsGrid.appendChild(card);
    });
}

function filterEvents() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchText = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeCategory = activeBtn ? activeBtn.dataset.filter : 'all';

    const matched = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchText);
        const matchesCat = (activeCategory === 'all') || (event.category === activeCategory);
        return matchesSearch && matchesCat;
    });
    displayCards(matched);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links-menu');
    const clearSearch = document.getElementById('clear-search');

    if (searchInput && clearSearch) {
        searchInput.addEventListener('input', () => {
            clearSearch.style.display = searchInput.value.length > 0 ? 'block' : 'none';
            filterEvents();
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            clearSearch.style.display = 'none';
            filterEvents();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterEvents();
        });
    });

    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            item.classList.toggle('active');
        });
    });

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });

    const gridContainer = document.getElementById('events-grid');
    if (gridContainer) {
        gridContainer.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.event-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    }

    const sections = document.querySelectorAll('section, #home, #about, #events, #schedule, #faq');
    const navItems = document.querySelectorAll('.nav-item');

    if (sections.length > 0 && navItems.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let id = entry.target.getAttribute('id');
                    if (id) {
                        navItems.forEach(item => {
                            const targetHref = item.getAttribute('href');
                            if (targetHref === `#${id}`) {
                                item.style.color = 'var(--neon-blue)';
                                item.style.borderColor = 'var(--neon-blue)';
                            } else {
                                item.style.color = 'var(--text-dim)';
                                item.style.borderColor = 'transparent';
                            }
                        });
                    }
                }
            });
        }, { root: null, threshold: 0.25, rootMargin: "-25% 0px -25% 0px" });

        sections.forEach(section => sectionObserver.observe(section));
    }

    const themeToggle = document.getElementById('theme-toggle-engine');
    const modeIcon = document.getElementById('mode-icon');
    const modeText = document.getElementById('mode-text');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'overclock') {
                document.documentElement.removeAttribute('data-theme');
                modeText.innerText = "DARK MODE";
                modeIcon.className = "fa-solid fa-bolt";
            } else {
                document.documentElement.setAttribute('data-theme', 'overclock');
                modeText.innerText = "LIGHT MODE";
                modeIcon.className = "fa-solid fa-gauge-high";
            }
        });
    }

    const targetDate = new Date("October 14, 2026 09:00:00").getTime();
    setInterval(() => {
        const difference = targetDate - new Date().getTime();
        if (difference < 0) return;

        const d = Math.floor(difference / 86400000);
        const h = Math.floor((difference % 86400000) / 3600000);
        const m = Math.floor((difference % 3600000) / 60000);
        const s = Math.floor((difference % 60000) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.innerText = d < 10 ? "0" + d : d;
        if (hEl) hEl.innerText = h < 10 ? "0" + h : h;
        if (mEl) mEl.innerText = m < 10 ? "0" + m : m;
        if (sEl) sEl.innerText = s < 10 ? "0" + s : s;
    }, 1000);

    displayCards(eventsData);
});