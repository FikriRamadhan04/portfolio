import emailjs from '@emailjs/browser';
emailjs.init("t2NXpGgcpZSMiWu34");

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden'); // close mobile menu on link click
        }
      }
    });
  });

  // Contact form submission using EmailJS
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="user_name"]').value.trim();
      const email = form.querySelector('[name="user_email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }

      emailjs.sendForm("service_gv7b0il", "template_jwlrv1f", form)
        .then(() => {
          alert("Thank you for your message! I will get back to you soon.");
          form.reset();
        })
        .catch((error) => {
          alert("Gagal mengirim pesan. Silakan coba lagi.");
          console.error(error);
        });
    });
  }

  // Navbar shadow on scroll effect
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 100) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  });

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
