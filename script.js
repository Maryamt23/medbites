let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const slidesContainer = document.querySelector(".slides");

function updateSlide() {
  const slideWidth = slides[0].clientWidth;
  slidesContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
}

// Next button
document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

// Prev button
document.querySelector(".prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

// Auto-play every 3s
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}, 3000);

