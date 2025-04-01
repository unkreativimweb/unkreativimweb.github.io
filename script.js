function changeBackground(no){  //TODO: add posibility of changing other backgrounds than allRedirects
    let allRedirects = document.getElementById("allRedirects");
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

// for the gallery-dragging
let fullStop;
let mouseDown = false;
let startX, scrollLeft;
let lastX;
let frameCounter = 0;
let accumulatedDelta = 0;
const FRAME_THRESHOLD = 200; //adjust this value, higher value means less frames
const slider = document.querySelector('#mz-gallery');

if(slider){
    const startDragging = (e) => {
        breakAutoSlide = true;
        log("breakAutoSlide" + breakAutoSlide);
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        lastX = e.pageX;
        frameCounter = 0;
        accumulatedDelta = 0;
        slider.style.cursor = 'grabbing';
        console.log('startDragging:', {
            startX,
            scrollLeft,
            mouseX: e.pageX,
            time: performance.now()
        });
    }
    
    const stopDragging = (e) => {
        if (!mouseDown) return;
        
        breakAutoSlide = false;
        mouseDown = false;
        slider.style.cursor = 'grab';
        
        // Clear any pending frame updates
        frameCounter = 0;
        if (accumulatedDelta !== 0) {
            slider.scrollLeft -= accumulatedDelta;
            accumulatedDelta = 0;
        }
    
        // Update button state
        const toggleButton = document.getElementById("toggleScroll");
        if (toggleButton) {
            toggleButton.dataset.state = 'paused';
            toggleButton.textContent = '▶ play';
        }
    
        // Remove mousemove listener temporarily to prevent ghost dragging
        slider.removeEventListener('mousemove', move);
        
        // Re-add the listener after a short delay
        setTimeout(() => {
            slider.addEventListener('mousemove', move, { passive: false });
        }, 50);
    }
        
    const move = (e) => {
        if (!mouseDown) return;
        
        e.preventDefault();
        
        const deltaX = e.pageX - lastX;
        lastX = e.pageX;
        
        accumulatedDelta += deltaX;
        frameCounter++;
        
        if (frameCounter >= FRAME_THRESHOLD) {
            slider.scrollLeft -= accumulatedDelta;
            console.log('Scroll update:', {
                accumulatedDelta,
                newScrollLeft: slider.scrollLeft,
                frame: frameCounter
            });
            frameCounter = 0;
            accumulatedDelta = 0;
        }
        // console.log('Move:', {
        //     startX,
        //     scrollLeft,
        //     mouseX: e.pageX,
        //     time: performance.now()
        // });
    }
    
    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('mousemove', move, { passive: false });
    slider.addEventListener('mouseup', stopDragging);
    slider.addEventListener('mouseleave', stopDragging);   
}
//  ^ is for gallery dragging


// v is to stop right click and image dragging
document.addEventListener("DOMContentLoaded", () => {
    // Disable right click
    document.addEventListener("contextmenu", e => e.preventDefault());
    
    // Disable image dragging
    document.querySelectorAll("img").forEach(img => {
        img.draggable = false;
        img.addEventListener("mousedown", e => e.preventDefault());
    });
});
// ^ is to stop right click and image dragging

// v is for scrolling in index.html
function scrollToRedirects() {
    document.getElementById("allRedirects").scrollIntoView({ behavior: "smooth" });
}
function scrollToMain() {
    document.getElementById("main").scrollIntoView({ behavior: "smooth" });
}
// ^ is for scrolling in index.html

// v is for the showing and hiding of the legend in personal.html
function showSpecificationsWork() {
    let internship = document.getElementsByClassName("internship");
    let minijob = document.getElementsByClassName("mini-job");
    let holidayjob = document.getElementsByClassName("holiday-job");
    let legend = document.getElementById("workLegend");

    for (let i = 0; i < internship.length; i++) {
        internship[i].style.color = "red";
    }
    for (let i = 0; i < minijob.length; i++) {
        minijob[i].style.color = "blue";
    }
    for (let i = 0; i < holidayjob.length; i++) {
        holidayjob[i].style.color = "green";
    }

    legend.classList.add("visible");
}

function hideSpecificationsWork() {
    let internship = document.getElementsByClassName("internship");
    let minijob = document.getElementsByClassName("mini-job");
    let holidayjob = document.getElementsByClassName("holiday-job");
    let legend = document.getElementById("workLegend");

    for (let i = 0; i < internship.length; i++) {
        internship[i].style.color = "black";
    }
    for (let i = 0; i < minijob.length; i++) {
        minijob[i].style.color = "black";
    }
    for (let i = 0; i < holidayjob.length; i++) {
        holidayjob[i].style.color = "black";
    }

    legend.classList.remove("visible");
}
// ^ is for the showing and hiding of the legend in personal.html

// v is for tracking cursor movements
const redirects = document.getElementById('allRedirects');

// Debug check 1: Element exists
console.log('Element found:', redirects);

redirects.addEventListener('mousemove', function(e) {

    try {
        // console.log(redirects)
        var cursorX = e.clientX * 100 / redirects.offsetWidth;
        var cursorY = e.clientY * 100 / redirects.offsetHeight;

        // console.log({
        //     'cursor Position': cursorX.toFixed(2) + " " + cursorY.toFixed(2)
        // });
        drawCircle(e.clientX, e.clientY);
    } catch (error) {
        console.error('Error tracking cursor position:', error.message);
        console.debug('Error details:', error);
    }
});

// FIXME: shit must be deleted, once the cursor is back ontop of page or make it universal for all of index.html
function drawCircle(centerX, centerY) {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();

    if (!canvas) return;
    
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Convert coordinates
    const x = centerX - rect.left;
    const y = centerY - rect.top;
    
    // Draw main circle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();
    
    // Draw outer ring
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw small inner circle
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
}
// TODO: do in css maybe=? (Adds hover effects for redirects)
document.querySelectorAll('.redirects').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.transition = 'all 0.3s ease';
        e.target.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'none';
    });
});




