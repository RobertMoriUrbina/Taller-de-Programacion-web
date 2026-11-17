/* VISTA: HTML compartido y representación del modelo. Los datos se escapan antes de renderizar. */
'use strict';
window.CampoView = (() => {
  const M = window.CampoModel;
  const money = (n) => 'S/ ' + Number(n).toFixed(2);
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
    );
  const flower = /* HTML */ `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <g stroke="currentColor" stroke-width="1.1">
      ${[0, 60, 120, 180, 240, 300]
        .map(
          (a) =>
            /* HTML */ `<ellipse cx="24" cy="14" rx="6" ry="11" transform="rotate(${a} 24 24)" />`
        )
        .join('')}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </g>
  </svg>`;
  const brand = /* HTML */ `<a class="brand" href="index.html" aria-label="Campo dei Fiori, inicio"
    ><span class="brand-mark">${flower}</span
    ><span><span class="brand-name">Campo dei Fiori</span><small>ATELIER FLORAL</small></span></a
  >`;
  function shell() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.getElementById('site-header').innerHTML = /* HTML */ `<div class="topbar">
        Un detalle bonito puede cambiarlo todo. <span aria-hidden="true">✧</span> Flores con
        intención, desde Lima.
      </div>
      <header class="site-header">
        <div class="wrap header-inner">
          ${brand}
          <nav aria-label="Navegación principal" class="nav-links" id="main-nav">
            ${[
              ['index.html', 'Inicio'],
              ['coleccion.html', 'Colección'],
              ['nosotros.html', 'Nuestro atelier'],
              ['experiencia.html', 'Diario floral'],
              ['contacto.html', 'Contacto']
            ]
              .map(
                ([url, label]) =>
                  /* HTML */ `<a href="${url}" ${url === current ? 'aria-current="page"' : ''}
                    >${label}</a
                  >`
              )
              .join('')}
          </nav>
          <div class="header-tools">
            <button
              class="cart-trigger"
              data-open="cart"
              aria-label="Abrir carrito"
              aria-haspopup="dialog"
            >
              <svg
                viewBox="0 0 24 26"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                aria-hidden="true"
              >
                <path d="M4 8h16l1 16H3L4 8Z" />
                <path d="M8 9V6a4 4 0 0 1 8 0v3" /></svg
              ><span class="cart-word">Mi ramo</span
              ><span id="cart-count" class="cart-count">0</span></button
            ><button
              class="menu-toggle"
              id="menu-toggle"
              aria-label="Abrir menú"
              aria-expanded="false"
              aria-controls="main-nav"
            >
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>`;
    document.getElementById('site-footer').innerHTML = /* HTML */ `<footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            ${brand}
            <p>Flores que cuentan tu historia.<br />Detalles que se quedan en el corazón.</p>
          </div>
          <div>
            <p class="footer-heading">EXPLORA EL JARDÍN</p>
            <div class="footer-links">
              <a href="coleccion.html">La colección</a><a href="nosotros.html">Nuestro atelier</a
              ><a href="experiencia.html">Diario floral</a
              ><button data-open="quiz">Encuentra tu ramo</button>
            </div>
          </div>
          <div>
            <p class="footer-heading">ESTAMOS CERCA</p>
            <div class="footer-links">
              <a href="contacto.html#sugerencias">Sugerencias</a
              ><a href="experiencia.html#preguntas">Preguntas frecuentes</a
              ><a href="reclamaciones.html">Libro de reclamaciones</a
              ><a href="contacto.html#ubicacion">Ubicación referencial</a>
            </div>
          </div>
          <div>
            <p class="footer-heading">TUS PEQUEÑOS GESTOS</p>
            <div class="footer-links">
              <button data-open="orders">Mis pedidos de prueba</button
              ><button data-open="privacy">Privacidad y datos locales</button>
            </div>
            <p class="footer-note">Proyecto académico.<br />Sin pagos ni entregas reales.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Campo dei Fiori · Creado con calma y cariño.</span
          ><span>Barranco, Lima · Una propuesta floral académica</span>
        </div>
      </div>
    </footer>`;
    document.getElementById('dialogs').innerHTML = /* HTML */ ` <dialog
        id="cart-dialog"
        class="drawer"
        aria-labelledby="cart-title"
      >
        <div class="dialog-head">
          <h2 id="cart-title">Tu pequeño jardín</h2>
          <button class="close-dialog" data-close aria-label="Cerrar carrito" autofocus>×</button>
        </div>
        <div id="cart-content"></div>
      </dialog>
      <dialog id="quiz-dialog" class="quiz-dialog" aria-labelledby="quiz-title">
        <div class="dialog-head">
          <h2 id="quiz-title">Tu brújula floral</h2>
          <button class="close-dialog" data-close aria-label="Cerrar recomendador" autofocus>
            ×
          </button>
        </div>
        <div id="quiz-content"></div>
      </dialog>
      <dialog id="detail-dialog" aria-labelledby="detail-title">
        <div class="dialog-head">
          <p class="eyebrow reduced-space">DE NUESTRO JARDÍN</p>
          <button class="close-dialog" data-close aria-label="Cerrar detalle" autofocus>×</button>
        </div>
        <div id="detail-content"></div>
      </dialog>
      <dialog id="orders-dialog" aria-labelledby="orders-title">
        <div class="dialog-head">
          <h2 id="orders-title">Tus momentos de prueba</h2>
          <button class="close-dialog" data-close aria-label="Cerrar historial" autofocus>×</button>
        </div>
        <div id="orders-content"></div>
      </dialog>
      <dialog id="privacy-dialog" aria-labelledby="privacy-title">
        <div class="dialog-head">
          <h2 id="privacy-title">Tus datos, con cuidado</h2>
          <button class="close-dialog" data-close aria-label="Cerrar privacidad" autofocus>
            ×
          </button>
        </div>
        <p>
          Esta web es una demostración académica. No recibe pagos, no envía mensajes ni gestiona
          entregas reales.
        </p>
        <p>
          El navegador conserva los productos y cantidades de tu carrito, los códigos y resúmenes de
          pedidos de prueba y las constancias de sugerencias y reclamaciones. No guardamos nombres,
          documentos, teléfonos, direcciones, correos ni dedicatorias.
        </p>
        <p>
          Los datos locales no se comparten entre dispositivos. Si desactivas el almacenamiento o
          abres el sitio como archivo, la persistencia puede variar según tu navegador.
        </p>
        <p>
          El mapa de Google se carga al visitar Contacto y puede comunicar a ese proveedor datos
          técnicos de la conexión. El resto de las imágenes, tipografías y el video son locales.
        </p>
        <button class="button secondary" data-open="orders">Ver y borrar datos de prueba</button>
      </dialog>`;
  }
  function productCard(p) {
    return /* HTML */ `<article class="product-card">
      <div class="product-photo">
        <a
          href="coleccion.html#${p.id}"
          data-detail="${p.id}"
          aria-label="Ver detalles de ${esc(p.name)}"
          ><img
            src="assets/images/${p.image}"
            alt="${esc(p.composition)}"
            loading="lazy"
            width="400"
            height="450" /></a
        ><span class="product-tag">${esc(p.tag)}</span>
      </div>
      <div class="product-meta">
        <h3>${esc(p.name)}</h3>
        <span class="price">${money(p.price)}</span>
      </div>
      <p class="product-description">${esc(p.description)}</p>
      <div class="product-bottom">
        <span class="product-intent">${esc(p.category.toUpperCase())}</span
        ><button
          class="add-button"
          data-add="${p.id}"
          aria-label="Añadir ${esc(p.name)} al carrito"
        >
          Añadir al ramo <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>`;
  }
  function catalog(list) {
    const target = document.getElementById('catalog');
    if (!target) return;
    target.innerHTML = list.length
      ? list.map(productCard).join('')
      : /* HTML */ `<div class="empty-state">
          <h3>Ese ramo aún no florece aquí.</h3>
          <p>Prueba otra búsqueda o vuelve a ver toda la colección.</p>
          <button class="under-link" id="reset-filters">Limpiar filtros →</button>
        </div>`;
    document.getElementById('result-count').textContent =
      `${list.length} ${list.length === 1 ? 'ramo encontrado' : 'ramos encontrados'}`;
  }
  function badge() {
    const count = M.getCart().reduce((s, x) => s + x.qty, 0);
    document.getElementById('cart-count').textContent = count;
    document
      .querySelector('.cart-trigger')
      .setAttribute('aria-label', `Abrir carrito, ${count} ${count === 1 ? 'ramo' : 'ramos'}`);
  }
  function cart() {
    const rows = M.getCart();
    document.getElementById('cart-content').innerHTML = rows.length
      ? /* HTML */ `<p class="small-note">
            Tu dedicatoria está a un paso. Máximo 20 unidades por ramo.
          </p>
          <div class="table-scroll">
            <table class="cart-table">
              <caption>
                TU SELECCIÓN FLORAL
              </caption>
              <thead>
                <tr>
                  <th scope="col">Ramo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Importe</th>
                  <th scope="col"><span class="sr-only">Acción</span></th>
                </tr>
              </thead>
              <tbody>
                ${rows
                  .map(
                    (p) =>
                      /* HTML */ `<tr>
                        <td>
                          <div class="cart-product">
                            <img src="assets/images/${p.image}" alt="" />
                            <div><span>${esc(p.name)}</span><small>${money(p.price)}</small></div>
                          </div>
                        </td>
                        <td>
                          <div class="qty-controls">
                            <button
                              data-qty="${p.id}"
                              data-delta="-1"
                              aria-label="Restar ${esc(p.name)}"
                            >
                              −</button
                            ><span aria-label="Cantidad de ${esc(p.name)}">${p.qty}</span
                            ><button
                              data-qty="${p.id}"
                              data-delta="1"
                              aria-label="Sumar ${esc(p.name)}"
                              ${p.qty >= 20 ? 'disabled' : ''}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${money(p.price * p.qty)}</td>
                        <td>
                          <button
                            class="remove-item"
                            data-remove="${p.id}"
                            aria-label="Quitar ${esc(p.name)}"
                          >
                            Quitar
                          </button>
                        </td>
                      </tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
          <div class="cart-totals">
            <div class="total-row">
              <span>Subtotal</span><strong>${money(M.subtotal())}</strong>
            </div>
            <p class="small-note reduced-space">Recojo sin costo o entrega simulada por S/ 15.</p>
          </div>
          <button class="button cart-action" id="checkout-button">
            Preparar mi detalle <span aria-hidden="true">→</span>
          </button>
          <div id="checkout-section" hidden></div>
          <p class="small-note" style="margin-top:16px">
            Pedido de demostración: no se realiza ningún cobro. Usa datos ficticios.
          </p>`
      : /* HTML */ `<div class="empty-state">
          <span class="script">todo empieza con una flor</span>
          <h3>Tu jardín está por florecer.</h3>
          <p>Aún no has elegido ningún ramo.</p>
          <a class="button" href="coleccion.html">Explorar la colección ↗</a>
        </div>`;
    badge();
  }
  function checkout() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const minimum = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    document.getElementById('checkout-section').innerHTML = /* HTML */ `<h3 class="checkout-title">
        Dale tu toque personal.
      </h3>
      <form id="checkout-form" class="checkout-form">
        <div class="form-grid">
          <div class="full">
            <label for="order-name">Tu nombre</label
            ><input
              id="order-name"
              name="nombre"
              required
              minlength="3"
              maxlength="80"
              autocomplete="name"
            />
          </div>
          <div>
            <label for="order-email">Correo electrónico</label
            ><input
              id="order-email"
              name="correo"
              type="email"
              required
              maxlength="120"
              autocomplete="email"
            />
          </div>
          <div>
            <label for="order-phone">Teléfono</label
            ><input
              id="order-phone"
              name="telefono"
              type="tel"
              required
              pattern="[0-9 +()-]{7,20}"
              maxlength="20"
              autocomplete="tel"
            />
          </div>
          <div>
            <label for="order-method">Método de entrega</label
            ><select id="order-method" name="metodo">
              <option value="pickup">Recojo · sin costo</option>
              <option value="delivery">Delivery · S/ 15.00</option>
            </select>
          </div>
          <div>
            <label for="order-date">Fecha referencial</label
            ><input id="order-date" name="fecha" type="date" required min="${minimum}" />
          </div>
        </div>
        <div id="delivery-fields" hidden>
          <label for="order-district">Distrito</label
          ><select id="order-district" name="distrito" disabled required>
            <option value="">Selecciona un distrito</option>
            <option>Barranco</option>
            <option>Miraflores</option>
            <option>Surco</option>
            <option>San Borja</option></select
          ><label for="order-address">Dirección de entrega</label
          ><input
            id="order-address"
            name="direccion"
            disabled
            required
            minlength="5"
            maxlength="180"
            autocomplete="street-address"
          />
        </div>
        <label for="order-message">Dedicatoria (opcional, hasta 180 caracteres)</label
        ><textarea
          id="order-message"
          name="dedicatoria"
          rows="2"
          maxlength="180"
          placeholder="Hay cosas que solo tú puedes decir…"
        ></textarea>
        <div class="card-preview">
          <p class="eyebrow">UNA TARJETA, UN SENTIMIENTO</p>
          <p id="dedication-preview">Un pequeño detalle, con mucho cariño.</p>
        </div>
        <div class="cart-totals">
          <div class="total-row">
            <span>Envío simulado</span><span id="shipping-price">Sin costo</span>
          </div>
          <div class="total-row grand-total">
            <span>Total de prueba</span><span id="checkout-total">${money(M.subtotal())}</span>
          </div>
        </div>
        <label class="checkbox-label"
          ><input type="checkbox" required />Entiendo que no se realiza una compra real y usaré
          datos ficticios.</label
        >
        <p class="small-note">
          No almacenamos ni enviamos tus datos personales o tu dedicatoria. Solo conservamos el
          resumen del pedido de prueba.
        </p>
        <button class="button cart-action" type="submit">Confirmar pedido de prueba ↗</button>
      </form>`;
    document.getElementById('checkout-section').hidden = false;
    document.getElementById('checkout-button').hidden = true;
  }
  function orderReceipt(order) {
    document.getElementById('cart-content').innerHTML = /* HTML */ `<div class="receipt">
      <div class="receipt-icon" aria-hidden="true">✧</div>
      <p class="eyebrow">UN DETALLE LISTO PARA IMAGINAR</p>
      <h3>Tu intención ya floreció.</h3>
      <p>Pedido de prueba creado. No se ha realizado ningún cobro ni coordinado una entrega.</p>
      <strong class="receipt-code">${esc(order.code)}</strong>
      <p>Total simulado: <strong>${money(order.total)}</strong></p>
      <p class="small-note">
        ${M.storageAvailable()
          ? 'El resumen está guardado en este navegador.'
          : 'El navegador no permite guardar: el resumen solo estará disponible durante esta visita.'}
        Tus datos personales y dedicatoria se descartaron.
      </p>
      <button class="button" data-open="orders">Ver mis pedidos de prueba ↗</button>
    </div>`;
    badge();
  }
  function orders() {
    const list = M.getOrders().slice().reverse(),
      receipts = M.getReceipts().slice().reverse();
    document.getElementById('orders-content').innerHTML = /* HTML */ `<p class="small-note">
        Solo este navegador · sin pagos ni entregas reales · se conservan los últimos 30 registros
        de cada tipo.
      </p>
      ${list.length
        ? list
            .map(
              (o) =>
                /* HTML */ `<article class="order-record">
                  <h3>${esc(o.code)}</h3>
                  <p>
                    ${o.items.map((x) => esc(M.product(x.id).name) + ' × ' + x.qty).join(' · ')}
                  </p>
                  <p>
                    ${esc(o.date)} ·
                    ${o.method === 'delivery' ? 'Entrega simulada' : 'Recojo simulado'} ·
                    <strong
                      >${money(
                        o.items.reduce((s, x) => s + M.product(x.id).price * x.qty, 0) +
                          (o.method === 'delivery' ? 15 : 0)
                      )}</strong
                    >
                  </p>
                  <span class="small-note">Estado: demostración registrada localmente.</span>
                </article>`
            )
            .join('')
        : '<div class="empty-state"><h3>Aún no hay pedidos de prueba.</h3><p>Prepara tu primer detalle desde el carrito.</p></div>'}${receipts.length
        ? /* HTML */ `<h3 class="checkout-title">Tus constancias locales</h3>
            ${receipts
              .map(
                (r) =>
                  /* HTML */ `<p class="small-note">
                    ${esc(r.code)} · ${esc(r.type)} · ${esc(r.date)}
                  </p>`
              )
              .join('')}`
        : ''}
      <p class="small-note">
        El botón siguiente borra carrito, historial y constancias de este sitio. No afecta otros
        datos del navegador.
      </p>
      <button
        class="button secondary"
        id="clear-data"
        ${!list.length && !receipts.length && !M.getCart().length ? 'disabled' : ''}
      >
        Borrar mis datos de prueba
      </button>
      <p id="clear-result" role="status"></p>`;
  }
  function detail(id) {
    const p = M.product(id);
    if (!p) return;
    document.getElementById('detail-content').innerHTML = /* HTML */ `<div class="detail-grid">
        <img src="assets/images/${p.image}" alt="${esc(p.composition)}" />
        <div>
          <p class="eyebrow">${esc(p.category)}</p>
          <h3 id="detail-title">${esc(p.name)}</h3>
          <p>${esc(p.meaning)}</p>
          <p>${esc(p.composition)}</p>
          <p class="price">${money(p.price)}</p>
          <button class="button" data-add="${p.id}">Añadir al ramo +</button>
        </div>
      </div>
      <p class="small-note" style="margin-top:20px">
        Imagen referencial. La composición puede variar según la temporada.
      </p>`;
  }
  let toastTimer;
  function toast(message) {
    const target = document.getElementById('toast');
    target.textContent = message;
    target.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => target.classList.remove('visible'), 3500);
  }
  return {
    shell,
    catalog,
    productCard,
    badge,
    cart,
    checkout,
    orderReceipt,
    orders,
    detail,
    toast,
    esc,
    money
  };
})();
