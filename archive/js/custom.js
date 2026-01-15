/**
 * Startup Day 2026 - Custom Animations & Effects
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initBlobAnimation();
    initProgressBarAnimation();
    initSlideEnterAnimations();
});

/**
 * Enhanced blob movement with mouse interaction
 */
function initBlobAnimation() {
    const blobs = document.querySelectorAll('.blob');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Subtle mouse-following effect for blobs
    function animateBlobs() {
        blobs.forEach((blob, index) => {
            const speed = 0.02 + (index * 0.005);
            const rect = blob.getBoundingClientRect();
            const blobCenterX = rect.left + rect.width / 2;
            const blobCenterY = rect.top + rect.height / 2;

            const deltaX = (mouseX - blobCenterX) * speed;
            const deltaY = (mouseY - blobCenterY) * speed;

            blob.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        requestAnimationFrame(animateBlobs);
    }

    // Start animation only on larger screens
    if (window.innerWidth > 768) {
        animateBlobs();
    }
}

/**
 * Animate progress bar fill on slide 4 (Advice #1)
 */
function initProgressBarAnimation() {
    Reveal.on('slidechanged', event => {
        // Check if we're on the "Start Before You're Ready" slide (index 3)
        if (event.indexh === 3) {
            setTimeout(() => {
                const waitingBar = document.querySelector('.progress-bar.waiting .fill');
                const startingBar = document.querySelector('.progress-bar.starting .fill');

                if (waitingBar) waitingBar.style.width = '10%';
                if (startingBar) startingBar.style.width = '85%';
            }, 500);
        }
    });
}

/**
 * Add entrance animations when slides become visible
 * Resets stagger-in animations so they replay on each slide visit
 */
function initSlideEnterAnimations() {
    Reveal.on('slidechanged', event => {
        const currentSlide = event.currentSlide;
        const previousSlide = event.previousSlide;

        // Reset animations on the slide we're leaving
        if (previousSlide) {
            const prevStaggerElements = previousSlide.querySelectorAll('.stagger-in');
            prevStaggerElements.forEach(el => {
                el.style.animation = 'none';
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
            });
        }

        // Reset and replay fade-in animations
        const fadeElements = currentSlide.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = '';
        });

        // Reset and trigger stagger-in animations for current slide
        const staggerElements = currentSlide.querySelectorAll('.stagger-in');
        staggerElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = ''; // Let CSS take over
        });
    });
}

/**
 * Keyboard shortcuts info
 */
console.log(`
%c Startup Day 2026 - Presentation Controls %c

%cNavigation:%c
→ or Space: Next slide
← : Previous slide
Esc: Overview mode
F: Fullscreen

%cTip:%c Press 'O' for slide overview!

`,
'background: linear-gradient(135deg, #FF8A80, #9B59B6); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;',
'',
'color: #FF8A80; font-weight: bold;',
'',
'color: #9B59B6; font-weight: bold;',
''
);

/**
 * Add confetti effect on thank you slide (optional - uncomment if desired)
 */
/*
function initConfetti() {
    Reveal.on('slidechanged', event => {
        // Last slide (Thank You)
        if (event.indexh === Reveal.getTotalSlides() - 1) {
            createConfetti();
        }
    });
}

function createConfetti() {
    const colors = ['#E8D5F2', '#B8E8D1', '#FFD5C8', '#FF8A80', '#90CAF9', '#FFF59D'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 1000;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
*/

/**
 * Touch swipe support enhancement
 */
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            Reveal.next();
        } else {
            Reveal.prev();
        }
    }
}
