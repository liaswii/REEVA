/* ==========================================================
   REEVA · Marketplace
   - Banner: la chica cruza como cortina y deja ver el carrusel
   - Catálogo con filtros, orden y cambio de foto al pasar el cursor
   - Página de cada prenda (#product/nombre-de-la-prenda)

   PARA AGREGAR O CAMBIAR PRODUCTOS: edita la lista PRODUCTOS.
   - imgs: la primera foto es la normal; la segunda aparece al pasar el cursor.
   - cat: upcycled | accesorios | sostenible
   - agotado: true para mostrar el botón "Agotado"
   - colores: [{ n: 'Nombre', c: '#hex' }] si la prenda tiene colores (opcional)
   - info: texto de "Product Info" (opcional)
   ========================================================== */
(function () {
  var P = 'images/productos/';
  var PRODUCTOS = [
    { id: 'star-print-sweater', nombre: 'Star print sweater', antes: 15, precio: 10, cat: 'upcycled', tallas: ['M', 'S', 'L'], imgs: [P + 'star-1.jpg', P + 'star-2.jpg'] },
    { id: 'skyline-stripe-halter-top', nombre: 'Skyline Stripe Halter Top', antes: 15, precio: 10, cat: 'sostenible', tallas: ['S', 'M', 'L'], imgs: [P + 'skyline-1.jpg'] },
    { id: 'coat-with-star-print', nombre: 'Coat with star print', antes: 22, precio: 15, cat: 'upcycled', tallas: ['S', 'M', 'L'], colores: [{ n: 'Negro', c: '#10222b' }, { n: 'Azul oscuro', c: '#12307f' }], imgs: [P + 'coat-star-1.jpg'] },
    { id: 'black-jacket', nombre: 'black jacket', antes: 20, precio: 15, cat: 'upcycled', tallas: ['S', 'M', 'L'], imgs: [P + 'black-jacket-1.jpg'] },
    { id: 'coat-with-a-print-on-the-back', nombre: 'Coat with a print on the back', antes: 30, precio: 20, cat: 'upcycled', tallas: ['S', 'M', 'L'], imgs: [P + 'coat-back-1.jpg'] },
    { id: 'pants-with-prints', nombre: 'Pants with prints', antes: 20, precio: 15, cat: 'upcycled', tallas: ['S', 'M', 'L'], imgs: [P + 'pants-prints-1.jpg'] },
    { id: 'red-blouse', nombre: 'Red blouse', antes: 30, precio: 10, cat: 'sostenible', tallas: ['S', 'M', 'L'], imgs: [P + 'red-blouse-1.jpg'] },
    { id: 'double-star-hoodie', nombre: 'Double Star Hoodie', antes: 15, precio: 10, cat: 'upcycled', tallas: ['S', 'M', 'L'], agotado: true, imgs: [P + 'double-star-1.jpg'] },
    { id: 'lucky-8-hoodie', nombre: 'Lucky 8 Hoodie', antes: 25, precio: 15, cat: 'upcycled', tallas: ['S', 'M', 'L'], agotado: true, imgs: [P + 'lucky-8-1.jpg'] },
    { id: 'white-oversize', nombre: 'White oversize', antes: 15, precio: 10, cat: 'upcycled', tallas: ['S', 'M', 'L'], imgs: [P + 'white-oversize-1.jpg'] },
    { id: 'falda-midi-patchwork', nombre: 'Falda Midi Patchwork', precio: 30, cat: 'upcycled', tallas: ['S', 'M', 'L'], imgs: [P + 'falda-midi-1.jpg'] }
  ];

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var state = { cat: 'all', sort: 'rec' };
  var cart = [];                 /* [{id,size,color,qty}] */
  try { cart = JSON.parse(localStorage.getItem('reevaCart') || '[]') || []; } catch (e) { cart = []; }
  function saveCart() { try { localStorage.setItem('reevaCart', JSON.stringify(cart)); } catch (e) {} }

  function money(n) { return 'B/. ' + n.toFixed(2); }
  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function priceBox(p) {
    var box = el('p', 'price');
    if (p.antes) box.appendChild(el('s', null, money(p.antes)));
    box.appendChild(document.createTextNode(' ' + money(p.precio)));
    return box;
  }
  function byId(id) { for (var i = 0; i < PRODUCTOS.length; i++) if (PRODUCTOS[i].id === id) return PRODUCTOS[i]; return null; }

  /* ---------------- BANNER ---------------- */
  var banner = $('mkBanner'), carousel = $('mkCarousel'), track = $('mkTrack');
  var raf = null, dragging = false, pauseUntil = 0, copies = null;

  function buildLoop() {
    /* se duplica la tira para que el carrusel nunca se acabe */
    if (copies) return;
    var img = track.querySelector('img');
    copies = [img];
    for (var i = 0; i < 3; i++) {
      var c = img.cloneNode(); c.alt = ''; c.setAttribute('aria-hidden', 'true');
      track.appendChild(c); copies.push(c);
    }
  }
  function loopWidth() { return copies[0].getBoundingClientRect().width || 1; }
  function tick() {
    if (!dragging && Date.now() > pauseUntil && !reduce) {
      carousel.scrollLeft += 0.7;
    }
    var w = loopWidth();
    if (carousel.scrollLeft >= w) carousel.scrollLeft -= w;
    else if (carousel.scrollLeft <= 0 && dragging) carousel.scrollLeft += w;
    raf = requestAnimationFrame(tick);
  }
  function startCarousel() {
    buildLoop();
    if (raf) cancelAnimationFrame(raf);
    carousel.scrollLeft = 1;
    raf = requestAnimationFrame(tick);
  }
  function stopCarousel() { if (raf) cancelAnimationFrame(raf); raf = null; }

  /* arrastrar con el mouse o el dedo */
  (function drag() {
    var x0 = 0, s0 = 0;
    carousel.addEventListener('pointerdown', function (e) {
      dragging = true; x0 = e.clientX; s0 = carousel.scrollLeft;
      carousel.classList.add('grab');
      try { carousel.setPointerCapture(e.pointerId); } catch (err) {}
    });
    carousel.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      carousel.scrollLeft = s0 - (e.clientX - x0);
    });
    function end() { dragging = false; carousel.classList.remove('grab'); pauseUntil = Date.now() + 2500; }
    carousel.addEventListener('pointerup', end);
    carousel.addEventListener('pointercancel', end);
    carousel.addEventListener('wheel', function () { pauseUntil = Date.now() + 2500; }, { passive: true });
  })();

  function playBanner() {
    banner.classList.remove('go', 'done');
    stopCarousel();
    carousel.scrollLeft = 0;
    if (reduce) { banner.classList.add('done'); startCarousel(); return; }
    void banner.offsetWidth;                     /* reinicia la animación */
    setTimeout(function () {
      banner.classList.add('go');
    }, 700);
    setTimeout(function () {
      banner.classList.add('done');
      startCarousel();
    }, 700 + 2700);
  }

  /* ---------------- CATÁLOGO ---------------- */
  function list() {
    var items = PRODUCTOS.filter(function (p) { return state.cat === 'all' || p.cat === state.cat; });
    if (state.sort === 'asc') items.sort(function (a, b) { return a.precio - b.precio; });
    if (state.sort === 'desc') items.sort(function (a, b) { return b.precio - a.precio; });
    if (state.sort === 'az') items.sort(function (a, b) { return a.nombre.toLowerCase() < b.nombre.toLowerCase() ? -1 : 1; });
    return items;
  }

  function card(p, i) {
    var c = el('article', 'card rv');
    c.style.setProperty('--d', (Math.min(i, 6) * 0.07).toFixed(2) + 's');
    var a = el('a', 'card-img');
    a.href = '#product/' + p.id;
    a.setAttribute('aria-label', p.nombre);
    var i1 = el('img'); i1.src = p.imgs[0]; i1.alt = p.nombre; i1.loading = 'lazy';
    a.appendChild(i1);
    if (p.imgs[1]) {
      var i2 = el('img', 'alt'); i2.src = p.imgs[1]; i2.alt = ''; i2.setAttribute('aria-hidden', 'true'); i2.loading = 'lazy';
      a.appendChild(i2);
      a.classList.add('has-alt');
    }
    c.appendChild(a);
    var n = el('a', 'card-name', p.nombre); n.href = '#product/' + p.id;
    c.appendChild(n);
    c.appendChild(priceBox(p));
    var b = el('button', 'add', null);
    b.type = 'button';
    if (p.agotado) { b.disabled = true; b.innerHTML = '<span class="plus"></span>Agotado'; }
    else {
      b.innerHTML = '<span class="plus"></span>Agregar al carrito';
      b.addEventListener('click', function () { location.hash = '#product/' + p.id; });
    }
    c.appendChild(b);
    return c;
  }

  function renderList() {
    var grid = $('mkGrid');
    var items = list();
    grid.textContent = '';
    items.forEach(function (p, i) { grid.appendChild(card(p, i)); });
    $('mkCount').textContent = items.length + (items.length === 1 ? ' producto' : ' productos');
    $('mkEmpty').hidden = items.length > 0;
    if (window.REEVA) window.REEVA.reveal(grid);
  }

  $('mkFilters').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    state.cat = b.dataset.cat;
    [].forEach.call($('mkFilters').children, function (x) { x.classList.toggle('on', x === b); });
    renderList();
  });

  var sortBtn = $('mkSortBtn'), sortMenu = $('mkSortMenu');
  function closeSort() { sortMenu.hidden = true; sortBtn.setAttribute('aria-expanded', 'false'); }
  sortBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = sortMenu.hidden;
    sortMenu.hidden = !open;
    sortBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  sortMenu.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (!li) return;
    state.sort = li.dataset.sort;
    $('mkSortLabel').textContent = li.textContent;
    closeSort();
    renderList();
  });
  document.addEventListener('click', closeSort);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSort(); });

  /* ---------------- PÁGINA DE PRODUCTO ---------------- */
  function renderProduct(id) {
    var p = byId(id);
    var v = $('pdView');
    v.textContent = '';
    if (!p) {
      v.appendChild(el('p', 'pd-missing', 'No encontramos esta prenda.'));
      var back = el('a', 'btn btn-red', 'Volver al Marketplace'); back.href = '#marketplace';
      v.appendChild(back);
      return;
    }
    var thumbs = el('div', 'pd-thumbs');
    var main = el('div', 'pd-main');
    var big = el('img'); big.src = p.imgs[0]; big.alt = p.nombre;
    main.appendChild(big);
    p.imgs.forEach(function (src, i) {
      var t = el('button', 'pd-thumb' + (i === 0 ? ' on' : ''));
      t.type = 'button'; t.setAttribute('aria-label', 'Foto ' + (i + 1));
      var ti = el('img'); ti.src = src; ti.alt = '';
      t.appendChild(ti);
      t.addEventListener('click', function () {
        big.src = src;
        [].forEach.call(thumbs.children, function (x) { x.classList.toggle('on', x === t); });
      });
      thumbs.appendChild(t);
    });
    if (p.imgs.length < 2) thumbs.classList.add('single');

    var info = el('div', 'pd-info');
    info.appendChild(el('h1', null, p.nombre));
    info.appendChild(priceBox(p));

    var color = null, colorErr = null;
    if (p.colores) {
      var cWrap = el('div', 'pd-field');
      var cLabel = el('span', 'pd-label', 'Color *');
      cWrap.appendChild(cLabel);
      var sw = el('div', 'pd-colors');
      p.colores.forEach(function (co) {
        var b = el('button', null); b.type = 'button'; b.title = co.n; b.setAttribute('aria-label', co.n);
        b.style.setProperty('--c', co.c);
        b.addEventListener('click', function () {
          color = co.n;
          cLabel.textContent = 'Color: ' + co.n + ' *';
          [].forEach.call(sw.children, function (x) { x.classList.toggle('on', x === b); });
          colorErr.hidden = true;
        });
        sw.appendChild(b);
      });
      cWrap.appendChild(sw);
      colorErr = el('p', 'pd-err', 'Selecciona un color.'); colorErr.hidden = true;
      cWrap.appendChild(colorErr);
      info.appendChild(cWrap);
    }
    var size = null;
    var sizeWrap = el('div', 'pd-field');
    sizeWrap.appendChild(el('span', 'pd-label', 'Size *'));
    var sizes = el('div', 'pd-sizes');
    p.tallas.forEach(function (t) {
      var b = el('button', null, t); b.type = 'button';
      b.addEventListener('click', function () {
        size = t;
        [].forEach.call(sizes.children, function (x) { x.classList.toggle('on', x === b); });
        sizeErr.hidden = true;
      });
      sizes.appendChild(b);
    });
    sizeWrap.appendChild(sizes);
    var sizeErr = el('p', 'pd-err', 'Selecciona una talla.'); sizeErr.hidden = true;
    sizeWrap.appendChild(sizeErr);
    info.appendChild(sizeWrap);

    var qty = 1;
    var qWrap = el('div', 'pd-field');
    qWrap.appendChild(el('span', 'pd-label', 'Cantidad *'));
    var q = el('div', 'pd-qty');
    var minus = el('button', null, null); minus.type = 'button'; minus.setAttribute('aria-label', 'Menos'); minus.innerHTML = '<span class="mn"></span>';
    var val = el('span', 'val', '1');
    var plus = el('button', null, null); plus.type = 'button'; plus.setAttribute('aria-label', 'Más'); plus.innerHTML = '<span class="pl"></span>';
    function setQty(n) { qty = Math.max(1, Math.min(99, n)); val.textContent = qty; minus.disabled = qty <= 1; }
    minus.addEventListener('click', function () { setQty(qty - 1); });
    plus.addEventListener('click', function () { setQty(qty + 1); });
    q.appendChild(minus); q.appendChild(val); q.appendChild(plus);
    qWrap.appendChild(q);
    info.appendChild(qWrap);
    setQty(1);

    function add(silent) {
      if (p.agotado) { window.REEVA.toast('Esta prenda está agotada.'); return false; }
      var ok = true;
      if (p.colores && !color) { colorErr.hidden = false; ok = false; }
      if (!size) { sizeErr.hidden = false; ok = false; }
      if (!ok) return false;
      addToCart(p.id, size, color, qty, silent);
      return true;
    }
    var addB = el('button', 'pd-add', p.agotado ? 'Agotado' : 'Agregar al carrito'); addB.type = 'button';
    if (p.agotado) addB.disabled = true;
    addB.addEventListener('click', function () { add(); });
    var buy = el('button', 'pd-buy', 'Realizar compra'); buy.type = 'button';
    if (p.agotado) buy.disabled = true;
    buy.addEventListener('click', function () {
      if (add(true)) location.hash = '#checkout';
    });
    info.appendChild(addB);
    info.appendChild(buy);

    var acc = el('div', 'pd-acc');
    var accB = el('button', null, 'Product Info'); accB.type = 'button'; accB.setAttribute('aria-expanded', 'false');
    var accT = el('p', null, p.info || 'Prenda única creada a partir de textiles reutilizados. Más detalles muy pronto.'); accT.hidden = true;
    accB.addEventListener('click', function () {
      accT.hidden = !accT.hidden; accB.setAttribute('aria-expanded', accT.hidden ? 'false' : 'true'); acc.classList.toggle('open', !accT.hidden);
    });
    acc.appendChild(accB); acc.appendChild(accT);
    info.appendChild(acc);

    var share = el('div', 'pd-share');
    var url = encodeURIComponent(location.href), txt = encodeURIComponent(p.nombre);
    [
      ['Facebook', 'fa-brands fa-facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + url],
      ['Pinterest', 'fa-brands fa-pinterest', 'https://pinterest.com/pin/create/button/?url=' + url + '&description=' + txt],
      ['WhatsApp', 'fa-brands fa-whatsapp', 'https://wa.me/?text=' + txt + '%20' + url],
      ['X', 'fa-brands fa-x-twitter', 'https://twitter.com/intent/tweet?url=' + url + '&text=' + txt]
    ].forEach(function (s) {
      var a = el('a'); a.href = s[2]; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'Compartir en ' + s[0]);
      a.innerHTML = '<i class="' + s[1] + '"></i>';
      share.appendChild(a);
    });
    info.appendChild(share);

    var wrap = el('div', 'pd-wrap');
    wrap.appendChild(thumbs); wrap.appendChild(main); wrap.appendChild(info);
    v.appendChild(wrap);
    wrap.classList.add('pd-in');
  }


  /* ---------------- CARRITO (panel lateral) ---------------- */
  var overlay = el('div', 'cart-overlay');
  var drawer = el('aside', 'cart-drawer');
  drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-label', 'Carrito de compras');
  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  function totalQty() { return cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function syncBadge() {
    var n = totalQty();
    $('cartCount').textContent = n;
    var c = document.querySelector('.cart');
    if (c) c.setAttribute('aria-label', 'Carrito de compras, ' + n + (n === 1 ? ' artículo' : ' artículos'));
  }
  function addToCart(id, size, color, qty, silent) {
    var found = cart.filter(function (l) { return l.id === id && l.size === size && l.color === color; })[0];
    if (found) found.qty = Math.min(99, found.qty + qty);
    else cart.push({ id: id, size: size, color: color, qty: qty });
    saveCart(); syncBadge(); renderCart(); if (!silent) openCart();
  }

  function renderCart() {
    drawer.textContent = '';
    var n = totalQty();
    var head = el('div', 'cart-head');
    var t = el('h2', null, 'Carrito ');
    t.appendChild(el('span', null, '(' + n + (n === 1 ? ' item' : ' items') + ')'));
    var x = el('button', 'cart-x'); x.type = 'button'; x.setAttribute('aria-label', 'Cerrar carrito');
    x.innerHTML = '<svg viewBox="0 0 14 14" width="16" height="16" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>';
    x.addEventListener('click', closeCart);
    head.appendChild(t); head.appendChild(x);
    drawer.appendChild(head);

    if (!cart.length) {
      var empty = el('div', 'cart-empty');
      empty.appendChild(el('p', null, 'Tu carrito está vacío'));
      var go = el('a', 'cart-btn ghost', 'Seguir comprando'); go.href = '#marketplace';
      go.addEventListener('click', closeCart);
      empty.appendChild(go);
      drawer.appendChild(empty);
      return;
    }

    var body = el('div', 'cart-body');
    var total = 0;
    cart.forEach(function (l, idx) {
      var p = byId(l.id); if (!p) return;
      total += p.precio * l.qty;
      var row = el('div', 'cart-row');
      var im = el('a', 'cart-img'); im.href = '#product/' + p.id; im.addEventListener('click', closeCart);
      var ii = el('img'); ii.src = p.imgs[0]; ii.alt = p.nombre; im.appendChild(ii);
      var mid = el('div', 'cart-mid');
      var nm = el('a', 'cart-name', p.nombre); nm.href = '#product/' + p.id; nm.addEventListener('click', closeCart);
      mid.appendChild(nm);
      if (l.color) mid.appendChild(el('p', 'cart-opt', 'Color: ' + l.color));
      if (l.size) mid.appendChild(el('p', 'cart-opt', 'Size: ' + l.size));
      var q = el('div', 'cart-qty');
      var mn = el('button'); mn.type = 'button'; mn.setAttribute('aria-label', 'Menos'); mn.innerHTML = '<span class="mn"></span>'; mn.disabled = l.qty <= 1;
      var vv = el('span', 'val', String(l.qty));
      var pl = el('button'); pl.type = 'button'; pl.setAttribute('aria-label', 'Más'); pl.innerHTML = '<span class="pl"></span>';
      mn.addEventListener('click', function () { l.qty = Math.max(1, l.qty - 1); update(); });
      pl.addEventListener('click', function () { l.qty = Math.min(99, l.qty + 1); update(); });
      q.appendChild(mn); q.appendChild(vv); q.appendChild(pl);
      mid.appendChild(q);
      var side = el('div', 'cart-side');
      var del = el('button', 'cart-del'); del.type = 'button'; del.setAttribute('aria-label', 'Quitar ' + p.nombre);
      del.innerHTML = '<svg viewBox="0 0 16 18" width="15" height="17" aria-hidden="true"><path d="M2 4h12M6 4V2h4v2M3.5 4l.8 12h7.4l.8-12M6.5 7v6M9.5 7v6" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/></svg>';
      del.addEventListener('click', function () { cart.splice(idx, 1); update(); });
      side.appendChild(del);
      var pr = el('p', 'cart-price');
      if (p.antes) pr.appendChild(el('s', null, money(p.antes * l.qty)));
      pr.appendChild(el('b', null, money(p.precio * l.qty)));
      side.appendChild(pr);
      row.appendChild(im); row.appendChild(mid); row.appendChild(side);
      body.appendChild(row);
    });
    drawer.appendChild(body);

    var foot = el('div', 'cart-foot');
    var promoBtn = el('button', 'cart-promo'); promoBtn.type = 'button';
    promoBtn.innerHTML = '<svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true"><path d="M1.5 9.2V2.5a1 1 0 0 1 1-1h6.7l7.3 7.3-7 7-8-6.6z" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/><circle cx="5.3" cy="5.3" r="1.1" fill="currentColor"/></svg>Ingresar código de promoción';
    var promoForm = el('form', 'cart-promo-form'); promoForm.hidden = true;
    var pi = el('input'); pi.type = 'text'; pi.placeholder = 'Código de promoción'; pi.setAttribute('aria-label', 'Código de promoción');
    var pa = el('button', null, 'Aplicar'); pa.type = 'submit';
    promoForm.appendChild(pi); promoForm.appendChild(pa);
    promoBtn.addEventListener('click', function () { promoForm.hidden = !promoForm.hidden; if (!promoForm.hidden) pi.focus(); });
    promoForm.addEventListener('submit', function (e) { e.preventDefault(); window.REEVA.toast('Ese código de promoción no es válido.'); });
    foot.appendChild(promoBtn); foot.appendChild(promoForm);

    var tot = el('div', 'cart-total');
    tot.appendChild(el('span', null, 'Total estimado'));
    tot.appendChild(el('span', null, money(total)));
    foot.appendChild(tot);
    foot.appendChild(el('p', 'cart-note', 'Los impuestos y costos de envío se calculan en la página de pago.'));
    var fin = el('button', 'cart-btn solid', 'Finalizar compra'); fin.type = 'button';
    fin.addEventListener('click', function () { closeCart(); location.hash = '#checkout'; });
    var ver = el('button', 'cart-btn ghost', 'Ver carrito'); ver.type = 'button';
    ver.addEventListener('click', function () { closeCart(); location.hash = '#cart'; });
    foot.appendChild(fin); foot.appendChild(ver);
    drawer.appendChild(foot);
  }
  function update() { saveCart(); syncBadge(); renderCart(); if (current === 'cart') renderCartPage(); }

  var lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    renderCart();
    overlay.classList.add('open');
    document.body.classList.add('noscroll');
    var x = drawer.querySelector('.cart-x'); if (x) setTimeout(function () { x.focus(); }, 60);
  }
  function closeCart() {
    overlay.classList.remove('open');
    document.body.classList.remove('noscroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeCart(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) closeCart(); });
  document.querySelector('.cart').addEventListener('click', openCart);
  syncBadge();


  /* ---------------- PÁGINA «MI CARRITO» ---------------- */
  var LOCK = '<svg viewBox="0 0 12 14" width="11" height="13" aria-hidden="true"><path d="M2 6V4.2a4 4 0 0 1 8 0V6h.6c.8 0 1.4.6 1.4 1.4v5.2c0 .8-.6 1.4-1.4 1.4H1.4C.6 14 0 13.4 0 12.6V7.4C0 6.6.6 6 1.4 6H2zm1.6 0h4.8V4.2a2.4 2.4 0 0 0-4.8 0V6z" fill="currentColor"/></svg>';
  var TAG = '<svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true"><path d="M1.5 9.2V2.5a1 1 0 0 1 1-1h6.7l7.3 7.3-7 7-8-6.6z" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/><circle cx="5.3" cy="5.3" r="1.1" fill="currentColor"/></svg>';
  var TRASH = '<svg viewBox="0 0 16 18" width="15" height="17" aria-hidden="true"><path d="M2 4h12M6 4V2h4v2M3.5 4l.8 12h7.4l.8-12M6.5 7v6M9.5 7v6" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/></svg>';
  var NOTE = '<svg viewBox="0 0 14 17" width="13" height="16" aria-hidden="true"><path d="M1 1h7l5 5v10H1V1zM8 1v5h5" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/></svg>';

  function cartTotal() {
    return cart.reduce(function (s, l) { var p = byId(l.id); return s + (p ? p.precio * l.qty : 0); }, 0);
  }
  function lineOpts(box, l, cls) {
    if (l.color) box.appendChild(el('p', cls, 'Color: ' + l.color));
    if (l.size) box.appendChild(el('p', cls, 'Size: ' + l.size));
  }
  function linePrice(p, l) {
    var pr = el('p', 'cp-price');
    if (p.antes) pr.appendChild(el('s', null, money(p.antes * l.qty)));
    pr.appendChild(document.createTextNode(' ' + money(p.precio * l.qty)));
    return pr;
  }
  function qtyBox(l, cls) {
    var q = el('div', cls);
    var mn = el('button'); mn.type = 'button'; mn.setAttribute('aria-label', 'Menos'); mn.innerHTML = '<span class="mn"></span>'; mn.disabled = l.qty <= 1;
    var vv = el('span', 'val', String(l.qty));
    var pl = el('button'); pl.type = 'button'; pl.setAttribute('aria-label', 'Más'); pl.innerHTML = '<span class="pl"></span>';
    mn.addEventListener('click', function () { l.qty = Math.max(1, l.qty - 1); update(); });
    pl.addEventListener('click', function () { l.qty = Math.min(99, l.qty + 1); update(); });
    q.appendChild(mn); q.appendChild(vv); q.appendChild(pl);
    return q;
  }

  var cartNote = '';
  function renderCartPage() {
    var v = $('cartView');
    v.textContent = '';
    var left = el('div', 'cp-left');
    left.appendChild(el('h1', 'cp-h', 'Mi carrito'));
    if (!cart.length) {
      var e = el('div', 'cp-empty');
      e.appendChild(el('p', null, 'Tu carrito está vacío'));
      var go = el('a', 'cp-btn', 'Seguir comprando'); go.href = '#marketplace';
      e.appendChild(go);
      left.appendChild(e);
      v.appendChild(left);
      return;
    }
    var rows = el('div', 'cp-rows');
    cart.forEach(function (l, idx) {
      var p = byId(l.id); if (!p) return;
      var r = el('div', 'cp-row');
      var im = el('a', 'cp-img'); im.href = '#product/' + p.id;
      var ii = el('img'); ii.src = p.imgs[0]; ii.alt = p.nombre; im.appendChild(ii);
      var mid = el('div', 'cp-mid');
      var nm = el('a', 'cp-name', p.nombre); nm.href = '#product/' + p.id;
      mid.appendChild(nm); lineOpts(mid, l, 'cp-opt');
      var del = el('button', 'cp-del'); del.type = 'button'; del.setAttribute('aria-label', 'Quitar ' + p.nombre); del.innerHTML = TRASH;
      del.addEventListener('click', function () { cart.splice(idx, 1); update(); });
      r.appendChild(im); r.appendChild(mid); r.appendChild(qtyBox(l, 'cp-qty')); r.appendChild(linePrice(p, l)); r.appendChild(del);
      rows.appendChild(r);
    });
    left.appendChild(rows);

    var extras = el('div', 'cp-extras');
    var promo = el('button', 'cp-link'); promo.type = 'button'; promo.innerHTML = TAG + '<span>Ingresar código promocional</span>';
    var pf = el('form', 'cp-form'); pf.hidden = true;
    var pi = el('input'); pi.type = 'text'; pi.placeholder = 'Código promocional'; pi.setAttribute('aria-label', 'Código promocional');
    var pb = el('button', null, 'Aplicar'); pb.type = 'submit'; pf.appendChild(pi); pf.appendChild(pb);
    promo.addEventListener('click', function () { pf.hidden = !pf.hidden; if (!pf.hidden) pi.focus(); });
    pf.addEventListener('submit', function (ev) { ev.preventDefault(); window.REEVA.toast('Ese código promocional no es válido.'); });
    var note = el('button', 'cp-link'); note.type = 'button'; note.innerHTML = NOTE + '<span>Agregar una nota</span>';
    var nf = el('textarea', 'cp-note'); nf.hidden = !cartNote; nf.rows = 3; nf.value = cartNote; nf.placeholder = 'Escribe una nota para tu pedido';
    nf.setAttribute('aria-label', 'Nota para el pedido');
    nf.addEventListener('input', function () { cartNote = nf.value; });
    note.addEventListener('click', function () { nf.hidden = !nf.hidden; if (!nf.hidden) nf.focus(); });
    extras.appendChild(promo); extras.appendChild(pf); extras.appendChild(note); extras.appendChild(nf);
    left.appendChild(extras);

    var right = el('aside', 'cp-right');
    right.appendChild(el('h2', 'cp-h', 'Resumen del pedido'));
    function line(a, b, cls) { var d = el('div', 'cp-line' + (cls ? ' ' + cls : '')); d.appendChild(el('span', null, a)); d.appendChild(el('span', null, b)); return d; }
    right.appendChild(line('Subtotal', money(cartTotal())));
    right.appendChild(line('Envío', 'GRATIS'));
    right.appendChild(el('p', 'cp-where', 'Panamá, Panamá'));
    right.appendChild(line('Total', money(cartTotal()), 'total'));
    var fin = el('a', 'cp-fin', 'Finalizar compra'); fin.href = '#checkout';
    right.appendChild(fin);
    var safe = el('p', 'cp-safe'); safe.innerHTML = LOCK + '<span>Pago seguro</span>';
    right.appendChild(safe);

    v.appendChild(left); v.appendChild(right);
  }

  /* ---------------- PÁGINA DE PAGO ---------------- */
  function renderCheckout() {
    var v = $('coView');
    v.textContent = '';
    var top = el('header', 'co-top');
    var in1 = el('div', 'co-top-in');
    var brand = el('a', 'co-brand'); brand.href = '#home';
    var lg = el('img'); lg.src = 'images/logo-transparente.png'; lg.alt = 'REEVA';
    brand.appendChild(lg); brand.appendChild(el('span', null, 'PÁGINA DE PAGO'));
    var back = el('a', 'co-back', 'Seguir navegando'); back.href = '#marketplace';
    in1.appendChild(brand); in1.appendChild(back); top.appendChild(in1);
    v.appendChild(top);

    var main = el('div', 'co-main');
    var l = el('div', 'co-l');
    var msg = el('div', 'co-msg');
    msg.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6.8 6.8l6.4 6.4M13.2 6.8l-6.4 6.4" stroke="currentColor" stroke-width="1.3"/></svg>';
    msg.appendChild(el('h1', null, 'No podemos aceptar pagos online'));
    msg.appendChild(el('p', null, 'Contáctanos para recibir ayuda con tu pedido.'));
    l.appendChild(msg);

    var r = el('div', 'co-r');
    var n = totalQty();
    var h = el('div', 'co-sum-h');
    var t = el('h2', null, 'Resumen del pedido ');
    t.appendChild(el('span', null, '(' + n + (n === 1 ? ' ítem' : ' ítems') + ')'));
    var ed = el('a', 'co-edit'); ed.href = '#cart'; ed.setAttribute('aria-label', 'Editar carrito');
    ed.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1.5 14.5l.8-3.6L11.6 1.6a1.3 1.3 0 0 1 1.8 0l1 1a1.3 1.3 0 0 1 0 1.8L5.1 13.7l-3.6.8zM10 3.2l2.8 2.8" stroke="currentColor" stroke-width="1.1" fill="none" stroke-linejoin="round"/></svg>';
    h.appendChild(t); h.appendChild(ed);
    r.appendChild(h);
    if (!cart.length) r.appendChild(el('p', 'co-empty', 'Tu carrito está vacío.'));
    cart.forEach(function (ln) {
      var p = byId(ln.id); if (!p) return;
      var row = el('div', 'co-item');
      var th = el('div', 'co-th');
      var ii = el('img'); ii.src = p.imgs[0]; ii.alt = p.nombre; th.appendChild(ii);
      th.appendChild(el('span', 'co-badge', String(ln.qty)));
      var d = el('div', 'co-d');
      d.appendChild(el('p', 'co-n', p.nombre));
      var o = el('div', 'co-o'); lineOpts(o, ln, null); d.appendChild(o);
      row.appendChild(th); row.appendChild(d); row.appendChild(linePrice(p, ln));
      r.appendChild(row);
    });
    var promo = el('div', 'co-promo');
    var pb = el('button'); pb.type = 'button'; pb.innerHTML = TAG + '<span>Ingresar código de promoción</span>';
    var pf = el('form'); pf.hidden = true;
    var pi = el('input'); pi.type = 'text'; pi.setAttribute('aria-label', 'Código de promoción'); pi.placeholder = 'Código de promoción';
    var pa = el('button', null, 'Aplicar'); pa.type = 'submit'; pf.appendChild(pi); pf.appendChild(pa);
    pb.addEventListener('click', function () { pf.hidden = !pf.hidden; if (!pf.hidden) pi.focus(); });
    pf.addEventListener('submit', function (ev) { ev.preventDefault(); window.REEVA.toast('Ese código de promoción no es válido.'); });
    promo.appendChild(pb); promo.appendChild(pf);
    r.appendChild(promo);
    function line(a, b, cls) { var d = el('div', 'co-line' + (cls ? ' ' + cls : '')); d.appendChild(el('span', null, a)); d.appendChild(el('span', null, b)); return d; }
    r.appendChild(line('Subtotal', money(cartTotal())));
    r.appendChild(line('entrega|envío', 'Gratis'));
    r.appendChild(line('Total', money(cartTotal()), 'total'));

    main.appendChild(l); main.appendChild(r);
    v.appendChild(main);
    var foot = el('footer', 'co-foot');
    var fi = el('div', 'co-foot-in'); fi.innerHTML = LOCK + '<span>Pago seguro</span>';
    foot.appendChild(fi); v.appendChild(foot);
  }

  /* ---------------- rutas ---------------- */
  var current = '';
  function onRoute(page, arg) {
    current = page;
    if (page !== 'marketplace') stopCarousel();
    if (page === 'marketplace') { renderList(); playBanner(); }
    if (page === 'product') renderProduct(arg);
    if (page === 'cart') renderCartPage();
    if (page === 'checkout') renderCheckout();
  }
  document.addEventListener('reeva:route', function (e) { onRoute(e.detail.page, e.detail.arg); });
  /* la primera ruta se resolvió antes de cargar este archivo */
  var first = (location.hash || '').slice(1).split('/');
  if (first[0] === 'marketplace' || first[0] === 'product' || first[0] === 'cart' || first[0] === 'checkout') onRoute(first[0], first[1] || '');
})();
