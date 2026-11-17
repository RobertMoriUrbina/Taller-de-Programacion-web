/* MODELO: catálogo, reglas del carrito y persistencia local sin datos personales. */
'use strict';
window.CampoModel = (() => {
  const products = Object.freeze([
    {id:'aurora',name:'Aurora',price:89,category:'Romance',tag:'El favorito',description:'Rosas suaves, frescura y un nuevo comienzo.',composition:'Rosas en tonos rosa y crema, acompañadas de flores blancas y follaje.',meaning:'Para decir «estoy pensando en ti».',image:'aurora.jpg'},
    {id:'susurro',name:'Susurro',price:119,category:'Gratitud',tag:'Un gesto bonito',description:'Un abrazo de pétalos en tonos empolvados.',composition:'Rosas rosadas, flores de acento en tonos suaves y verdes naturales.',meaning:'Para agradecer lo que las palabras no alcanzan.',image:'susurro.jpg'},
    {id:'jardin',name:'Jardín de domingo',price:139,category:'Celebración',tag:'Espíritu silvestre',description:'Flores de colores que celebran la vida.',composition:'Composición mixta de flores de temporada en tonos claros con acentos de color.',meaning:'Para celebrar a alguien que llena todo de vida.',image:'jardin.jpg'},
    {id:'sol',name:'Abrazo de sol',price:79,category:'Gratitud',tag:'Pura alegría',description:'Flores amarillas para iluminar un día cualquiera.',composition:'Flores amarillas tipo gerbera y pequeños acentos de temporada con follaje.',meaning:'Para enviar un poquito de alegría.',image:'sol.jpg'},
    {id:'amore',name:'Amore',price:159,category:'Romance',tag:'Un clásico eterno',description:'Rosas rojas. Hay sentimientos que no cambian.',composition:'Rosas rojas en una composición clásica con follaje verde.',meaning:'Para decir «te quiero» sin rodeos.',image:'amore.jpg'},
    {id:'brisa',name:'Brisa',price:99,category:'Para mí',tag:'La calma florece',description:'Blancos y verdes para tu pequeño refugio.',composition:'Flores blancas delicadas y una selección de verdes de textura ligera.',meaning:'Para regalarte una pausa y un poco de calma.',image:'brisa.jpg'}
  ].map(Object.freeze));
  const keys={cart:'cf-cart-v1',orders:'cf-orders-v1',receipts:'cf-receipts-v1'};
  let storageOK=true;
  const read=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v??fallback;}catch{storageOK=false;return fallback;}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{storageOK=false;return false;}};
  const product=id=>products.find(p=>p.id===id);
  const rawCart=read(keys.cart,[]);
  let cart=[];
  if(Array.isArray(rawCart)) for(const item of rawCart){if(item&&product(item.id)&&Number.isInteger(item.qty)&&item.qty>0&&!cart.some(p=>p.id===item.id))cart.push({id:item.id,qty:Math.min(20,item.qty)});}
  const rawOrders=read(keys.orders,[]);
  let orders=Array.isArray(rawOrders)?rawOrders.filter(o=>o&&typeof o.code==='string'&&/^CF-[A-Z0-9-]+$/.test(o.code)&&Array.isArray(o.items)&&o.items.length&&o.items.every(x=>x&&product(x.id)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=20)&&['delivery','pickup'].includes(o.method)&&typeof o.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(o.date)).slice(-30):[];
  const rawReceipts=read(keys.receipts,[]);
  let receipts=Array.isArray(rawReceipts)?rawReceipts.filter(r=>r&&['sugerencia','reclamación'].includes(r.type)&&typeof r.code==='string'&&/^(SG|RC)-[A-Z0-9-]+$/.test(r.code)&&typeof r.date==='string').slice(-30):[];
  const getCart=()=>cart.map(x=>({...x,...product(x.id)}));
  const subtotal=()=>getCart().reduce((sum,x)=>sum+x.price*x.qty,0);
  const saveCart=()=>write(keys.cart,cart);
  const newCode=prefix=>`${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  function add(id){if(!product(id))return false;const found=cart.find(x=>x.id===id);if(found&&found.qty>=20)return false;if(found)found.qty++;else cart.push({id,qty:1});saveCart();return true;}
  function quantity(id,delta){const found=cart.find(x=>x.id===id);if(!found)return;if(found.qty+delta<=0)cart=cart.filter(x=>x.id!==id);else found.qty=Math.min(20,found.qty+delta);saveCart();}
  function remove(id){cart=cart.filter(x=>x.id!==id);saveCart();}
  function placeOrder(method,date){if(!cart.length||!['delivery','pickup'].includes(method)||!/^\d{4}-\d{2}-\d{2}$/.test(date))return null;const order={code:newCode('CF'),date,method,items:cart.map(x=>({...x}))};orders.push(order);orders=orders.slice(-30);write(keys.orders,orders);cart=[];saveCart();return {...order,total:order.items.reduce((s,x)=>s+product(x.id).price*x.qty,0)+(method==='delivery'?15:0)};}
  function receipt(type){if(!['sugerencia','reclamación'].includes(type))return null;const entry={code:newCode(type==='sugerencia'?'SG':'RC'),type,date:new Date().toISOString().slice(0,10)};receipts.push(entry);receipts=receipts.slice(-30);write(keys.receipts,receipts);return entry;}
  function clear(){cart=[];orders=[];receipts=[];Object.values(keys).forEach(k=>{try{localStorage.removeItem(k);}catch{storageOK=false;}});}
  return {products,product,getCart,subtotal,add,quantity,remove,placeOrder,receipt,clear,getOrders:()=>orders.map(o=>({...o,items:o.items.map(i=>({...i}))})),getReceipts:()=>receipts.map(r=>({...r})),storageAvailable:()=>storageOK};
})();
