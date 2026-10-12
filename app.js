/* Hub de Iniciativas — client. Dados: data/apps.json (contribua via PR!). */
(function () {
  "use strict";

  var DATA_URL = "data/apps.json";
  var state = { data: null, query: "", category: null };

  // --- tiny DOM helpers -------------------------------------------------
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._h);
    toast._h = setTimeout(function () { t.classList.remove("show"); }, 2500);
  }

  // --- data -------------------------------------------------------------
  function loadData() {
    return fetch(DATA_URL)
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        if (!data || !Array.isArray(data.initiatives)) throw new Error("formato inválido");
        state.data = data;
        render();
      })
      .catch(function (err) {
        console.error(err);
        $("hub").innerHTML = "";
        var e = $("empty");
        e.hidden = false;
        e.querySelector("h3").textContent = "Não foi possível carregar o catálogo";
        e.querySelector("p").textContent = "Verifique sua conexão e recarregue a página.";
      });
  }

  // --- filtering --------------------------------------------------------
  function matches(item) {
    var catOk = !state.category || item.category === state.category;
    if (!catOk) return false;
    if (!state.query) return true;
    var q = norm(state.query.trim());
    var haystack = norm([
      item.name, item.description, item.category,
      (item.tags || []).join(" ")
    ].join(" "));
    return q.split(/\s+/).every(function (word) { return haystack.indexOf(word) !== -1; });
  }

  function catLabel(id) {
    var cats = (state.data && state.data.categories) || [];
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i].label;
    return id;
  }

  // --- rendering --------------------------------------------------------
  function render() {
    var data = state.data;
    var pills = $("pills");
    pills.innerHTML = "";
    data.categories.forEach(function (c) {
      var count = data.initiatives.filter(function (i) { return i.category === c.id; }).length;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pill" + (state.category === c.id ? " active" : "");
      b.textContent = c.label + " (" + count + ")";
      b.setAttribute("aria-pressed", state.category === c.id ? "true" : "false");
      b.addEventListener("click", function () {
        state.category = state.category === c.id ? null : c.id;
        render();
      });
      pills.appendChild(b);
    });

    $("statTotal").textContent = data.initiatives.length;
    $("statCats").textContent = data.categories.length;

    var shown = data.initiatives.filter(matches);
    var hub = $("hub");
    hub.innerHTML = shown.map(cardHTML).join("");

    var filtered = state.query || state.category;
    $("filterBar").classList.toggle("visible", !!filtered);
    $("filterTxt").textContent = filtered
      ? shown.length + " de " + data.initiatives.length + " iniciativas"
      : "";
    var empty = $("empty");
    empty.hidden = shown.length > 0;
    if (shown.length > 0) {
      empty.querySelector("h3").textContent = "Nenhuma iniciativa encontrada";
      empty.querySelector("p").innerHTML =
        'Tente outro termo de busca, escolha outra categoria — ou <a href="https://github.com/wesleymatosdev/community-hub/issues/new?template=nova-iniciativa.yml">sugira uma nova iniciativa</a>.';
    }
  }

  function cardHTML(item) {
    var repo = item.repo
      ? '<a href="' + esc(item.repo) + '" target="_blank" rel="noopener noreferrer">' +
        '<svg fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>' +
        "código</a>"
      : "";
    return (
      '<article class="card">' +
        '<div class="card-top">' +
          "<h3>" + esc(item.name) + "</h3>" +
          '<span class="cat">' + esc(catLabel(item.category)) + "</span>" +
        "</div>" +
        "<p>" + esc(item.description) + "</p>" +
        ((item.tags && item.tags.length)
          ? '<div class="tags">' + item.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>"
          : "") +
        '<div class="links">' +
          '<a href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">acessar ' +
            '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 4h6m0 0v6m0-6L10 14"/></svg></a>' +
          repo +
        "</div>" +
      "</article>"
    );
  }

  // --- events -----------------------------------------------------------
  var searchInput = $("search");
  searchInput.addEventListener("input", function () {
    state.query = searchInput.value;
    searchInput.parentElement.classList.toggle("has-value", !!searchInput.value);
    render();
  });
  $("clear").addEventListener("click", function () {
    searchInput.value = "";
    state.query = "";
    searchInput.parentElement.classList.remove("has-value");
    searchInput.focus();
    render();
  });
  function resetFilters() {
    state.query = "";
    state.category = null;
    searchInput.value = "";
    searchInput.parentElement.classList.remove("has-value");
    render();
  }
  $("resetFilters").addEventListener("click", resetFilters);
  $("resetEmpty").addEventListener("click", resetFilters);

  var modal = $("aboutModal");
  $("aboutOpen").addEventListener("click", function () { modal.showModal(); });
  $("aboutX").addEventListener("click", function () { modal.close(); });
  $("aboutClose").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  var toTop = $("toTop");
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // --- go ----------------------------------------------------------------
  loadData();
})();
