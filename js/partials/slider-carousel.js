document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll('.hero__slider-img-item');
    const duration = 7;

    const positions = [
        { x: -300, y: -150, scale: 0.5, z: -200, zIndex: 2, opacity: 1 }, // Left background
        { x: 0, y: 50, scale: 0.8, z: 0, zIndex: 3, opacity: 1 },           // Center front
        { x: 300, y: -150, scale: 0.5, z: -200, zIndex: 1, opacity: 0.7 } // Right background
    ];

    // Set initial positions
    items.forEach((item, i) => {
        const pos = positions[i];
        gsap.set(item, {
            x: pos.x,
            y: pos.y,
            scale: pos.scale,
            z: pos.z,
            zIndex: pos.zIndex,
            opacity: pos.opacity,
            xPercent: -50,
            yPercent: -55
        });
    });

    // Track current position for each item
    let currentPositions = [0, 1, 2];

    function animateCarousel() {
        // Rotate positions left: [0,1,2] -> [1,2,0]
        currentPositions = [currentPositions[1], currentPositions[2], currentPositions[0]];

        items.forEach((item, i) => {
            const pos = positions[currentPositions[i]];

            gsap.to(item, {
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                z: pos.z,
                zIndex: pos.zIndex,
                opacity: pos.opacity,
                duration: duration,
                ease: "linear",
                onComplete: i === 0 ? animateCarousel : null // Chain next animation
            });
        });
    }

    animateCarousel();
});