// Cookie Consent Banner for OnlineTranslation.ae
// GDPR/UAE TDPPL Compliant

(function() {
    const CONSENT_KEY = 'ot_cookie_consent';
    const CONSENT_VERSION = '1';
    
    function hasConsent() {
        try {
            const consent = localStorage.getItem(CONSENT_KEY);
            if (!consent) return false;
            const parsed = JSON.parse(consent);
            return parsed.version === CONSENT_VERSION && (parsed.accepted === true || parsed.accepted === false);
        } catch (e) {
            return false;
        }
    }
    
    function setConsent(accepted) {
        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify({
                version: CONSENT_VERSION,
                accepted: accepted,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {
            console.warn('Could not save cookie consent preference');
        }
    }
    
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <p>We use cookies to improve your experience. <a href="/privacy.html" class="cookie-link">Learn more</a></p>
            <div class="cookie-actions">
                <button id="cookie-accept" class="cookie-btn-primary">Accept</button>
                <button id="cookie-decline" class="cookie-btn-secondary">Essential</button>
            </div>
        `;
        document.body.appendChild(banner);
        
        document.getElementById('cookie-accept').addEventListener('click', function() {
            setConsent(true);
            banner.classList.add('cookie-consent-hidden');
            setTimeout(function() { banner.remove(); }, 300);
        });
        
        document.getElementById('cookie-decline').addEventListener('click', function() {
            setConsent(false);
            banner.classList.add('cookie-consent-hidden');
            setTimeout(function() { banner.remove(); }, 300);
        });
        
        setTimeout(function() {
            banner.classList.add('cookie-consent-visible');
        }, 800);
    }
    
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                position: fixed;
                bottom: 20px;
                right: 20px;
                max-width: 320px;
                background: rgba(10, 20, 40, 0.88);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                color: #fff;
                padding: 14px 16px;
                border-radius: 10px;
                z-index: 99999;
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s ease;
                font-family: 'Open Sans', sans-serif;
                font-size: 13px;
                line-height: 1.45;
                box-shadow: 0 4px 24px rgba(0,0,0,0.25);
            }
            #cookie-consent-banner.cookie-consent-visible {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            #cookie-consent-banner.cookie-consent-hidden {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            #cookie-consent-banner p {
                margin: 0 0 12px 0;
                color: rgba(255,255,255,0.9);
            }
            #cookie-consent-banner .cookie-link {
                color: rgba(255,255,255,0.6);
                text-decoration: underline;
            }
            #cookie-consent-banner .cookie-link:hover {
                color: #fff;
            }
            .cookie-actions {
                display: flex;
                gap: 8px;
            }
            .cookie-btn-primary {
                flex: 1;
                padding: 8px 14px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 13px;
                background: rgba(255,255,255,0.95);
                color: #0a1428;
                transition: all 0.2s ease;
            }
            .cookie-btn-primary:hover {
                background: #fff;
            }
            .cookie-btn-secondary {
                padding: 8px 14px;
                border: 1px solid rgba(255,255,255,0.3);
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                font-size: 13px;
                background: transparent;
                color: rgba(255,255,255,0.8);
                transition: all 0.2s ease;
            }
            .cookie-btn-secondary:hover {
                border-color: rgba(255,255,255,0.5);
                color: #fff;
            }
            @media (max-width: 500px) {
                #cookie-consent-banner {
                    bottom: 70px;
                    right: 12px;
                    left: 12px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        if (!hasConsent()) {
            addStyles();
            createBanner();
        }
    });
})();
