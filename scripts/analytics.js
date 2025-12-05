// Google Analytics 4 for OnlineTranslation.ae
// Replace GA_MEASUREMENT_ID with your actual ID (format: G-XXXXXXXXXX)

(function() {
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.log('Analytics: Waiting for GA4 Measurement ID configuration');
        return;
    }
    
    const hasConsent = (function() {
        try {
            const consent = localStorage.getItem('ot_cookie_consent');
            if (!consent) return false;
            const parsed = JSON.parse(consent);
            return parsed.accepted === true;
        } catch (e) {
            return false;
        }
    })();
    
    if (!hasConsent) {
        console.log('Analytics: User has not accepted cookies');
        return;
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });
})();
