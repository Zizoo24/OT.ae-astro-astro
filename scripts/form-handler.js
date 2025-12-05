// Contact Form Handler for OnlineTranslation.ae
// Graceful fallback when Supabase is not configured

// Check for Supabase availability
let supabase = null;

async function initSupabase() {
    const supabaseUrl = window.SUPABASE_URL || document.querySelector('meta[name="supabase-url"]')?.content;
    const supabaseKey = window.SUPABASE_ANON_KEY || document.querySelector('meta[name="supabase-key"]')?.content;

    if (!supabaseUrl || !supabaseKey) {
        console.info('Supabase not configured - forms will redirect to WhatsApp');
        return null;
    }

    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
        return createClient(supabaseUrl, supabaseKey);
    } catch (error) {
        console.warn('Failed to load Supabase client:', error.message);
        return null;
    }
}

// Contact Form Submission Handler
async function submitContactForm(formData) {
    if (!supabase) {
        const name = formData.get('name') || '';
        const docType = formData.get('document_type') || '';
        const message = formData.get('message') || '';
        const docLabel = docType ? `Document: ${docType.replace(/_/g, ' ')}. ` : '';
        const whatsappMessage = encodeURIComponent(`Hi, I'm ${name}. ${docLabel}${message}`);
        window.open(`https://wa.me/971508620217?text=${whatsappMessage}`, '_blank');
        return {
            success: true,
            message: 'Redirecting to WhatsApp...',
            redirect: true
        };
    }

    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone') || null,
                    message: formData.get('message'),
                    source_page: window.location.href,
                    status: 'new'
                }
            ])
            .select();

        if (error) throw error;

        return {
            success: true,
            message: 'Message sent successfully. We will respond within 2 hours.',
            data: data
        };
    } catch (error) {
        console.error('Form submission error:', error);
        return {
            success: false,
            message: 'Unable to send message. Please try WhatsApp instead.',
            error: error
        };
    }
}

// Document Request Handler
async function submitDocumentRequest(formData) {
    if (!supabase) {
        const docType = formData.get('document_type') || 'document';
        const whatsappMessage = encodeURIComponent(`Hi, I need ${docType} translation. Please send a quote.`);
        window.open(`https://wa.me/971508620217?text=${whatsappMessage}`, '_blank');
        return {
            success: true,
            message: 'Redirecting to WhatsApp...',
            redirect: true
        };
    }

    try {
        const { data, error } = await supabase
            .from('document_requests')
            .insert([
                {
                    client_name: formData.get('name'),
                    client_email: formData.get('email'),
                    client_phone: formData.get('phone'),
                    document_type: formData.get('document_type') || 'General',
                    source_language: formData.get('source_language') || 'Unknown',
                    target_language: formData.get('target_language') || 'English',
                    urgency: formData.get('urgency') || 'standard',
                    notes: formData.get('message') || formData.get('notes'),
                    status: 'submitted'
                }
            ])
            .select();

        if (error) throw error;

        return {
            success: true,
            message: 'Request submitted successfully. We will send a quotation within minutes.',
            data: data
        };
    } catch (error) {
        console.error('Document request error:', error);
        return {
            success: false,
            message: 'Unable to submit request. Please try WhatsApp instead.',
            error: error
        };
    }
}

// Initialize form handlers on page load
document.addEventListener('DOMContentLoaded', async function() {
    supabase = await initSupabase();
    
    const contactForms = document.querySelectorAll('.contact-form');

    contactForms.forEach(function(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const resultDiv = form.querySelector('#formResult') || document.getElementById('formResult');
            const submitBtn = form.querySelector('button[type="submit"]');

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            if (resultDiv) resultDiv.innerHTML = '';

            // Determine form type and submit accordingly
            const formType = form.dataset.formType || 'contact';

            let result;
            if (formType === 'document') {
                result = await submitDocumentRequest(formData);
            } else {
                result = await submitContactForm(formData);
            }

            // Display result
            if (resultDiv && !result.redirect) {
                if (result.success) {
                    resultDiv.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <span>${result.message}</span>
                            <a href="https://wa.me/971508620217" target="_blank" class="whatsapp-link">
                                <i class="fab fa-whatsapp"></i> Need faster response? WhatsApp us
                            </a>
                        </div>
                    `;
                    form.reset();
                } else {
                    resultDiv.innerHTML = `
                        <div class="form-error">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>${result.message}</span>
                            <a href="https://wa.me/971508620217" target="_blank" class="whatsapp-link">
                                <i class="fab fa-whatsapp"></i> Contact via WhatsApp
                            </a>
                        </div>
                    `;
                }
            }

            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    });
});
