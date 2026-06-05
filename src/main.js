import emailjs from "@emailjs/browser";

// Inisialisasi EmailJS
emailjs.init("t2NXpGgcpZSMiWu34");

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initNavbarShadow();
  initSkillBars();
});

/* ======= Mobile Menu ======= */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    console.log("Burger menu toggled");
  });
}

/* ======= Smooth Scrolling ======= */
function initSmoothScroll() {
  const mobileMenu = document.getElementById("mobile-menu");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // Tutup menu mobile setelah klik link
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });
}

/* ======= Contact Form ======= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Sending form...");

    emailjs
      .sendForm("service_gv7b0il", "template_jwlrv1f", form)
      .then((res) => {
        console.log("Success:", res.status, res.text);
        alert("Thank you for your message! I will get back to you soon.");
        form.reset();
      })
      .catch((error) => {
        alert("Failed to send message. Please try again.");
        console.error("EmailJS error:", error);
      });
  });
}

/* ======= Navbar Shadow on Scroll ======= */
function initNavbarShadow() {
  const navbar = document.querySelector("nav");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });
}

/* ======= Animate Skill Bars ======= */
function initSkillBars() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".bg-blue-primary");
        skillBars.forEach((bar) => {
          bar.style.transformOrigin = "left";
          bar.style.transition = "transform 1s ease-in-out";
          bar.style.transform = "scaleX(1)";
        });
      }
    });
  }, observerOptions);

  observer.observe(aboutSection);
}
