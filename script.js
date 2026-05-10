const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav a, .desktop-nav a");
const marquee = document.querySelector("[data-marquee]");
const track = marquee?.querySelector(".reviews-track");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (menuToggle && mobileNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    window.setTimeout(() => {
      mobileNav.hidden = true;
    }, 220);
  };

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));

    if (isExpanded) {
      closeMenu();
      return;
    }

    mobileNav.hidden = false;
    window.requestAnimationFrame(() => {
      mobileNav.classList.add("is-visible");
      document.body.classList.add("menu-open");
    });
  };

  menuToggle.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth > 960) {
        return;
      }

      closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}

if (track) {
  track.innerHTML += track.innerHTML;

  let position = 0;
  let animationFrame = 0;
  let lastTime = 0;
  let isPaused = false;

  let singleTrackWidth = track.scrollWidth / 2;

  const step = (time) => {
    if (!lastTime) {
      lastTime = time;
    }

    const delta = time - lastTime;
    lastTime = time;

    if (!isPaused) {
      position -= delta * 0.045;

      if (Math.abs(position) >= singleTrackWidth) {
        position = 0;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;
    }

    animationFrame = window.requestAnimationFrame(step);
  };

  ["mouseenter", "focusin"].forEach((eventName) => {
    marquee.addEventListener(eventName, () => {
      isPaused = true;
    });
  });

  ["mouseleave", "focusout"].forEach((eventName) => {
    marquee.addEventListener(eventName, () => {
      isPaused = false;
    });
  });

  const refreshTrackWidth = () => {
    singleTrackWidth = track.scrollWidth / 2;
  };

  window.addEventListener("resize", refreshTrackWidth);

  if (!reducedMotion.matches) {
    animationFrame = window.requestAnimationFrame(step);
  }

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(animationFrame);
  });
}
