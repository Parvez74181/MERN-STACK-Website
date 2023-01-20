const AOS = (cards) => {
  cards.forEach((card) => {
    window.addEventListener("scroll", () => {
      let observer = new IntersectionObserver(
        (entrys) => {
          entrys.forEach((entry) => {
            if (entry.isIntersecting) {
              // The element has entered the viewport
              card.style.opacity = 1; // Fade in the element
              card.classList.add("scale-in-center");
            } else {
              // The element has left the viewport
              card.style.opacity = 0; // Fade out the element
              card.classList.remove("scale-in-center");
            }
          });
        },
        { rootMargin: "100px" }
      );
      observer.observe(card);
    });
  });
};

export default AOS;
