/* =========================================================
   particles.js — lightweight canvas particle field
   Exposes window.initParticles() so it can be re-run.
   ========================================================= */
(function () {
  "use strict";

  var raf = null;

  function initParticles() {
    var canvas = document.getElementById("bg-canvas");
    if (!canvas || !canvas.getContext) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var ctx = canvas.getContext("2d");
    var particles = [];
    var w = 0;
    var h = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pointer = { x: -9999, y: -9999 };

    function count() {
      return window.innerWidth < 720 ? 34 : 80;
    }

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles = [];
      for (var i = 0; i < count(); i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.8 + 0.6,
        });
      }
    }

    function palette() {
      return document.documentElement.getAttribute("data-theme") === "dark"
        ? { dot: "rgba(148,197,255,0.75)", line: "6,182,212" }
        : { dot: "rgba(37,99,235,0.55)", line: "37,99,235" };
    }

    function frame() {
      var c = palette();
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = c.dot;
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(" + c.line + "," + (0.16 * (1 - d2 / 15000)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // subtle pointer attraction
        var pdx = pointer.x - p.x;
        var pdy = pointer.y - p.y;
        var pd2 = pdx * pdx + pdy * pdy;
        if (pd2 < 22000) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = "rgba(" + c.line + ",0.14)";
          ctx.stroke();
        }
      }

      raf = window.requestAnimationFrame(frame);
    }

    function onPointer(e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }

    if (raf) window.cancelAnimationFrame(raf);
    resize();
    seed();
    frame();

    window.addEventListener("resize", function () {
      resize();
      seed();
    });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", function () {
      pointer.x = -9999;
      pointer.y = -9999;
    });
  }

  window.initParticles = initParticles;
  if (document.readyState !== "loading") initParticles();
  else document.addEventListener("DOMContentLoaded", initParticles);
})();
