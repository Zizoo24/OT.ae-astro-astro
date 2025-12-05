(function() {
    function detectOS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'ios';
        }
        
        if (/android/i.test(userAgent)) {
            return 'android';
        }
        
        return 'other';
    }
    
    function applyOSStyles() {
        const os = detectOS();
        const body = document.body;
        
        body.classList.remove('os-ios', 'os-android', 'os-other');
        body.classList.add('os-' + os);
        
        if (os === 'ios') {
            document.documentElement.style.setProperty('--os-font', '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif');
            document.documentElement.style.setProperty('--os-radius', '14px');
            document.documentElement.style.setProperty('--os-nav-height', '83px');
            
            document.querySelectorAll('.os-default').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.os-ios-only').forEach(el => {
                el.style.display = '';
            });
            document.querySelectorAll('.os-android-only').forEach(el => {
                el.style.display = 'none';
            });
            
        } else if (os === 'android') {
            document.documentElement.style.setProperty('--os-font', '"Roboto", "Google Sans", sans-serif');
            document.documentElement.style.setProperty('--os-radius', '8px');
            document.documentElement.style.setProperty('--os-nav-height', '64px');
            
            document.querySelectorAll('.os-default').forEach(el => {
                el.style.display = '';
            });
            document.querySelectorAll('.os-ios-only').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.os-android-only').forEach(el => {
                el.style.display = '';
            });
            
        } else {
            document.querySelectorAll('.os-default').forEach(el => {
                el.style.display = '';
            });
            document.querySelectorAll('.os-ios-only').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.os-android-only').forEach(el => {
                el.style.display = 'none';
            });
        }
        
        return os;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyOSStyles);
    } else {
        applyOSStyles();
    }
    
    window.detectOS = detectOS;
    window.applyOSStyles = applyOSStyles;
})();
