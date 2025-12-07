/**
 * Main JavaScript for OnlineTranslation.ae
 * Handles theme toggling and core UI interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('[OT] main-v2.js initialized');

  // ========================================
  // Theme Toggle Functionality
  // ========================================
  
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const body = document.body;

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add('theme-' + savedTheme);

  /**
   * Update theme toggle icons based on current theme
   */
  function updateThemeIcons() {
    const isDark = body.classList.contains('theme-dark');
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    
    // Update desktop theme toggle icon
    if (themeToggle) {
      const desktopIcon = themeToggle.querySelector('i');
      if (desktopIcon) {
        desktopIcon.className = 'fas ' + icon;
      }
    }
    
    // Update mobile theme toggle icon
    if (mobileThemeToggle) {
      const mobileIcon = mobileThemeToggle.querySelector('i');
      if (mobileIcon) {
        mobileIcon.className = 'fas ' + icon;
      }
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme(event) {
    event.preventDefault();
    
    const isDark = body.classList.contains('theme-dark');
    
    if (isDark) {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
      console.log('[OT] Theme switched to light');
    } else {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
      console.log('[OT] Theme switched to dark');
    }
    
    updateThemeIcons();
  }

  // Attach event listeners to theme toggle buttons
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize icons on page load
  updateThemeIcons();

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (!href || href === '#') {
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // Form Enhancement (if forms exist)
  // ========================================
  
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Add loading state on submit
    form.addEventListener('submit', function() {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn && !submitBtn.disabled) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }
    });
  });

  // ========================================
  // Image Lazy Loading Fallback
  // ========================================
  
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    console.log('[OT] Native lazy loading supported for ' + images.length + ' images');
  } else {
    // Fallback for browsers that don't support lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

  // ========================================
  // External Link Handling
  // ========================================
  
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    // Ensure external links have proper security attributes
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // ========================================
  // Print Styles Trigger
  // ========================================
  
  window.addEventListener('beforeprint', function() {
    console.log('[OT] Preparing page for printing');
    // Force light theme for printing
    body.classList.add('printing');
  });

  window.addEventListener('afterprint', function() {
    console.log('[OT] Print completed');
    body.classList.remove('printing');
  });

  // ========================================
  // Accessibility: Focus Visible
  // ========================================
  
  // Add focus-visible class for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      body.classList.add('user-is-tabbing');
    }
  });

  document.addEventListener('mousedown', function() {
    body.classList.remove('user-is-tabbing');
  });

  console.log('[OT] main-v2.js fully loaded and ready');
});
