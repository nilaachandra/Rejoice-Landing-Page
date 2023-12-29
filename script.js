gsap.registerPlugin(ScrollTrigger);

//locomotive and scrollTrigger
const locomotiveAnimations = () => {
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveAnimations()

//Cursor
function customCursor() {
  const page1Content = document.querySelector(".page1-content");
  const cursor = document.querySelector(".cursor");

  page1Content.addEventListener("mousemove", function (mouse) {
    gsap.to(cursor, {
      x: mouse.x,
      y: mouse.y,
    });
  });
  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
customCursor();

let tl = gsap.timeline()
// tl.from(".page1-content nav h3, .page1-content nav h4",{
//     y: 10,
//     stagger: 0.2,
//     duration:1
// })
tl.from(".page1-content h1 span",{
    y:100,
    opacity: 0,
    duration:0.5,
    stagger: 0.1,
})

tl.to("#create", {
  y:'0%',
  duration: 0.4,
  stagger: 0.1,
  scrollTrigger:{
    trigger: "#page3",
    scroller: "#main",
    start: "top 80%",
    end: "top 20%",
    scrub: 2
  }
})