(() => {
  const endpoint = "https://cold-mode-0c9d.kasonmagruder.workers.dev/api/user-count";
  const id = "live-user-count";

  function create() {
    const header = document.querySelector(".md-header__inner");
    if (!header || document.getElementById(id)) return;

    const wrap = document.createElement("div");
    wrap.id = id;

    const badge = document.createElement("div");
    badge.className = "md-header__user-count-badge";

    const icon = document.createElement("span");
    icon.textContent = "👥";

    const text = document.createElement("span");
    text.className = "md-header__user-count-text";
    text.textContent = "0 online";

    badge.append(icon, text);
    wrap.appendChild(badge);

    const search = header.querySelector(".md-search");

    if (search) {
      header.insertBefore(wrap, search);
    } else {
      header.appendChild(wrap);
    }
  }

  async function update() {
    try {
      const res = await fetch(endpoint, {
        cache: "no-store"
      });

      const data = await res.json();

      const text = document.querySelector(".md-header__user-count-text");

      if (text) {
        text.textContent = `${data.count} online`;
      }
    } catch {
      const text = document.querySelector(".md-header__user-count-text");

      if (text) {
        text.textContent = "—";
      }
    }
  }

  function init() {
    create();
    update();
    setInterval(update, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();