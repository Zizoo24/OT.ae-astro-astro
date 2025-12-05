/**
 * Modern Subsection Menu Component
 * Creates a sticky sidebar menu for service pages showing related pages
 * Automatically highlights current page and provides smooth scroll
 */

class SubsectionMenu {
    constructor(options = {}) {
        this.containerId = options.containerId || 'subsection-menu';
        this.menuData = options.menuData || [];
        this.currentPath = window.location.pathname;
        this.isCollapsed = window.innerWidth < 1024;
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        this.render(container);
        this.bindEvents();
        this.setActiveItem();
    }

    render(container) {
        const html = `
            <div class="subsection-wrapper ${this.isCollapsed ? 'collapsed' : ''}">
                <button class="subsection-toggle" aria-label="Toggle subsection menu">
                    <i class="fas fa-layer-group"></i>
                    <span>In This Section</span>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </button>
                <nav class="subsection-nav" aria-label="Section navigation">
                    <div class="subsection-header">
                        <h4>${this.menuData.title || 'In This Section'}</h4>
                    </div>
                    <ul class="subsection-list">
                        ${this.renderItems(this.menuData.items || [])}
                    </ul>
                </nav>
            </div>
        `;
        container.innerHTML = html;
    }

    renderItems(items, level = 0) {
        return items.map(item => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = this.isCurrentPath(item.url);
            const isParentOfActive = hasChildren && this.hasActivechild(item.children);
            
            return `
                <li class="subsection-item ${hasChildren ? 'has-children' : ''} ${isActive ? 'active' : ''} ${isParentOfActive ? 'parent-active' : ''}" data-level="${level}">
                    <a href="${item.url}" class="subsection-link">
                        ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                        <span>${item.label}</span>
                        ${hasChildren ? '<i class="fas fa-chevron-right expand-icon"></i>' : ''}
                    </a>
                    ${hasChildren ? `
                        <ul class="subsection-children ${isParentOfActive ? 'expanded' : ''}">
                            ${this.renderItems(item.children, level + 1)}
                        </ul>
                    ` : ''}
                </li>
            `;
        }).join('');
    }

    isCurrentPath(url) {
        const cleanCurrent = this.currentPath.replace(/\/$/, '').replace(/\/index\.html$/, '');
        const cleanUrl = url.replace(/\/$/, '').replace(/\/index\.html$/, '');
        return cleanCurrent === cleanUrl || cleanCurrent.endsWith(cleanUrl);
    }

    hasActivechild(children) {
        return children.some(child => 
            this.isCurrentPath(child.url) || 
            (child.children && this.hasActivechild(child.children))
        );
    }

    setActiveItem() {
        const activeItem = document.querySelector('.subsection-item.active');
        if (activeItem) {
            activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }

    bindEvents() {
        const toggle = document.querySelector('.subsection-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleMenu());
        }

        document.querySelectorAll('.subsection-item.has-children > .subsection-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth < 1024) {
                    e.preventDefault();
                    const item = link.parentElement;
                    const children = item.querySelector('.subsection-children');
                    if (children) {
                        children.classList.toggle('expanded');
                        item.classList.toggle('expanded');
                    }
                }
            });
        });

        window.addEventListener('resize', () => {
            this.isCollapsed = window.innerWidth < 1024;
            const wrapper = document.querySelector('.subsection-wrapper');
            if (wrapper) {
                wrapper.classList.toggle('collapsed', this.isCollapsed);
            }
        });
    }

    toggleMenu() {
        const wrapper = document.querySelector('.subsection-wrapper');
        if (wrapper) {
            wrapper.classList.toggle('collapsed');
        }
    }
}

