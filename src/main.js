import emailjs from '@emailjs/browser';

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.querySelector('nav');
  const form = document.getElementById('contact-form');

  // Toggle Mobile Menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      console.log("Burger menu toggle clicked");
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Contact Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.user_name.value.trim();
      const email = form.user_email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      console.log("Sending form...");

      emailjs.sendForm('service_gv7b0il', 'template_jwlrv1f', form, {
        publicKey: 't2NXpGgcpZSMiWu34'
      })
      .then((res) => {
        console.log("Success:", res.status, res.text);
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Failed to send message. Please try again.');
      });
    });
  }

  // Navbar shadow on scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
    });
  }

  // Animate skill bars when in view
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.bg-blue-primary');
        skillBars.forEach(bar => {
          bar.style.transformOrigin = 'left';
          bar.style.transition = 'transform 1s ease-in-out';
          bar.style.transform = 'scaleX(1)';
        });
      }
    });
  }, observerOptions);

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
});
