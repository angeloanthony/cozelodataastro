/*
  Cozelos Data — client-side interactions
  All effects are progressive enhancements: the site is fully functional
  without JS. Everything respects prefers-reduced-motion, and every initializer
  is idempotent so it can re-run after Astro View Transitions swap the DOM.
*/

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Scroll reveal -------------------------------------------------------- */
function initReveals() {
  const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
  if (!els.length) return;

  if (prefersReduced() || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          window.setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  els.forEach((el) => io.observe(el));
}

/* ---- Animated counters ---------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]:not([data-counted])");
  if (!counters.length) return;

  const run = (el: HTMLElement) => {
    el.setAttribute("data-counted", "true");
    const target = Number(el.dataset.counter ?? 0);
    const suffix = el.dataset.suffix ?? "";
    const duration = 2200;

    if (prefersReduced()) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo for a satisfying, decelerating count.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(run);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => io.observe(c));
}

/* ---- Magnetic buttons ----------------------------------------------------- */
function initMagnetic() {
  if (prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
  const els = document.querySelectorAll<HTMLElement>("[data-magnetic]:not([data-magnetic-init])");
  els.forEach((el) => {
    el.setAttribute("data-magnetic-init", "true");
    const strength = Number(el.dataset.magnetic || 0.35);
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const reset = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
  });
}

/* ---- 3D tilt cards -------------------------------------------------------- */
function initTilt() {
  if (prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]:not([data-tilt-init])");
  cards.forEach((card) => {
    card.setAttribute("data-tilt-init", "true");
    const max = Number(card.dataset.tilt || 8);
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -2 * max;
      const ry = (px - 0.5) * 2 * max;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      // Move the glow toward the cursor.
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
    };
    const reset = () => {
      card.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", reset);
  });
}

/* ---- Hero spotlight + floating parallax ----------------------------------- */
function initPointerEffects() {
  if (prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
  const stages = document.querySelectorAll<HTMLElement>("[data-pointer-stage]:not([data-pointer-init])");
  stages.forEach((stage) => {
    stage.setAttribute("data-pointer-init", "true");
    const floats = stage.querySelectorAll<HTMLElement>("[data-float]");
    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      stage.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
      stage.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      floats.forEach((f) => {
        const depth = Number(f.dataset.float || 12);
        f.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };
    stage.addEventListener("mousemove", onMove);
  });
}

/* ---- Scroll progress bar -------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.transform = `scaleX(${scrolled})`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---- Header shrink on scroll --------------------------------------------- */
function initHeaderState() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---- Master init ---------------------------------------------------------- */
function initAll() {
  initReveals();
  initCounters();
  initMagnetic();
  initTilt();
  initPointerEffects();
  initScrollProgress();
  initHeaderState();
}

// First load.
document.addEventListener("DOMContentLoaded", initAll);
// After every Astro View Transition swap, re-bind to the fresh DOM.
document.addEventListener("astro:page-load", initAll);

export {};
