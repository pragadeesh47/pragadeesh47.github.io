/* =========================================================
   animations.js — typing, scroll reveal, counters,
   progress bars, parallax, mouse glow, custom cursor
   Exposes window.initAnimations().
   ========================================================= */
(function () {
  "use strict";

  /* ---- Typing effect ---- */
  function typing() {
    var el = document.getElementById("typed");
    if (!el) return;
    var words = (el.getAttribute("data-words") || "").split("|").filter(Boolean);
    if (!words.length) return;

    var out = el.querySelector(".typed-text");
    var w = 0;
    var i = 0;
    var deleting = false;

    function tick() {
      var word = words[w];
      i = deleting ? i - 1 : i + 1;
      out.textContent = word.slice(0, i);

      var delay = deleting ? 45 : 85;
      if (!deleting && i === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 320;
      }
      window.setTimeout(tick, delay);
    }
    tick();
  }

  /* ---- Progress bars ---- */
  function fillBars(scope) {
    var bars = scope.querySelectorAll(".bar__fill");
    Array.prototype.forEach.call(bars, function (bar) {
      var v = bar.getAttribute("data-value") || "0";
      window.setTimeout(function () {
        bar.style.width = v + "%";
      }, 120);
    });
  }

  /* ---- Counters ---- */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-target") || "0");
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600;
    var start = performance.now();

    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = target * eased;
      el.textContent = (target % 1 ? value.toFixed(1) : Math.round(value)) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  /* ---- Intersection observer reveal ---- */
  function reveal() {
    var items = document.querySelectorAll("[data-reveal], [data-stagger]");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (el) {
        el.classList.add("is-revealed");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;

          if (el.hasAttribute("data-stagger")) {
            var kids = el.children;
            Array.prototype.forEach.call(kids, function (kid, idx) {
              kid.style.transitionDelay = idx * 80 + "ms";
            });
          }

          var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          window.setTimeout(function () {
            el.classList.add("is-revealed");
            fillBars(el);
            var counters = el.querySelectorAll("[data-target]");
            Array.prototype.forEach.call(counters, runCounter);
          }, delay);

          io.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
    );

    Array.prototype.forEach.call(items, function (el) {
      io.observe(el);
    });
  }

  /* ---- Parallax orbs ---- */
  function parallax() {
    var orbs = document.querySelectorAll(".orb");
    if (!orbs.length) return;
    var ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          Array.prototype.forEach.call(orbs, function (orb, i) {
            orb.style.marginTop = -(y * (0.03 + i * 0.02)) + "px";
          });
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---- Mouse glow + custom cursor ---- */
  function pointerFx() {
    var glow = document.getElementById("mouse-glow");
    var dot = document.getElementById("cursor-dot");
    var ring = document.getElementById("cursor-ring");
    if (!glow && !dot) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    var rx = 0;
    var ry = 0;
    var tx = 0;
    var ty = 0;

    window.addEventListener(
      "pointermove",
      function (e) {
        tx = e.clientX;
        ty = e.clientY;
        if (glow) {
          glow.style.opacity = "1";
          glow.style.left = tx + "px";
          glow.style.top = ty + "px";
        }
        if (dot) {
          dot.style.opacity = "1";
          dot.style.transform = "translate(" + (tx - 3.5) + "px," + (ty - 3.5) + "px)";
        }
        if (ring) ring.style.opacity = "1";
      },
      { passive: true }
    );

    function loop() {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring) ring.style.transform = "translate(" + (rx - 17) + "px," + (ry - 17) + "px)";
      window.requestAnimationFrame(loop);
    }
    loop();

    var hot = document.querySelectorAll("a, button, .project-card, .skill-card, input, textarea");
    Array.prototype.forEach.call(hot, function (el) {
      el.addEventListener("pointerenter", function () {
        if (ring) ring.classList.add("is-hot");
      });
      el.addEventListener("pointerleave", function () {
        if (ring) ring.classList.remove("is-hot");
      });
    });
  }

  function initAnimations() {
    typing();
    reveal();
    parallax();
    pointerFx();
  }

  window.initAnimations = initAnimations;
  if (document.readyState !== "loading") initAnimations();
  else document.addEventListener("DOMContentLoaded", initAnimations);
})();
