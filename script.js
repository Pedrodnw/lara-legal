(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  const closeMenu = () => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const opening = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
      mobileMenu.classList.toggle("is-open", opening);
      document.body.classList.toggle("menu-open", opening);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector(".consultation-form");
  if (form) {
    const specialtySelect = form.querySelector("#especialidad");
    const requestedSpecialty = new URLSearchParams(window.location.search).get("especialidad");
    if (specialtySelect && requestedSpecialty) {
      const matchingOption = Array.from(specialtySelect.options).find(
        (option) => option.value.toLowerCase() === requestedSpecialty.toLowerCase()
      );
      if (matchingOption) specialtySelect.value = matchingOption.value;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const name = form.querySelector("#nombre")?.value.trim() || "";
      const email = form.querySelector("#email")?.value.trim() || "";
      const specialty = specialtySelect?.value || "Consulta legal";
      const question = form.querySelector("#consulta")?.value.trim() || "";
      const phone = form.querySelector("#telefono")?.value.trim() || "";
      const body = [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Teléfono: ${phone}`,
        `Área: ${specialty}`,
        "",
        "Consulta:",
        question,
        "",
        "La persona remitente confirma que ha leído la política de privacidad."
      ].join("\n");
      const status = form.querySelector(".form-status");
      if (status) status.textContent = "Abriendo su aplicación de correo…";
      window.location.href = `mailto:laraabogados@hotmail.com?subject=${encodeURIComponent(`Consulta legal · ${specialty}`)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
