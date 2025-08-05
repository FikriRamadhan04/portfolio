import emailjs from '@emailjs/browser';
emailjs.init("t2NXpGgcpZSMiWu34");


document.addEventListener("DOMContentLoaded", () => {
  const Mobilemenubtn = document.getElementById('mobile-menu-btn');
  const Mobilemenu = document.getElementById('mobile-menu');

  const mobilemenuBtn = document.getElementById('mobile-menu-btn');
  const mobilemenu = document.getElementById('mobile-menu');

  if (Mobilemenubtn && mobilemenu) {
    Mobilemenubtn.addEventListener('click', () => {
      Mobilemenu.classList.toggle('hidden');
      console.log("Burger menu toggle clicked");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (Mobilemenu && !Mobilemenu.classList.contains('hidden')) {
          Mobilemenu.classList.add('hidden'); // tutup menu mobile setelah klik link
        }
      }
    });
  });


  // Contact form submission
 const form = document.getElementById('contact-form');

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

    emailjs.sendForm('service_gv7b0il', 'template_jwlrv1f', form)
      .then((res) => {
        console.log("Success:", res.status, res.text);
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
      })
      .catch((error) => {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      });
  });




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