// button in gallery.html to scroll to the beginning
function scrollToBegin() {
    breakAutoSlide = true;
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    const slider = document.querySelector('#mz-gallery');
    slider.scrollLeft = -100000;
}

function scrollAuto() {
    const slider = document.querySelector('#mz-gallery');
    const sliderWidth = slider.scrollWidth-500;
    breakAutoSlide = false;
    
    autoSlideInterval = setInterval(() => {
        if (!breakAutoSlide) {
            if(slider.scrollLeft < sliderWidth) {  // Changed from != to < to prevent overshoot
                slider.scrollTo({
                    left: slider.scrollLeft + 10,// Smaller increment for smoothness
                    behavior: 'auto'  // Use 'auto' instead of default for better performance
                });
            } else {
                console.log('Auto slide reset');
                slider.scrollTo({
                    left: 0,
                    behavior: 'auto'
                });
            }
        } else {
            clearInterval(autoSlideInterval);
        }
    }, 5);  // Decreased interval from 15ms to 5ms for faster updates
}
// ^ is for auto scrolling in gallery.html

// v is for play/pause button in gallery.html
$('body').on('click', '.pausePlayBtn', function(e){
    console.log("detected click");
	e.preventDefault();
	if ( $(this).hasClass('play') ) {
		$(this).removeClass('play');
		$(this).addClass('pause');
	} else {
		$(this).removeClass('pause');
		$(this).addClass('play');
	}
});

function toggleScroll() {
    const button = document.getElementById('toggleScroll');
    if (!button) return;
    
    if (button.dataset.state === 'paused') {
        // Start scrolling
        scrollAuto();
        button.dataset.state = 'playing';
        button.textContent = '⏸ pause';
    } else {
        // Stop scrolling
        breakAutoSlide = true;
        button.dataset.state = 'paused';
        button.textContent = '▶ play';
    }
}
// ^ is for play/pause button in gallery.html

//FIXME: not working at all

// for debugging
function setZIndex(id, newIndex) {
    console.log(document.getElementById(id))
    let element = document.getElementById(id);
    element.style.setZIndex = newIndex;
} 

function getElementStyles(elementId) {
    let element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found.`);
        return [];
    }
    
    let styles = [];
    let computedStyle = window.getComputedStyle(element);
    let defaultStyle = window.getComputedStyle(document.createElement(element.tagName));
    
    Array.from(computedStyle).forEach(prop => {
        let computedValue = computedStyle.getPropertyValue(prop);
        let defaultValue = defaultStyle.getPropertyValue(prop);
        
        if (computedValue !== defaultValue) {
            styles.push({
                property: prop,
                value: computedValue,
                defaultValue: defaultValue
            });
        }
    });
    
    return styles;
}

function compareElementStyles(elementId1, elementId2) {
    let styles1 = getElementStyles(elementId1);
    let styles2 = getElementStyles(elementId2);
    
    let differences = [];
    
    // Check styles from first element
    styles1.forEach(style1 => {
        let matchingStyle = styles2.find(style2 => style2.property === style1.property);
        if (!matchingStyle || matchingStyle.value !== style1.value) {
            differences.push({
                property: style1.property,
                [elementId1]: style1.value,
                [elementId2]: matchingStyle ? matchingStyle.value : 'not set'
            });
        }
    });

    // Check for styles in second element that aren't in first
    styles2.forEach(style2 => {
        let existsInFirst = styles1.some(style1 => style1.property === style2.property);
        if (!existsInFirst) {
            differences.push({
                property: style2.property,
                [elementId1]: 'not set',
                [elementId2]: style2.value
            });
        }
    });
    
    return differences;
}

function log(msg) {
    console.log(msg);
}