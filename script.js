document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const hiddenElements = document.querySelectorAll(".hidden");
  const nameContainer = document.querySelector(".name-container");
  const navbar = document.getElementById("navbar");
  const homeSection = document.querySelector(".home-section");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const carouselTrack = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const indicators = document.querySelectorAll(".indicator");

  // Carousel logic
  let currentIndex = 0;
  const totalSlides = 3; // Number of slides
  const angle = 120; // Rotation angle for each slide

  // Function to update the active indicator
  function updateIndicators(index) {
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Function to rotate the carousel
  function rotateCarousel(direction) {
    if (direction === "next") {
      currentIndex = (currentIndex + 1) % totalSlides;
    } else if (direction === "prev") {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }

    const rotateY = currentIndex * -angle;
    carouselTrack.style.transform = `rotateY(${rotateY}deg)`;
    updateIndicators(currentIndex); // Update indicators
  }

  // Event listener for the next button
  nextButton.addEventListener("click", () => {
    rotateCarousel("next");
  });

  // Event listener for the previous button
  prevButton.addEventListener("click", () => {
    rotateCarousel("prev");
  });

  // Event listeners for the indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index;
      const rotateY = currentIndex * -angle;
      carouselTrack.style.transform = `rotateY(${rotateY}deg)`;
      updateIndicators(currentIndex); // Update indicators
    });
  });

  // Initialize the first indicator as active
  updateIndicators(currentIndex);

  // Calculate the bottom of the home section
  const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;

  // Scroll-triggered animations for subheaders
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // Reset animation when out of view
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  hiddenElements.forEach((el) => observer.observe(el));

  // Name sliding effect on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > homeSectionBottom / 2.6) {
      nameContainer.style.transform = "translateX(150%)"; // Slide name to the right
    } else {
      nameContainer.style.transform = "translateX(0)"; // Slide name back in
    }
  });

  // Function to toggle navbar text color
  function toggleNavbarTextColor() {
    if (window.scrollY > homeSectionBottom - 10) {
      navbar.classList.add("black-text"); // Add class for black text
    } else {
      navbar.classList.remove("black-text"); // Remove class for white text
    }
  }

  // Initial check on page load
  toggleNavbarTextColor();

  // Update on scroll
  window.addEventListener("scroll", toggleNavbarTextColor);

  // Show/hide the scroll-to-top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when the button is clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  });
});