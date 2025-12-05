/**
 * Navigation Enhancement Script
 * Handles scroll detection for header
 * Note: Dropdown handling consolidated in main.js to avoid duplication
 */

(function() {
    'use strict';
    
    // Scroll detection for header
    const header = document.getElementById('header');
    let ticking = false;
    
    function updateHeader() {
        if (!header) {
            ticking = false;
            return;
        }
        
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Initialize on page load
    updateHeader();
})();
