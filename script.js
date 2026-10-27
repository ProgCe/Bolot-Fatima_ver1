// --- 1. Envelope Opening Logic ---
const envelopeScreen = document.getElementById('envelope-screen');
const waxSeal = document.getElementById('wax-seal');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');

let musicPlaying = false;

waxSeal.addEventListener('click', () => {
    // Trigger flap opening animation classes
    envelopeScreen.classList.add('envelope-open');
    
    // Re-enable scrolling on body
    document.body.classList.remove('no-scroll');

    // Fade out envelope screen overlay and show main content
    setTimeout(() => {
        envelopeScreen.style.opacity = '0';
        mainContent.style.opacity = '1';
        setTimeout(() => {
            envelopeScreen.style.display = 'none';
        }, 1000);
    }, 600);

    // Attempt playing audio
    toggleMusic(true);
});

// --- 2. Music Toggle Handler ---
function toggleMusic(forcePlay = false) {
    if (!musicPlaying || forcePlay) {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.className = "fas fa-volume-up text-lg text-amber-800";
        }).catch(() => {
            musicPlaying = false;
            musicIcon.className = "fas fa-volume-mute text-lg text-neutral-400";
        });
    } else {
        bgMusic.pause();
        musicPlaying = false;
        musicIcon.className = "fas fa-volume-mute text-lg text-neutral-400";
    }
}

document.getElementById('music-toggle').addEventListener('click', () => toggleMusic(false));

// --- 3. RSVP Form Submission Handler ---
function handleRSVP(event) {
    event.preventDefault();
    const form = document.getElementById('rsvp-form');
    const toast = document.getElementById('rsvp-toast');

    form.classList.add('hidden');
    toast.classList.remove('hidden');
}

// --- 4. Countdown Timer Logic ---
function startCountdown() {
    // Target date: Nov 7, 2026, 16:00:00
    const targetDate = new Date('November 7, 2026 16:00:00').getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('timer-days').innerText = "00";
            document.getElementById('timer-hours').innerText = "00";
            document.getElementById('timer-minutes').innerText = "00";
            document.getElementById('timer-seconds').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timer-days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('timer-hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('timer-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('timer-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
}

// --- 5. Scroll Reveal Intersection Observer ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

// --- 6. Floating Gold Particles Canvas Animation ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.2;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

window.onload = function() {
    startCountdown();
    initParticles();
    animateParticles();
};