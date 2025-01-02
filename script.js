function changeBackground(no){  //TODO: add posibility of changing other backgrounds than allRedirects
    let allRedirects = document.getElementById('allRedirects');
    let backgroundImages = [
        "url(media/backgrounds/background-all.svg)", 
        "url(media/backgrounds/background-abstractLandscape.svg)",
        "url(media/backgrounds/background-circularPattern.svg)", 
        "url(media/backgrounds/background-geometricWaves.svg)",
        "url(media/backgrounds/background-layeredStripes.svg)",
        "url(media/backgrounds/background-triangularMesh.svg)",
        "url(media/backgrounds/background-detailedGridlines.svg)",
        "url(media/backgrounds/background-complexDiagonalStripes.svg)",
        "url(media/backgrounds/background-diagonalStripesPattern.svg)"
    ];
    if(no>backgroundImages.length){
        allRedirects.style.backgroundImage = backgroundImages[1];
    } else {
        allRedirects.style.backgroundImage = backgroundImages[no];
    }
}

// // Save original styles
// let originalStyles = new Map();
// document.querySelectorAll("*").forEach(el => originalStyles.set(el, el.getAttribute("style")));

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('mz-gallery');
    let scrollVelocity = 0;
    let lastScrollTime = Date.now();
    let animationFrame;
    
    if (gallery) {
        gallery.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Calculate time since last scroll
            const now = Date.now();
            const deltaTime = (now - lastScrollTime) / 1000; // Convert to seconds
            lastScrollTime = now;
            
            // Update scroll velocity with dampening
            const acceleration = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 50);
            scrollVelocity = scrollVelocity * 0.8 + acceleration * 15;
            
            // Start animation if not running
            if (!animationFrame) {
                animateScroll();
            }
        });
        
        function animateScroll() {
            if (Math.abs(scrollVelocity) > 0.1) {
                gallery.scrollLeft += scrollVelocity;
                scrollVelocity *= 0.95; // Deceleration factor
                animationFrame = requestAnimationFrame(animateScroll);
            } else {
                scrollVelocity = 0;
                animationFrame = null;
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => { //prevent right click and image dragging (saving)
    // Disable right click
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Disable image dragging
    document.querySelectorAll('img').forEach(img => {
        img.draggable = false;
        img.addEventListener('mousedown', e => e.preventDefault());
    });
});

function log(msg) {
    console.log(msg);
}