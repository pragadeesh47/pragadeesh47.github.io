/* =========================================================
   script.js — core UI behaviour
   Loader, theme, sticky nav, active link, mobile menu,
   scroll progress, project filter, lightbox, form
   validation, back to top, ripples, footer year.
   Exposes window.initPortfolio().
   ========================================================= */
(function () {
  "use strict";

  var THEME_KEY = "pv-theme";

  /* ---- Theme ---- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* storage unavailable */
    }
  }

  function initTheme() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(THEME_KEY);
    } catch (e) {
      /* ignore */
    }
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(stored || (prefersDark ? "dark" : "light"));

    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ---- Loader ---- */
  function initLoader() {
    var loader = document.getElementById("loader");
    if (!loader) return;
    window.setTimeout(function () {
      loader.classList.add("is-done");
    }, 650);
  }

  /* ---- Sticky nav, scroll progress, back to top, active link ---- */
  function initScrollUi() {
    var nav = document.getElementById("nav");
    var progress = document.getElementById("scroll-progress");
    var toTop = document.getElementById("to-top");
    var links = document.querySelectorAll("[data-nav-link]");
    var sections = [];

    Array.prototype.forEach.call(links, function (link) {
      var id = link.getAttribute("href").replace("#", "");
      var section = document.getElementById(id);
      if (section) sections.push({ id: id, el: section });
    });

    function onScroll() {
      var y = window.scrollY;
      var max = document.body.scrollHeight - window.innerHeight;

      if (nav) nav.classList.toggle("is-stuck", y > 12);
      if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      if (toTop) toTop.classList.toggle("is-visible", y > 500);

      var current = "";
      sections.forEach(function (s) {
        if (s.el.getBoundingClientRect().top <= 140) current = s.id;
      });
      Array.prototype.forEach.call(links, function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ---- Mobile menu ---- */
  function initMobileMenu() {
    var burger = document.getElementById("burger");
    var menu = document.getElementById("mobile-menu");
    if (!burger || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---- Smooth scrolling for in-page anchors ---- */
  function initSmoothScroll() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      });
    });
  }

  /* ---- Project filtering ---- */
  function initFilters() {
    var buttons = document.querySelectorAll("[data-filter]");
    var cards = document.querySelectorAll("[data-tags]");
    if (!buttons.length) return;

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        Array.prototype.forEach.call(buttons, function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        Array.prototype.forEach.call(cards, function (card) {
          var tags = card.getAttribute("data-tags") || "";
          var show = filter === "all" || tags.indexOf(filter) !== -1;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---- Lightbox ---- */
  function initLightbox() {
    var box = document.getElementById("lightbox");
    if (!box) return;
    var img = box.querySelector("img");
    var closeBtn = document.getElementById("lightbox-close");

    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-lightbox]"), function (trigger) {
      trigger.addEventListener("click", function () {
        var src = trigger.getAttribute("data-lightbox");
        var alt = trigger.getAttribute("data-lightbox-alt") || "Project preview";
        img.src = src;
        img.alt = alt;
        box.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---- Contact form validation ---- */
  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    function setError(name, message) {
      var el = form.querySelector('[data-error="' + name + '"]');
      if (el) el.textContent = message || "";
      var input = form.querySelector('[name="' + name + '"]');
      if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
      return !message;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var subject = (data.get("subject") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var ok = true;
      ok = setError("name", name.length < 2 ? "Please enter your name." : "") && ok;
      ok = setError("email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "Enter a valid email address.") && ok;
      ok = setError("subject", subject.length < 3 ? "Add a short subject." : "") && ok;
      ok = setError("message", message.length < 12 ? "Tell me a little more (12+ characters)." : "") && ok;

      if (!ok) {
        if (status) status.textContent = "";
        return;
      }

      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      if (status) status.textContent = "Opening your email client… you can also write to pragadeeshwaran471@gmail.com";
      window.location.href =
        "mailto:pragadeeshwaran471@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + body;
      form.reset();
    });
  }

  /* ---- Button ripples ---- */
  function initRipples() {
    Array.prototype.forEach.call(document.querySelectorAll(".btn"), function (btn) {
      btn.addEventListener("click", function (e) {
        var rect = btn.getBoundingClientRect();
        var span = document.createElement("span");
        var size = Math.max(rect.width, rect.height);
        span.className = "ripple";
        span.style.width = span.style.height = size + "px";
        span.style.left = e.clientX - rect.left - size / 2 + "px";
        span.style.top = e.clientY - rect.top - size / 2 + "px";
        btn.appendChild(span);
        window.setTimeout(function () {
          span.remove();
        }, 680);
      });
    });
  }

  /* ---- Footer year ---- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initPortfolio() {
    initTheme();
    initLoader();
    initScrollUi();
    initMobileMenu();
    initSmoothScroll();
    initFilters();
    initLightbox();
    initForm();
    initRipples();
    initYear();
  }

  window.initPortfolio = initPortfolio;
  if (document.readyState !== "loading") initPortfolio();
  else document.addEventListener("DOMContentLoaded", initPortfolio);
})();
