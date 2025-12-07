/**
 * Testimonials Carousel for OnlineTranslation.ae
 * Handles testimonial slider/carousel functionality
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('[OT] testimonials-carousel.js initialized');

  // ========================================
  // Carousel Elements
  // ========================================
  
  const carousel = document.querySelector('.testimonials-carousel');
  const carouselContainer = document.querySelector('.testimonials-container');
  const carouselTrack = document.querySelector('.testimonials-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  // Exit early if no carousel exists on the page
  if (!carousel && !carouselContainer && !carouselTrack) {
    console.log('[OT] No testimonials carousel found on this page');
    return;
  }

  // ========================================
  // Carousel State
  // ========================================
  
  let currentIndex = 0;
  let autoplayInterval = null;
  const autoplayDelay = 5000; // 5 seconds
  let isTransitioning = false;

  // ========================================
  // Initialize Carousel
  // ========================================
  
  /**
   * Initialize the carousel with dots and event listeners
   */
  function initCarousel() {
    if (testimonialCards.length === 0) {
      console.log('[OT] No testimonial cards found');
      return;
    }

    // Create dots for each testimonial
    if (dotsContainer) {
      testimonialCards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
        
        if (index === 0) {
          dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    // Add event listeners to navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', showPrevious);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', showNext);
    }

    // Start autoplay
    startAutoplay();

    // Pause autoplay on hover
    if (carousel) {
      carousel.addEventListener('mouseenter', pauseAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNav);

    // Touch/swipe support
    if (carouselTrack) {
      let touchStartX = 0;
      let touchEndX = 0;

      carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoplay();
      }, { passive: true });

      carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
      }, { passive: true });

      function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > 50) {
          showPrevious();
        } else if (swipeDistance < -50) {
          showNext();
        }
      }
    }

    console.log('[OT] Carousel initialized with ' + testimonialCards.length + ' testimonials');
  }

  // ========================================
  // Navigation Functions
  // ========================================
  
  /**
   * Go to a specific slide
   */
  function goToSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentIndex = index;

    // Update track position
    if (carouselTrack) {
      const offset = -currentIndex * 100;
      carouselTrack.style.transform = 'translateX(' + offset + '%)';
    }

    // Update active states
    updateActiveStates();

    // Reset transition lock
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  /**
   * Show next testimonial
   */
  function showNext() {
    if (isTransitioning) return;
    
    const nextIndex = (currentIndex + 1) % testimonialCards.length;
    goToSlide(nextIndex);
  }

  /**
   * Show previous testimonial
   */
  function showPrevious() {
    if (isTransitioning) return;
    
    const prevIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    goToSlide(prevIndex);
  }

  /**
   * Update active states for cards and dots
   */
  function updateActiveStates() {
    // Update cards
    testimonialCards.forEach((card, index) => {
      if (index === currentIndex) {
        card.classList.add('active');
        card.setAttribute('aria-hidden', 'false');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('active');
          dot.removeAttribute('aria-current');
        }
      });
    }

    // Update button states
    if (prevBtn) {
      prevBtn.disabled = false;
    }
    
    if (nextBtn) {
      nextBtn.disabled = false;
    }
  }

  // ========================================
  // Autoplay Functions
  // ========================================
  
  /**
   * Start autoplay
   */
  function startAutoplay() {
    if (autoplayInterval) return;
    
    autoplayInterval = setInterval(() => {
      showNext();
    }, autoplayDelay);
  }

  /**
   * Pause autoplay
   */
  function pauseAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  
  /**
   * Handle keyboard navigation
   */
  function handleKeyboardNav(e) {
    // Only handle keyboard nav if carousel is in viewport
    if (!carousel || !isElementInViewport(carousel)) {
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showNext();
    }
  }

  /**
   * Check if element is in viewport
   */
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // ========================================
  // Responsive Behavior
  // ========================================
  
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate positions on resize
      goToSlide(currentIndex);
    }, 250);
  }, { passive: true });

  // ========================================
  // Intersection Observer for Lazy Loading
  // ========================================
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start autoplay when carousel comes into view
          startAutoplay();
        } else {
          // Pause autoplay when carousel leaves view
          pauseAutoplay();
        }
      });
    }, {
      threshold: 0.5
    });

    if (carousel) {
      observer.observe(carousel);
    }
  }

  // ========================================
  // Cleanup on Page Unload
  // ========================================
  
  window.addEventListener('beforeunload', function() {
    pauseAutoplay();
    document.removeEventListener('keydown', handleKeyboardNav);
  });

  // ========================================
  // Initialize
  // ========================================
  
  initCarousel();

  console.log('[OT] testimonials-carousel.js fully loaded and ready');
});
