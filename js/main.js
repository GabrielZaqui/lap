/* =============================================================================
   LAP PERFORMANCE — main.js
   Lógica do site: renderização de produtos/evento a partir de config.js,
   navegação, formulário de inscrição (envia para WhatsApp) e microinterações.
   ============================================================================= */

(function () {
  "use strict";

  const cfg = window.LAP_CONFIG;

  function waLink(message) {
    const base = "https://wa.me/" + cfg.whatsappNumber;
    return message ? base + "?text=" + encodeURIComponent(message) : base;
  }

  const ICONS = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 9.5h18M8 3v4M16 3v4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.4-3.9-3.2-.1-.2 0-.4.1-.5.3-.3.6-.7.7-.9.1-.2.1-.4 0-.5-.1-.2-.7-1.7-.9-2.2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9 1-.9 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.2 2.4 1 2.9.8 3.4.7.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.1-1.3-.1-.1-.2-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  /* ---------------------------------------------------------------------
     Header: estado ao rolar + menu mobile
     --------------------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const mobileNav = document.querySelector(".mobile-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".mobile-close");
  function openMenu() { mobileNav.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function closeMenu() { mobileNav.classList.remove("is-open"); document.body.style.overflow = ""; }
  menuToggle && menuToggle.addEventListener("click", openMenu);
  menuClose && menuClose.addEventListener("click", closeMenu);
  mobileNav && mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------------------------------------------------------------------
     Botão flutuante do WhatsApp + CTAs genéricos com [data-wa]
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const msg = el.getAttribute("data-wa") || "";
    el.setAttribute("href", waLink(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------------------------------------------------------------------
     Evento — "Dia de treino"
     --------------------------------------------------------------------- */
  const ev = cfg.event;
  const eventMount = document.getElementById("event-ticket");
  if (eventMount && ev) {
    eventMount.innerHTML = `
      <div class="ticket-photo">
        <span class="tag">${ev.tag}</span>
        <img src="${ev.photo}" alt="${ev.title}" loading="lazy">
      </div>
      <div class="ticket-body">
        <div class="ticket-perf" aria-hidden="true"></div>
        <h3 class="ticket-title">${ev.title}</h3>
        <div class="ticket-rows">
          <div class="ticket-row">${ICONS.calendar}<div><span>Data</span><strong>${ev.date} · ${ev.weekday}</strong></div></div>
          <div class="ticket-row">${ICONS.clock}<div><span>Chegada / Início</span><strong>${ev.arrival} chegar · ${ev.start} início</strong></div></div>
          <div class="ticket-row">${ICONS.pin}<div><span>Local</span><strong>${ev.location}</strong></div></div>
        </div>
      </div>`;
  }

  const heroDate = document.getElementById("hero-next-date");
  if (heroDate && ev) heroDate.textContent = ev.date;

  const eventSelect = document.getElementById("field-evento");
  if (eventSelect && ev) {
    eventSelect.innerHTML = `<option value="${ev.title} — ${ev.date}">${ev.title} — ${ev.date}</option>`;
  }

  /* ---------------------------------------------------------------------
     Formulário de inscrição -> monta mensagem e abre WhatsApp
     --------------------------------------------------------------------- */
  const form = document.getElementById("inscricao-form");
  const statusEl = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const evento = form.evento.value;
      const obs = form.observacao.value.trim();

      if (!nome || !telefone) {
        statusEl.textContent = "Preencha nome e telefone para confirmar a inscrição.";
        statusEl.className = "form-status show err";
        return;
      }

      const lines = [
        "Inscrição — Dia de Treino LAP Performance",
        "Evento: " + evento,
        "Nome: " + nome,
        "Telefone: " + telefone
      ];
      if (obs) lines.push("Observação: " + obs);

      const link = waLink(lines.join("\n"));
      statusEl.textContent = "Tudo certo! Abrindo o WhatsApp para confirmar sua inscrição...";
      statusEl.className = "form-status show ok";
      window.open(link, "_blank", "noopener");
      form.reset();
      if (eventSelect && ev) eventSelect.innerHTML = `<option value="${ev.title} — ${ev.date}">${ev.title} — ${ev.date}</option>`;
    });
  }

  /* ---------------------------------------------------------------------
     Produtos
     --------------------------------------------------------------------- */
  const productsMount = document.getElementById("products-grid");
  if (productsMount && cfg.products) {
    productsMount.innerHTML = cfg.products
      .map((p) => {
        const actionBtn = p.soon
          ? `<a class="btn btn-outline" data-wa="${p.whatsappMessage}" href="#">Avise-me ${ICONS.arrow}</a>`
          : `<a class="btn btn-primary" data-wa="${p.whatsappMessage}" href="#">Comprar ${ICONS.whatsapp}</a>`;
        return `
        <article class="product-card reveal">
          <div class="product-photo">
            ${p.soon ? `<span class="product-badge soon">Em breve</span>` : `<span class="product-badge">Disponível</span>`}
            <img src="${p.photo}" alt="${p.name}" loading="lazy">
          </div>
          <div class="product-info">
            <span class="tag">${p.tag}</span>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <div class="product-actions">
              <span class="product-price">${p.price}</span>
              ${actionBtn}
            </div>
          </div>
        </article>`;
      })
      .join("");

    productsMount.querySelectorAll("[data-wa]").forEach((el) => {
      const msg = el.getAttribute("data-wa") || "";
      el.setAttribute("href", waLink(msg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ---------------------------------------------------------------------
     Rodapé: ano + link do Instagram
     --------------------------------------------------------------------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-ig]").forEach((el) => {
    el.setAttribute("href", cfg.social.instagram);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-ig-handle]").forEach((el) => {
    el.textContent = cfg.social.instagramHandle;
  });
  document.querySelectorAll("[data-city]").forEach((el) => {
    el.textContent = cfg.social.city;
  });

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => io.observe(el));

    // observa também os cards de produto criados dinamicamente
    setTimeout(() => {
      document.querySelectorAll(".product-card.reveal").forEach((el) => io.observe(el));
    }, 0);
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
