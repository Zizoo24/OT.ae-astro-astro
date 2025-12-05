/**
 * Modern Image Optimization Module
 * Provides lazy loading, WebP support detection, and responsive images
 */

class ImageOptimizer {
    constructor(options = {}) {
        this.lazyLoadOffset = options.lazyLoadOffset || '200px';
        this.fadeInDuration = options.fadeInDuration || 300;
        this.webpSupported = null;
        this.init();
    }

    async init() {
        this.webpSupported = await this.checkWebPSupport();
        document.body.classList.add(this.webpSupported ? 'webp-supported' : 'webp-not-supported');
        
        this.setupLazyLoading();
        this.setupResponsiveImages();
        this.observeNewImages();
    }

    async checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: this.lazyLoadOffset,
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
                if (!img.classList.contains('loaded')) {
                    imageObserver.observe(img);
                }
            });

            this.imageObserver = imageObserver;
        } else {
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.loadImage(img);
            });
        }
    }

    loadImage(img) {
        const src = img.dataset.src || img.src;
        const srcset = img.dataset.srcset;
        
        if (src && src !== img.src) {
            const optimizedSrc = this.getOptimizedSrc(src);
            
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = optimizedSrc;
                if (srcset) {
                    img.srcset = this.getOptimizedSrcset(srcset);
                }
                img.classList.add('loaded');
                img.classList.add('fade-in');
                
                setTimeout(() => {
                    img.classList.remove('fade-in');
                }, this.fadeInDuration);
            };
            tempImg.onerror = () => {
                img.src = src;
                img.classList.add('loaded');
            };
            tempImg.src = optimizedSrc;
        }
    }

    getOptimizedSrc(src) {
        if (this.webpSupported && !src.endsWith('.webp') && !src.includes('data:')) {
            const webpPath = src.replace(/\.(jpe?g|png)$/i, '.webp');
            return webpPath;
        }
        return src;
    }

    getOptimizedSrcset(srcset) {
        if (!this.webpSupported) return srcset;
        
        return srcset.split(',').map(src => {
            return src.trim().replace(/\.(jpe?g|png)/gi, '.webp');
        }).join(', ');
    }

    setupResponsiveImages() {
        document.querySelectorAll('img[data-sizes="auto"]').forEach(img => {
            const updateSizes = () => {
                const parentWidth = img.parentElement.offsetWidth;
                img.sizes = `${parentWidth}px`;
            };
            
            updateSizes();
            window.addEventListener('resize', this.debounce(updateSizes, 100));
        });
    }

    observeNewImages() {
        if ('MutationObserver' in window) {
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            const images = node.querySelectorAll ? 
                                node.querySelectorAll('img[data-src], img[loading="lazy"]') : [];
                            images.forEach(img => {
                                if (!img.classList.contains('loaded') && this.imageObserver) {
                                    this.imageObserver.observe(img);
                                }
                            });
                            
                            if (node.tagName === 'IMG' && (node.dataset.src || node.loading === 'lazy')) {
                                if (!node.classList.contains('loaded') && this.imageObserver) {
                                    this.imageObserver.observe(node);
                                }
                            }
                        }
                    });
                });
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static createResponsiveImage(options) {
        const {
            src,
            alt,
            sizes = '100vw',
            widths = [320, 640, 768, 1024, 1280, 1920],
            className = '',
            loading = 'lazy'
        } = options;

        const baseName = src.replace(/\.[^/.]+$/, '');
        const extension = src.match(/\.[^/.]+$/)?.[0] || '.jpg';
        
        const srcset = widths.map(w => `${baseName}-${w}w${extension} ${w}w`).join(', ');
        const srcsetWebP = widths.map(w => `${baseName}-${w}w.webp ${w}w`).join(', ');

        return `
            <picture>
                <source type="image/webp" srcset="${srcsetWebP}" sizes="${sizes}">
                <source type="${extension === '.png' ? 'image/png' : 'image/jpeg'}" srcset="${srcset}" sizes="${sizes}">
                <img 
                    src="${src}" 
                    alt="${alt}" 
                    loading="${loading}"
                    class="${className}"
                    sizes="${sizes}"
                >
            </picture>
        `;
    }

    static generatePictureElement(src, alt, options = {}) {
        const {
            className = '',
            loading = 'lazy',
            sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        } = options;

        const basePath = src.substring(0, src.lastIndexOf('.'));
        const ext = src.substring(src.lastIndexOf('.'));
        
        return `
            <picture class="${className}">
                <source 
                    type="image/webp" 
                    srcset="${basePath}.webp"
                    sizes="${sizes}">
                <source 
                    type="image/${ext === '.png' ? 'png' : 'jpeg'}" 
                    srcset="${src}"
                    sizes="${sizes}">
                <img 
                    src="${src}" 
                    alt="${alt}" 
                    loading="${loading}"
                    decoding="async"
                    class="optimized-image">
            </picture>
        `;
    }
}

const imageStyles = `
    img.fade-in {
        animation: fadeIn ${300}ms ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.98); }
        to { opacity: 1; transform: scale(1); }
    }
    
    img[data-src]:not(.loaded) {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    .optimized-image {
        max-width: 100%;
        height: auto;
        display: block;
    }
    
    picture {
        display: block;
    }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = imageStyles;
    document.head.appendChild(styleSheet);
}

document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ImageOptimizer };
}
