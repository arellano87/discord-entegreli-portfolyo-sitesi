function init() {
    initIntroOverlay();
    initGsapAnimations();
    initTilt();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function initIntroOverlay() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    
    let dismissed = false;
    const dismiss = () => {
        if (dismissed) return;
        dismissed = true;
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        revealProfile();
        window.setTimeout(() => { overlay.remove(); }, 1000);
    };
    overlay.addEventListener('click', dismiss);
}

function initGsapAnimations() {
    gsap.set('.avatar-section, .content-section, .location-box', { opacity: 0, y: 20 });
}

function initTilt() {
    const card = document.querySelector('.profile');
    if (!card) return;
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;
        
        gsap.to(card, {
            duration: 0.5,
            rotationY: xPos * 25,
            rotationX: -yPos * 25,
            ease: 'power2.out',
            transformPerspective: 1200,
            transformOrigin: 'center'
        });
    });
}

function revealProfile() {
    gsap.to('.profile', {
        duration: 1.5,
        opacity: 1,
        scale: 1,
        ease: 'expo.out'
    });
    
    gsap.to('.avatar-section, .content-section, .location-box', {
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.3
    });
}
