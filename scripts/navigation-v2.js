/**
 * Navigation JavaScript for OnlineTranslation.ae
 * Handles mobile menu, sidebar, and navigation interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('[OT] navigation-v2.js initialized');

  // ========================================
  // Mobile Sidebar Elements
  // ========================================
  
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const menuSidebar = document.getElementById('menu-sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');

  /**
   * Open the mobile sidebar
   */
  function openSidebar() {
    if (menuSidebar) menuSidebar.classList.add('is-open');
    if (sidebarOverlay) sidebarOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    console.log('[OT] Sidebar opened');
  }

  /**
   * Close the mobile sidebar
   */
  function closeSidebar() {
    if (menuSidebar) menuSidebar.classList.remove('is-open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    console.log('[OT] Sidebar closed');
  }

  // Connect desktop header mobile menu button to sidebar
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      openSidebar();
    });
  }

  // Connect mobile header sidebar toggle button
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      openSidebar();
    });
  }

  // Close sidebar when clicking the close button
  if (sidebarClose) {
    sidebarClose.addEventListener('click', function(e) {
      e.preventDefault();
      closeSidebar();
    });
  }

  // Close sidebar when clicking the overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // ========================================
  // Desktop Navigation Dropdowns
  // ========================================
  
  const desktopNav = document.getElementById('desktopNav');
  
  if (desktopNav) {
    const dropdownItems = desktopNav.querySelectorAll('.nav-item.has-dropdown');
    
    dropdownItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown-menu');
      
      if (!dropdown) return;
      
      // Open dropdown on mouse enter
      item.addEventListener('mouseenter', function() {
        this.classList.add('is-open');
        
        // Close other dropdowns
        dropdownItems.forEach(otherItem => {
          if (otherItem !== this) {
            otherItem.classList.remove('is-open');
          }
        });
      });
      
      // Close dropdown on mouse leave
      item.addEventListener('mouseleave', function() {
        this.classList.remove('is-open');
      });
      
      // Handle keyboard navigation
      if (link) {
        link.addEventListener('keydown', function(e) {
          // Open dropdown on Enter or Space
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.classList.toggle('is-open');
          }
          
          // Close dropdown on Escape
          if (e.key === 'Escape') {
            item.classList.remove('is-open');
            link.focus();
          }
        });
      }
    });
    
    // Close all dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!desktopNav.contains(e.target)) {
        dropdownItems.forEach(item => {
          item.classList.remove('is-open');
        });
      }
    });
  }

  // ========================================
  // Active Navigation Highlighting
  // ========================================
  
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Exact match
    if (href === currentPath) {
      link.classList.add('active');
    }
    
    // Partial match for section pages
    if (href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    }
  });

  // ========================================
  // Mega Menu Handling (if exists)
  // ========================================
  
  const megaDropdowns = document.querySelectorAll('.nav-item.mega-dropdown');
  
  megaDropdowns.forEach(item => {
    const megaMenu = item.querySelector('.dropdown-menu');
    
    if (!megaMenu) return;
    
    // Add mega menu specific class for styling
    megaMenu.classList.add('mega-menu');
    
    // Prevent closing when clicking inside mega menu
    megaMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });

  // ========================================
  // Mobile Navigation Gestures
  // ========================================
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  /**
   * Handle swipe gestures to close sidebar
   */
  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe left to close (at least 50px)
    if (swipeDistance < -50 && menuSidebar && menuSidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  }
  
  if (menuSidebar) {
    menuSidebar.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    menuSidebar.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  
  document.addEventListener('keydown', function(e) {
    // Close sidebar on Escape key
    if (e.key === 'Escape') {
      closeSidebar();
      
      // Also close any open dropdowns
      const openDropdowns = document.querySelectorAll('.nav-item.is-open');
      openDropdowns.forEach(item => {
        item.classList.remove('is-open');
      });
    }
  });

  // ========================================
  // Sticky Header Behavior
  // ========================================
  
  const header = document.getElementById('header');
  let lastScrollTop = 0;
  const scrollThreshold = 100;
  
  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scrolled class when scrolling down
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScrollTop) {
          // Scrolling down
          header.classList.add('header-hidden');
        } else {
          // Scrolling up
          header.classList.remove('header-hidden');
        }
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  }

  // ========================================
  // Mobile Footer Bar Active State
  // ========================================
  
  const footerItems = document.querySelectorAll('.footer-item');
  
  footerItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      footerItems.forEach(i => i.classList.remove('active-nav'));
      
      // Add active class to clicked item (if it's a button)
      if (this.tagName === 'BUTTON') {
        this.classList.add('active-nav');
      }
    });
  });

  // ========================================
  // Breadcrumb Navigation (if exists)
  // ========================================
  
  const breadcrumbs = document.querySelector('.breadcrumbs');
  
  if (breadcrumbs) {
    // Add structured data for breadcrumbs
    const breadcrumbItems = breadcrumbs.querySelectorAll('a');
    
    if (breadcrumbItems.length > 0) {
      console.log('[OT] Breadcrumb navigation detected with ' + breadcrumbItems.length + ' items');
    }
  }

  // ========================================
  // Navigation Analytics (placeholder)
  // ========================================
  
  /**
   * Track navigation clicks (integrate with analytics.js)
   */
  function trackNavClick(label, destination) {
    console.log('[OT] Navigation click:', label, '→', destination);
    
    // This can be integrated with Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'navigation_click', {
        'event_category': 'Navigation',
        'event_label': label,
        'destination': destination
      });
    }
  }
  
  // Track main navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const label = this.textContent.trim();
      const destination = this.getAttribute('href');
      trackNavClick(label, destination);
    });
  });

  console.log('[OT] navigation-v2.js fully loaded and ready');
});
