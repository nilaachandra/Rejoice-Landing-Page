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
