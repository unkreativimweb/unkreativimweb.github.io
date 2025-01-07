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
let mouseDown = false;
let startX, scrollLeft;
let lastX;
let frameCounter = 0;
let accumulatedDelta = 0;
const FRAME_THRESHOLD = 25; //adjust this value, higher value means less frames
const slider = document.querySelector('#mz-gallery');

if(slider){
    const startDragging = (e) => {
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
    
    const stopDragging = () => {
        mouseDown = false;
        slider.style.cursor = 'grab';
        // Apply any remaining delta
        if (accumulatedDelta !== 0) {
            slider.scrollLeft -= accumulatedDelta;
        }
        frameCounter = 0;
        accumulatedDelta = 0;
        console.log('stopDragging:', {
            startX,
            scrollLeft,
            mouseX: e.pageX,
            time: performance.now()
        });
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
        console.log('Move:', {
            startX,
            scrollLeft,
            mouseX: e.pageX,
            time: performance.now()
        });
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

function log(msg) {
    console.log(msg);
}

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


// FIXME: the canvas is not correctly positioned (i think)
function drawCircle(centerX, centerY) {
    const canvas = document.getElementById('canvas');

    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    } else {
        console.log('Canvas element found:', canvas);
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const radius = 10;
    // let circle
    
    // circle.style.left = centerX + 'px';
    // circle.style.top = centerY + 'px';
    // circle.style.display = 'block';

    // context.beginPath();
    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    // context.fillStyle = 'green';
    // context.fill();
    // context.lineWidth = 5;
    // context.strokeStyle = '#003300';
    // context.stroke();

    console.log('Drawing circle at:', {
        x: centerX,
        y: centerY
    });
    

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fill();
    ctx.stroke();
}