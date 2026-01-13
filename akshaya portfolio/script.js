// Auto-update year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// Smooth scroll for nav links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("open"); // close menu on mobile
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Contact form validation
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const status = document.getElementById("form-status");

    // Reset errors
    ["error-name", "error-email", "error-message"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "";
    });

    let valid = true;
    if (!name.value.trim()) {
      document.getElementById("error-name").textContent = "Please enter your name.";
      valid = false;
    }
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      document.getElementById("error-email").textContent = "Please enter a valid email.";
      valid = false;
    }
    if (!message.value.trim()) {
      document.getElementById("error-message").textContent = "Please write a message.";
      valid = false;
    }
    if (!valid) return;

    // Simulate sending
    status.textContent = "Sending…";
    await new Promise(r => setTimeout(r, 1000));
    status.textContent = "✅ Thanks! I’ll reply soon.";
    form.reset();
  });
}

// Fade-in animation when sections enter viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});