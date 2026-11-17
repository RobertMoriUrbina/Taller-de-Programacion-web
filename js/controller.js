/* CONTROLADOR: eventos, navegación, filtros y coordinación del modelo y la vista. */
'use strict';
(() => {
 const M=window.CampoModel,V=window.CampoView;
 V.shell();V.badge();
 const featured=document.getElementById('featured-products');
 if(featured)featured.innerHTML=M.products.slice(0,3).map(V.productCard).join('');
 const $=id=>document.getElementById(id);
 let filter='Todos',search='',sort='featured',quizStep=0,answers=[],clearPending=false;
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function filterCatalog(){let list=M.products.filter(p=>(filter==='Todos'||p.category===filter)&&normalize(p.name+' '+p.description+' '+p.composition).includes(normalize(search)));if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);V.catalog(list);}
 function closeMenu(){const nav=$('main-nav');nav.classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false');$('menu-toggle').setAttribute('aria-label','Abrir menú');}
 function showDialog(name){closeMenu();document.querySelectorAll('dialog[open]').forEach(d=>d.close());const d=$(name+'-dialog');if(!d)return;if(name==='cart')V.cart();if(name==='orders'){clearPending=false;V.orders();}if(name==='quiz'){quizStep=0;answers=[];renderQuiz();}d.showModal();}
 const questions=[
  {title:'¿Qué te gustaría expresar?',subtitle:'Cada intención tiene su propio lenguaje.',options:[['Romance','Te quiero, así de simple.'],['Gratitud','Gracias por estar.'],['Celebración','Hoy hay algo que celebrar.'],['Para mí','Me regalo una pausa.']]},
  {title:'¿Qué paleta te hace sonreír?',subtitle:'Déjate llevar por ese primer sentimiento.',options:[['suave','Rosa suave y crema'],['color','Alegre y llena de color'],['blanco','Blanco y verde natural'],['rojo','Rojo, un clásico eterno']]},
  {title:'¿Cuánto quieres destinar?',subtitle:'Todos los gestos pueden ser especiales.',options:[['90','Hasta S/ 90'],['120','Hasta S/ 120'],['160','Hasta S/ 160']]}
 ];
 function recommendation(){const budget=Number(answers[2]);return M.products.filter(p=>p.price<=budget).map(p=>({product:p,score:(p.category===answers[0]?10:0)+({suave:['aurora','susurro'],color:['jardin','sol'],blanco:['brisa'],rojo:['amore']}[answers[1]].includes(p.id)?7:0)})).sort((a,b)=>b.score-a.score||a.product.price-b.product.price)[0].product;}
 function renderQuiz(){const target=$('quiz-content');if(quizStep<3){const q=questions[quizStep];target.innerHTML=`<div class="quiz-progress" aria-label="Pregunta ${quizStep+1} de 3">${[0,1,2].map(i=>`<span class="${i<=quizStep?'done':''}"></span>`).join('')}</div><p class="eyebrow">${String(quizStep+1).padStart(2,'0')} / 03 · TU RAMO, TU HISTORIA</p><h3 tabindex="-1" id="quiz-question">${q.title}</h3><p class="small-note">${q.subtitle}</p><div class="quiz-options">${q.options.map(([value,label])=>`<button class="quiz-option" data-answer="${value}">${label} <span aria-hidden="true">↗</span></button>`).join('')}</div>${quizStep?'<button class="quiz-back" id="quiz-back">← Volver a la pregunta anterior</button>':''}`;}else{const p=recommendation();target.innerHTML=`<p class="eyebrow">CREEMOS QUE TE VA A ENCANTAR</p><div class="quiz-result"><img src="assets/images/${p.image}" alt="${V.esc(p.composition)}"><div><p class="script">hecho para tu intención</p><h3 tabindex="-1" id="quiz-question">${V.esc(p.name)}</h3><p>${V.esc(p.meaning)}</p><p>Elegido por tu intención, paleta y presupuesto de hasta S/ ${V.esc(answers[2])}.</p><p class="price">${V.money(p.price)}</p><button class="button" data-add="${p.id}">Añadir al ramo +</button></div></div><button class="quiz-back" id="quiz-restart">Volver a descubrir mi ramo</button>`;}}
 if($('catalog'))filterCatalog();
 document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');if(!target)return;
  if(target.dataset.open){showDialog(target.dataset.open);return;}
  if(target.hasAttribute('data-close')){target.closest('dialog').close();return;}
  if(target.id==='menu-toggle'){const open=$('main-nav').classList.toggle('open');target.setAttribute('aria-expanded',String(open));target.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');return;}
  if(target.closest('#main-nav'))closeMenu();
  if(target.dataset.add){const ok=M.add(target.dataset.add);V.badge();V.toast(ok?`${M.product(target.dataset.add).name} se sumó a tu jardín.`:'Puedes elegir hasta 20 unidades de este ramo.');if($('cart-dialog').open)V.cart();return;}
  if(target.dataset.detail){event.preventDefault();V.detail(target.dataset.detail);showDialog('detail');return;}
  if(target.dataset.qty){const id=target.dataset.qty,delta=target.dataset.delta;M.quantity(id,Number(delta));V.cart();const button=document.querySelector(`[data-qty="${id}"][data-delta="${delta}"]:not(:disabled)`);if(button)button.focus();else $('cart-dialog').querySelector('button').focus();return;}
  if(target.dataset.remove){M.remove(target.dataset.remove);V.cart();$('cart-dialog').querySelector('button').focus();V.toast('Ramo retirado de tu selección.');return;}
  if(target.id==='checkout-button'){V.checkout();$('order-name').focus();return;}
  if(target.dataset.filter){filter=target.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===filter);b.setAttribute('aria-pressed',String(b.dataset.filter===filter));});filterCatalog();return;}
  if(target.id==='reset-filters'){filter='Todos';search='';sort='featured';$('search').value='';$('sort').value='featured';document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter==='Todos');b.setAttribute('aria-pressed',String(b.dataset.filter==='Todos'));});filterCatalog();$('search').focus();return;}
  if(target.dataset.answer){answers[quizStep]=target.dataset.answer;quizStep++;renderQuiz();$('quiz-question').focus();return;}
  if(target.id==='quiz-back'){quizStep--;renderQuiz();$('quiz-question').focus();return;}
  if(target.id==='quiz-restart'){quizStep=0;answers=[];renderQuiz();$('quiz-question').focus();return;}
  if(target.id==='clear-data'){if(!clearPending){clearPending=true;target.textContent='Sí, borrar todos mis datos de prueba';$('clear-result').textContent='Pulsa otra vez para confirmar. También se vaciará el carrito.';}else{M.clear();clearPending=false;V.orders();V.badge();$('clear-result').textContent='Los datos de prueba se borraron de este navegador.';}return;}
 });
 document.addEventListener('input',event=>{
  const t=event.target;if(t.id==='search'){search=t.value.trim();filterCatalog();}
  if(t.id==='order-message')$('dedication-preview').textContent=t.value||'Un pequeño detalle, con mucho cariño.';
  if(t.validity&&t.validity.customError)t.setCustomValidity('');
 });
 document.addEventListener('change',event=>{
  const t=event.target;if(t.id==='sort'){sort=t.value;filterCatalog();}
  if(t.id==='order-method'){const delivery=t.value==='delivery';$('delivery-fields').hidden=!delivery;['order-district','order-address'].forEach(id=>$(id).disabled=!delivery);$('shipping-price').textContent=delivery?'S/ 15.00':'Sin costo';$('checkout-total').textContent=V.money(M.subtotal()+(delivery?15:0));}
  if(t.id==='claim-document-type'){const dni=t.value==='DNI',field=$('claim-document');field.pattern=dni?'[0-9]{8}':'[A-Za-z0-9]{9,12}';field.maxLength=dni?8:12;field.inputMode=dni?'numeric':'text';field.title=dni?'Ingresa 8 dígitos para DNI':'Ingresa entre 9 y 12 caracteres para CE';field.setCustomValidity('');}
 });
 function validForm(form){for(const t of form.querySelectorAll('input[type=text],input:not([type]),textarea')){t.value=t.value.trim();if(t.required&&!t.disabled&&t.minLength>0&&t.value.length<t.minLength)t.setCustomValidity(`Escribe al menos ${t.minLength} caracteres, sin contar espacios al inicio o final.`);}return form.reportValidity();}
 document.addEventListener('submit',event=>{
  const form=event.target;if(!['checkout-form','suggestion-form','claim-form'].includes(form.id))return;event.preventDefault();if(!validForm(form))return;
  if(form.id==='checkout-form'){const date=$('order-date');if(date.value<date.min){date.setCustomValidity('Elige una fecha desde mañana.');date.reportValidity();return;}const order=M.placeOrder($('order-method').value,date.value);if(order){form.reset();V.orderReceipt(order);}else V.toast('Añade primero un ramo a tu carrito.');return;}
  const isSuggestion=form.id==='suggestion-form',entry=M.receipt(isSuggestion?'sugerencia':'reclamación');form.reset();if(!isSuggestion){$('claim-document').pattern='[0-9]{8}';$('claim-document').maxLength=8;$('claim-document').inputMode='numeric';$('claim-document').title='Ingresa 8 dígitos para DNI';}const result=$(isSuggestion?'suggestion-result':'claim-result');result.textContent=`Constancia de prueba ${entry.code}. ${M.storageAvailable()?'Código guardado en este navegador.':'Almacenamiento no disponible: el código solo estará durante esta visita.'} No se enviaron ni se guardaron tus datos personales. ${isSuggestion?'Gracias por tu idea.':'No constituye una reclamación oficial.'}`;result.scrollIntoView({block:'nearest',behavior:'smooth'});
 });
 document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',event=>{if(event.target!==d)return;const r=d.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)d.close();}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
 window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu();});
 if(!M.storageAvailable())V.toast('Almacenamiento local no disponible. Puedes probar la web durante esta visita.');
 const hash=location.hash.slice(1);if($('catalog')&&M.product(hash)){V.detail(hash);showDialog('detail');}
})();
