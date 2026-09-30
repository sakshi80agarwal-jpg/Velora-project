gsap.registerPlugin(ScrollTrigger);

// 1. Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);


// 2. PHASE 1: ENTRANCE ZOOM (Image 1 & Image 2)
const entranceTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#entrance",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: "#entrance .sticky-frame"
    }
});

entranceTL
    .to(".center-card", { opacity: 0, scale: 0.8, duration: 0.4 })
    .to(".layer-1", { scale: 2.8, opacity: 0, duration: 1 }, 0)
    .to(".layer-2", { opacity: 1, scale: 1, duration: 0.6 }, 0.2)
    .to(".layer-2", { scale: 2.2, opacity: 0, duration: 0.8 }, 0.8);


// 3. PHASE 2: HORIZONTAL TOUR (Images 3 to 8)
const slides = gsap.utils.toArray('.slide');
const horizontalTrack = document.querySelector('.horizontal-track');

const tourTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#interior",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: "#interior .sticky-frame"
    }
});

// Panning horizontally across images 3 to 8
tourTL.to(horizontalTrack, {
    x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
    ease: "none"
});

// Floating text overlay animations during horizontal scroll
slides.forEach((slide) => {
    const card = slide.querySelector('.card-overlay');
    if (card) {
        gsap.fromTo(card, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: tourTL,
                    start: "left 60%",
                    end: "left 20%",
                    toggleActions: "play reverse play reverse",
                    scrub: true
                }
            }
        );
    }
});


// 4. PHASE 3: VERTICAL FINALE ANIMATIONS (Image 9 & Grand Ending)
const finaleTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#finale",
        start: "top 70%",
        end: "top 20%",
        scrub: 1
    }
});

finaleTL
    .from(".finale-hero-bg img", { scale: 1.2, filter: "brightness(0.1)" })
    .from(".finale-header", { y: 60, opacity: 0 }, 0.2)
    .from(".spec-card", { y: 40, opacity: 0, stagger: 0.1 }, 0.4)
    .from(".action-box", { y: 40, opacity: 0 }, 0.6)
    .from(".perks-row", { y: 20, opacity: 0 }, 0.8);