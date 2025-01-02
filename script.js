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


document.addEventListener("DOMContentLoaded", () => { //prevent right click and image dragging (saving)
    // Disable right click
    document.addEventListener("contextmenu", e => e.preventDefault());
    
    // Disable image dragging
    document.querySelectorAll("img").forEach(img => {
        img.draggable = false;
        img.addEventListener("mousedown", e => e.preventDefault());
    });
});

function scrollToRedirects() {
    document.getElementById("allRedirects").scrollIntoView({ behavior: "smooth" });
}
function scrollToMain() {
    document.getElementById("main").scrollIntoView({ behavior: "smooth" });
}

function log(msg) {
    console.log(msg);
}

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