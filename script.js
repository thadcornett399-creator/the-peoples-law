document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.feature-card, .mission, .hero-content, .hero-image');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Mock Chat Interaction (Simulate typing)
    const chatDemo = document.querySelector('.chat-demo');
    const messages = chatDemo.querySelectorAll('.message');
    
    // Reset messages for animation
    messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(10px)';
        msg.style.transitionDelay = `${index * 1.5}s`;
    });

    const triggerChatAnimation = () => {
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.transform = 'translateY(0)';
            }, index * 1500);
        });
    };

    // Trigger chat animation when hero image is visible
    const heroImage = document.querySelector('.hero-image');
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            triggerChatAnimation();
            heroObserver.unobserve(heroImage);
        }
    }, { threshold: 0.5 });

    heroObserver.observe(heroImage);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
