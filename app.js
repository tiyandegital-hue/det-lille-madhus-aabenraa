/* Det Lille Madhus — shared behaviour.
   Business name resolved from the Stitch placeholder: "Det Lille Madhus".
   Forms are design mocks: they send NOTHING anywhere. */
(function () {
  "use strict";

  /* FAQ accordion (Kontakt) */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* 3-step enquiry flow (Fester & Events) */
  var flow = document.getElementById("enquiry-flow");
  if (flow) {
    var steps = Array.prototype.slice.call(flow.querySelectorAll(".fstep"));
    var current = 0;

    // Pills: single-select within each group; selection persists (Tilbage keeps entries).
    flow.querySelectorAll(".pills").forEach(function (group) {
      group.querySelectorAll(".pill").forEach(function (pill) {
        pill.addEventListener("click", function () {
          group.querySelectorAll(".pill").forEach(function (p) { p.classList.remove("selected"); });
          pill.classList.add("selected");
          pill.setAttribute("aria-pressed", "true");
        });
      });
    });

    function show(n) {
      current = n;
      steps.forEach(function (s, i) { s.classList.toggle("active", i === n); });
      flow.querySelectorAll(".pstep").forEach(function (el, i) {
        el.classList.toggle("current", i === n);
        el.classList.toggle("done", i < n);
      });
      flow.querySelectorAll(".pline").forEach(function (el, i) {
        el.classList.toggle("done", i < n);
      });
      var active = steps[n];
      var heading = active.querySelector("h3");
      if (heading) heading.focus();
      flow.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    flow.querySelectorAll("[data-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (current < steps.length - 1) show(current + 1);
      });
    });
    flow.querySelectorAll("[data-back]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (current > 0) show(current - 1); // entries preserved: panels are hidden, never reset
      });
    });

    var form = flow.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // mock only — sends nothing
        var name = form.querySelector('[name="navn"]');
        var email = form.querySelector('[name="email"]');
        var phone = form.querySelector('[name="telefon"]');
        if (!name.value.trim() || !email.value.trim() || !phone.value.trim()) {
          alert("Udfyld venligst navn, e-mail og telefonnummer, før du sender forespørgslen.");
          return;
        }
        // Confirmation state, exactly as specified in STITCH-EXPORT.md:
        document.getElementById("flow-steps").style.display = "none";
        document.getElementById("flow-confirm").hidden = false;
        document.getElementById("flow-confirm").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  /* General enquiry form (Kontakt) — mock only, sends nothing. */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var done = document.getElementById("contact-confirm");
      if (done) { done.hidden = false; done.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }
})();