// Menu configurations for different sections
const menuConfigs = {
    personal: {
        title: 'Personal Documents',
        items: [
            { 
                label: 'Vital Records', 
                icon: 'fas fa-file-alt',
                url: '/personal/vital-records/',
                children: [
                    { label: 'Birth Certificate', url: '/personal/vital-records/birth/', icon: 'fas fa-baby' },
                    { label: 'Marriage Certificate', url: '/personal/vital-records/marriage/', icon: 'fas fa-ring' },
                    { label: 'Death Certificate', url: '/personal/vital-records/death/', icon: 'fas fa-heart-broken' },
                    { label: 'Divorce Certificate', url: '/personal/vital-records/divorce/', icon: 'fas fa-file-contract' }
                ]
            },
            { 
                label: 'Academic Documents', 
                icon: 'fas fa-graduation-cap',
                url: '/personal/academic/',
                children: [
                    { label: 'University Degree', url: '/personal/academic/degree/', icon: 'fas fa-scroll' },
                    { label: 'Academic Transcripts', url: '/personal/academic/transcripts/', icon: 'fas fa-list-alt' }
                ]
            },
            { 
                label: 'Immigration Documents', 
                icon: 'fas fa-passport',
                url: '/personal/immigration/',
                children: [
                    { label: 'Police Clearance (PCC)', url: '/personal/immigration/pcc/', icon: 'fas fa-shield-alt' },
                    { label: 'Bank Statement', url: '/personal/immigration/bank/', icon: 'fas fa-university' },
                    { label: 'Driving License', url: '/personal/immigration/license/', icon: 'fas fa-id-card' }
                ]
            }
        ]
    },
    legal: {
        title: 'Legal Documents',
        items: [
            { 
                label: 'Contracts', 
                icon: 'fas fa-file-signature',
                url: '/legal/contracts/',
                children: [
                    { label: 'NDA Translation', url: '/legal/contracts/nda/', icon: 'fas fa-user-secret' },
                    { label: 'Lease Agreement', url: '/legal/contracts/lease/', icon: 'fas fa-home' },
                    { label: 'Sale & Purchase (SPA)', url: '/legal/contracts/spa/', icon: 'fas fa-handshake' },
                    { label: 'MOU Translation', url: '/legal/contracts/mou/', icon: 'fas fa-file-contract' }
                ]
            },
            { 
                label: 'Corporate Documents', 
                icon: 'fas fa-building',
                url: '/legal/corporate/',
                children: [
                    { label: 'Power of Attorney', url: '/legal/corporate/poa/', icon: 'fas fa-gavel' },
                    { label: 'Memorandum of Association', url: '/legal/corporate/moa/', icon: 'fas fa-landmark' },
                    { label: 'Board Resolution', url: '/legal/corporate/resolution/', icon: 'fas fa-users' }
                ]
            },
            { 
                label: 'Litigation Documents', 
                icon: 'fas fa-balance-scale',
                url: '/legal/litigation/',
                children: [
                    { label: 'Court Verdicts', url: '/legal/litigation/verdict/', icon: 'fas fa-gavel' },
                    { label: 'Arbitration Documents', url: '/legal/litigation/arbitration/', icon: 'fas fa-balance-scale-left' }
                ]
            }
        ]
    },
    services: {
        title: 'Our Services',
        items: [
            { label: 'Legal Translation', url: '/services/legal-translation/', icon: 'fas fa-gavel' },
            { label: 'Certificate Translation', url: '/services/certificate-translation/', icon: 'fas fa-certificate' },
            { label: 'Corporate Translation', url: '/services/corporate-translation/', icon: 'fas fa-building' },
            { label: 'Golden Visa Translation', url: '/services/golden-visa-translation/', icon: 'fas fa-passport' },
            { label: 'Attestation Services', url: '/services/attestation/', icon: 'fas fa-stamp' }
        ]
    },
    locations: {
        title: 'Locations',
        items: [
            { 
                label: 'Dubai', 
                icon: 'fas fa-city',
                url: '/locations/dubai/',
                children: [
                    { label: 'Palm Jumeirah', url: '/locations/dubai/palm-jumeirah/', icon: 'fas fa-umbrella-beach' },
                    { label: 'JLT & DMCC', url: '/locations/dubai/jlt/', icon: 'fas fa-building' },
                    { label: 'DIFC', url: '/locations/dubai/difc/', icon: 'fas fa-landmark' },
                    { label: 'Business Bay', url: '/locations/dubai/business-bay/', icon: 'fas fa-briefcase' }
                ]
            },
            { label: 'Abu Dhabi', url: '/locations/abu-dhabi/', icon: 'fas fa-mosque' },
            { label: 'Sharjah', url: '/locations/sharjah/', icon: 'fas fa-university' }
        ]
    },
    resources: {
        title: 'Resources',
        items: [
            { label: 'FAQ', url: '/resources/faq/', icon: 'fas fa-question-circle' },
            { label: 'Pricing Guide', url: '/resources/pricing-guide/', icon: 'fas fa-tags' },
            { label: 'Document Checklist', url: '/resources/document-checklist/', icon: 'fas fa-list-check' },
            { label: 'Attestation Guide', url: '/resources/attestation-guide/', icon: 'fas fa-stamp' },
            { label: 'Golden Visa Checklist', url: '/resources/golden-visa-checklist/', icon: 'fas fa-passport' }
        ]
    }
};

// Auto-initialize based on current path
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    let menuType = null;
    
    if (path.includes('/personal/')) menuType = 'personal';
    else if (path.includes('/legal/')) menuType = 'legal';
    else if (path.includes('/services/')) menuType = 'services';
    else if (path.includes('/locations/')) menuType = 'locations';
    else if (path.includes('/resources/')) menuType = 'resources';
    
    if (menuType && menuConfigs[menuType]) {
        new SubsectionMenu({
            containerId: 'subsection-menu',
            menuData: menuConfigs[menuType]
        });
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SubsectionMenu, menuConfigs };
}
