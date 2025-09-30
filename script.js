document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#navbar ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Gallery (only runs if slides exist) 
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (slides.length > 0 && slidesContainer) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlide() {
      const slideWidth = slides[0].clientWidth;
      slidesContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
      });
    }

    // Auto-play every 3s
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
    }, 3000);
  }
});
