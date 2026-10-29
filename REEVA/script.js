/* ==========================================================
   REEVA · comportamiento
   1) Navegación entre páginas (Home, Collections, About, Marketplace, Blog)
   2) Animaciones al hacer scroll (aparecer, imágenes, contadores)
   3) Menú móvil
   4) Registro / inicio de sesión (ventana emergente)
   5) Mapa de puntos de acopio (Collection Centers)
   ========================================================== */
(function () {
  var PAGES = ['home', 'collections', 'about', 'marketplace', 'product', 'cart', 'checkout', 'blog'];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var menu = document.getElementById('menu');
  var burger = document.getElementById('burger');
  var io = null;
  var counted = new WeakSet();

  /* ---------- contadores ---------- */
  function fmt(v, dec) {
    return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function count(el) {
    if (counted.has(el)) return;
    counted.add(el);
    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.dec || '0', 10);
    var suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = fmt(target, dec) + suffix; return; }
    var start = null, dur = 1900;
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e, dec) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- aparecer al hacer scroll ---------- */
  function observe(page) {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('in');
        el.querySelectorAll('[data-count]').forEach(count);
        if (el.dataset.count) count(el);
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20% 0px' });
    page.querySelectorAll('.rv, .imgwrap, .imgslide, [data-count]').forEach(function (el) {
      if (!el.classList.contains('in')) io.observe(el);
    });
  }

  /* ---------- navegación entre páginas ---------- */
  function route() {
    var parts = (location.hash || '#home').slice(1).split('/');
    var h = parts[0];
    if (PAGES.indexOf(h) < 0) h = 'home';
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('show'); });
    var page = document.getElementById('p-' + h);
    page.classList.add('show');
    document.body.classList.toggle('mode-checkout', h === 'checkout');
    document.querySelectorAll('.menu a').forEach(function (a) {
      a.classList.toggle('active', a.dataset.p === (h === 'product' ? 'marketplace' : h));
    });
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'auto' });
    observe(page);
    if (h === 'collections') showMap();
    document.dispatchEvent(new CustomEvent('reeva:route', { detail: { page: h, arg: parts[1] || '' } }));
  }
  window.addEventListener('hashchange', route);

  /* ---------- menú móvil ---------- */
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* ==========================================================
     MAPA DE PUNTOS DE ACOPIO
     Para agregar o cambiar puntos, edita la lista CENTROS.
     OJO: coordenadas aproximadas del centro de cada municipio; faltan las direcciones exactas.
     ========================================================== */
  /* Cada punto puede llevar una foto opcional: foto: 'images/mi-foto.jpg' */
  var CENTROS = [
    { nombre: 'Universidad de Panamá', tipo: 'Universidad', lat: 9.0, lng: -79.5333 },
    { nombre: 'Municipio de Panamá', tipo: 'Centro de acopio municipal', lat: 8.9824, lng: -79.5199 },
    { nombre: 'Municipio de San Miguelito', tipo: 'Centro de acopio municipal', lat: 9.0333, lng: -79.4667 },
    { nombre: 'Municipio de Arraiján', tipo: 'Centro de acopio municipal', lat: 8.95, lng: -79.65 },
    { nombre: 'Municipio de La Chorrera', tipo: 'Centro de acopio municipal', lat: 8.88, lng: -79.7833 },
    { nombre: 'Municipio de Capira', tipo: 'Centro de acopio municipal', lat: 8.75, lng: -79.8833 },
    { nombre: 'Municipio de Chame', tipo: 'Centro de acopio municipal', lat: 8.5936, lng: -79.8761 },
    { nombre: 'Municipio de Colón', tipo: 'Centro de acopio municipal', lat: 9.3592, lng: -79.9006 },
    { nombre: 'Municipio de Penonomé', tipo: 'Centro de acopio municipal', lat: 8.5167, lng: -80.3567 },
    { nombre: 'Municipio de Antón', tipo: 'Centro de acopio municipal', lat: 8.4, lng: -80.2667 },
    { nombre: 'Municipio de Natá', tipo: 'Centro de acopio municipal', lat: 8.3333, lng: -80.5167 },
    { nombre: 'Municipio de Aguadulce', tipo: 'Centro de acopio municipal', lat: 8.2378, lng: -80.5453 },
    { nombre: 'Municipio de Santiago', tipo: 'Centro de acopio municipal', lat: 8.1, lng: -80.9833 },
    { nombre: 'Municipio de Ocú', tipo: 'Centro de acopio municipal', lat: 7.9425, lng: -80.7761 },
    { nombre: 'Municipio de Chitré', tipo: 'Centro de acopio municipal', lat: 7.9667, lng: -80.4333 },
    { nombre: 'Municipio de Las Tablas', tipo: 'Centro de acopio municipal', lat: 7.7667, lng: -80.2833 },
    { nombre: 'Municipio de David', tipo: 'Centro de acopio municipal', lat: 8.4273, lng: -82.4308 },
    { nombre: 'Municipio de Bugaba', tipo: 'Centro de acopio municipal', lat: 8.52, lng: -82.62 },
    { nombre: 'Municipio de Boquete', tipo: 'Centro de acopio municipal', lat: 8.78, lng: -82.4333 },
    { nombre: 'Municipio de Barú', tipo: 'Centro de acopio municipal', lat: 8.2833, lng: -82.8667 },
    { nombre: 'Municipio de Bocas del Toro', tipo: 'Centro de acopio municipal', lat: 9.3403, lng: -82.2414 }
  ];

  /* Para el mapa idéntico al de Wix (Google Maps): pega aquí tu clave de Google Maps.
     Si lo dejas vacío, se usa un mapa gratuito que no necesita clave. */
  var GOOGLE_MAPS_KEY = '';

  /* Estilo oscuro tipo Google Maps */
  var DARK = [
    { elementType: 'geometry', stylers: [{ color: '#2b2b2f' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#a8a8ad' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#2b2b2f' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#3b3b40' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#1f2023' }] },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#55555b' }] }
  ];

  var map = null, layers = {}, current = 'map', gmap = null;

  function pinIcon() {
    return L.divIcon({
      className: 'pin',
      html: '<svg width="26" height="36" viewBox="0 0 26 36" aria-hidden="true"><path d="M13 1C6.4 1 1 6.3 1 12.8 1 21.4 13 35 13 35s12-13.6 12-22.2C25 6.3 19.6 1 13 1z" fill="#ea4335" stroke="#b3261e" stroke-width="1"/><circle cx="13" cy="12.8" r="4.4" fill="#7a1a14"/></svg>',
      iconSize: [26, 36], iconAnchor: [13, 34], popupAnchor: [0, -30]
    });
  }

  /* Ventanita del punto: foto (opcional), nombre, tipo y botones Google Maps / Waze */
  function popupHtml(c) {
    var box = document.createElement('div');
    box.className = 'pop';
    if (c.foto) {
      var img = document.createElement('img'); img.src = c.foto; img.alt = c.nombre; img.className = 'pop-foto';
      box.appendChild(img);
    }
    var b = document.createElement('b'); b.textContent = c.nombre;
    var t = document.createElement('span'); t.textContent = c.tipo;
    var links = document.createElement('div'); links.className = 'pop-links';
    function link(txt, href) {
      var a = document.createElement('a'); a.textContent = txt; a.href = href; a.target = '_blank'; a.rel = 'noopener';
      links.appendChild(a);
    }
    link('Google Maps', 'https://www.google.com/maps/dir/?api=1&destination=' + c.lat + ',' + c.lng);
    link('Waze', 'https://waze.com/ul?ll=' + c.lat + ',' + c.lng + '&navigate=yes');
    box.appendChild(b); box.appendChild(t); box.appendChild(links);
    return box;
  }

  function toggleButtons(onChange) {
    document.querySelectorAll('.map-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var to = btn.dataset.layer;
        if (to === current) return;
        onChange(to);
        current = to;
        document.querySelectorAll('.map-toggle button').forEach(function (x) { x.classList.toggle('on', x === btn); });
      });
    });
  }

  /* --- Google Maps (si hay clave) --- */
  function initGoogle(el) {
    gmap = new google.maps.Map(el, {
      center: { lat: 8.55, lng: -80.35 }, zoom: 7, styles: DARK,
      mapTypeControl: false, streetViewControl: false, fullscreenControl: false,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM }
    });
    var info = new google.maps.InfoWindow();
    CENTROS.forEach(function (c, i) {
      var m = new google.maps.Marker({ position: { lat: c.lat, lng: c.lng }, map: gmap, title: c.nombre });
      m.addListener('click', function () { info.setContent(popupHtml(c)); info.open(gmap, m); });
      if (i === 0) { info.setContent(popupHtml(c)); info.open(gmap, m); }
    });
    toggleButtons(function (to) {
      gmap.setMapTypeId(to === 'sat' ? 'hybrid' : 'roadmap');
    });
  }
  function loadGoogle(el) {
    if (window.google && window.google.maps) return initGoogle(el);
    window.__reevaMap = function () { initGoogle(el); };
    var sc = document.createElement('script');
    sc.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(GOOGLE_MAPS_KEY) + '&callback=__reevaMap';
    sc.async = true;
    sc.onerror = function () { el.innerHTML = '<div class="map-msg">No se pudo cargar Google Maps. Revisa la clave y tu conexión.</div>'; };
    document.head.appendChild(sc);
  }

  /* --- Mapa gratuito (Leaflet + Esri), sin clave --- */
  function initLeaflet(el) {
    map = L.map(el, { zoomControl: false, scrollWheelZoom: true }).setView([8.55, -80.35], 7);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    var base = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
    layers.map = L.layerGroup([
      L.tileLayer(base + 'Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri', maxZoom: 16 }),
      L.tileLayer(base + 'Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16 })
    ]);
    layers.sat = L.layerGroup([
      L.tileLayer(base + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri', maxZoom: 19 }),
      L.tileLayer(base + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 })
    ]);
    layers.map.addTo(map);
    var first = null;
    CENTROS.forEach(function (c, i) {
      var m = L.marker([c.lat, c.lng], { icon: pinIcon(), title: c.nombre }).addTo(map).bindPopup(popupHtml(c));
      if (i === 0) first = m;
    });
    if (first) first.openPopup();
    toggleButtons(function (to) { map.removeLayer(layers[current]); layers[to].addTo(map); });
  }

  function showMap() {
    var el = document.getElementById('map');
    if (!el) return;
    if (GOOGLE_MAPS_KEY) {
      if (!gmap && !el.dataset.g) { el.dataset.g = '1'; loadGoogle(el); }
      return;
    }
    if (!window.L) {
      if (!el.firstChild) el.innerHTML = '<div class="map-msg">No se pudo cargar el mapa. Revisa tu conexión a internet y recarga la página.</div>';
      return;
    }
    if (!map) initLeaflet(el);
    /* el contenedor estaba oculto: se recalcula el tamaño */
    setTimeout(function () { map.invalidateSize(); }, 60);
    setTimeout(function () { map.invalidateSize(); }, 700);
  }

  /* ==========================================================
     REGISTRO / INICIO DE SESIÓN
     Ojo: todavía no hay servidor de cuentas. El formulario se
     valida, pero no guarda ni envía nada.
     ========================================================== */
  var modal = document.getElementById('authModal');
  var mode = 'register';
  var lastFocus = null;
  var toastTimer = null;
  var $ = function (id) { return document.getElementById(id); };

  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 4200);
  }

  /* ayudas para otros archivos (marketplace.js) */
  window.REEVA = {
    toast: toast,
    reduce: reduce,
    reveal: function (root) {
      root.querySelectorAll('.rv').forEach(function (el) {
        if (!el.classList.contains('in')) io.observe(el);
      });
    }
  };

  function clearErrors() {
    ['fEmail', 'fPass', 'fRobot'].forEach(function (id) { $(id).classList.remove('err'); });
    ['mEmail', 'mPass', 'mRobot'].forEach(function (id) { $(id).hidden = true; });
  }
  function fail(field, msg) {
    $(field.f).classList.add('err');
    if (msg) $(field.m).querySelector('span').textContent = msg;
    $(field.m).hidden = false;
  }

  function setMode(m) {
    mode = m;
    var reg = m === 'register';
    $('authTitle').textContent = reg ? 'Registrarse' : 'Iniciar sesión';
    $('authSwitchText').textContent = reg ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?';
    $('authSwitchLink').textContent = reg ? 'Iniciar sesión' : 'Registrarse';
    $('authSubmit').textContent = reg ? 'Registrarse' : 'Iniciar sesión';
    $('authNote').hidden = !reg;
    $('authPass').setAttribute('autocomplete', reg ? 'new-password' : 'current-password');
    clearErrors();
  }

  function openAuth(m) {
    lastFocus = document.activeElement;
    setMode(m || 'register');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('noscroll');
    setTimeout(function () { $('authEmail').focus(); }, 60);
  }
  function closeAuth() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('noscroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelector('.login').addEventListener('click', function () { openAuth('register'); });
  $('authClose').addEventListener('click', closeAuth);
  modal.addEventListener('mousedown', function (e) { if (e.target === modal) closeAuth(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeAuth();
  });
  $('authSwitchLink').addEventListener('click', function (e) {
    e.preventDefault();
    setMode(mode === 'register' ? 'login' : 'register');
  });
  $('pwToggle').addEventListener('click', function () {
    var inp = $('authPass'), show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    this.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
    this.firstChild.className = show ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  });
  $('authEmail').addEventListener('input', function () { $('fEmail').classList.remove('err'); $('mEmail').hidden = true; });
  $('authPass').addEventListener('input', function () { $('fPass').classList.remove('err'); $('mPass').hidden = true; });
  $('authRobot').addEventListener('change', function () { $('fRobot').classList.remove('err'); $('mRobot').hidden = true; });

  $('authForm').addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    var ok = true;
    var email = $('authEmail').value.trim();
    var pass = $('authPass').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { fail({ f: 'fEmail', m: 'mEmail' }); ok = false; }
    if (mode === 'register' ? pass.length < 8 : pass.length === 0) {
      fail({ f: 'fPass', m: 'mPass' }, mode === 'register' ? 'Ingresa una contraseña de al menos 8 caracteres.' : 'Ingresa tu contraseña.');
      ok = false;
    }
    if (!$('authRobot').checked) { fail({ f: 'fRobot', m: 'mRobot' }); ok = false; }
    if (!ok) {
      var firstErr = modal.querySelector('.field.err input');
      if (firstErr) firstErr.focus();
      return;
    }
    toast('Datos válidos. Falta conectar el servidor de cuentas para completar el ' + (mode === 'register' ? 'registro.' : 'inicio de sesión.'));
  });
  modal.querySelectorAll('.social-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      toast('Continuar con ' + b.dataset.provider + ' estará disponible cuando se conecte el servidor de cuentas.');
    });
  });

  route();
})();
