// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let autoplayInterval;

    function updateCarousel() {
        if (!track) return;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Function to show slide
    function showSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        updateCarousel();
    }

    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Start autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = window.setInterval(nextSlide, 4000);
    }

    // Pause autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (carousel && carousel.closest('section')) {
            if (e.key === 'ArrowLeft') {
                stopAutoplay();
                prevSlide();
                startAutoplay();
            }
            if (e.key === 'ArrowRight') {
                stopAutoplay();
                nextSlide();
                startAutoplay();
            }
        }
    });

    // Initialize carousel
    showSlide(0);
    startAutoplay();

    // Responsive: pause autoplay on mobile during interaction
    if (window.innerWidth < 768) {
        slides.forEach(slide => {
            slide.addEventListener('touchstart', stopAutoplay);
            slide.addEventListener('touchend', startAutoplay);
        });
    }
});
document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (!active) return;
    if (active.classList && active.classList.contains('react-btn')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            active.click();
        }
    }
});
