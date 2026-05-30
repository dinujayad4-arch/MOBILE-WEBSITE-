/* ===========================
   NextGen Mobiles — Admin Panel JS v3
   =========================== */

const ADMIN_PASS_KEY = 'ng_admin_pass';
const PRODUCTS_KEY   = 'ng_products';
const SETTINGS_KEY   = 'ng_settings';
const CATS_KEY       = 'ng_categories';
const USERS_KEY      = 'ng_users';
const ORDERS_KEY     = 'ng_orders';
const SESSION_KEY    = 'ng_admin_session';

/* ===== DEFAULTS ===== */
const DEFAULT_PASS = 'admin123';

const DEFAULT_PRODUCTS = [
  { id:1, name:'iPhone 16 Pro Max', brand:'Apple', category:'flagship', price:189900, oldPrice:214900, discount:12, rating:4.9, reviews:2847, emoji:'📱', badge:'new', stock:'in-stock', colors:['#1c1c1e','#f5f5f0','#b0b8c1','#4d3b2f'], storage:['256GB','512GB','1TB'], emi:'15,825/mo', desc:'The most powerful iPhone ever with A18 Pro chip.', active:true, flashSale:true },
  { id:2, name:'Samsung Galaxy S25 Ultra', brand:'Samsung', category:'flagship', price:164900, oldPrice:184900, discount:11, rating:4.8, reviews:3214, emoji:'📲', badge:'hot', stock:'in-stock', colors:['#1a1a1a','#e6ddd4','#b8c4d9'], storage:['256GB','512GB'], emi:'13,742/mo', desc:'Ultimate Android flagship with AI-powered features.', active:true, flashSale:true },
  { id:3, name:'Google Pixel 9 Pro XL', brand:'Google', category:'mid-range', price:139900, oldPrice:159900, discount:13, rating:4.7, reviews:1568, emoji:'🤳', badge:'sale', stock:'low-stock', colors:['#e8eaed','#3c4043','#c2d2e9'], storage:['128GB','256GB'], emi:'11,658/mo', desc:'Pure Android with best-in-class computational photography.', active:true, flashSale:false },
  { id:4, name:'OnePlus 13 Pro', brand:'OnePlus', category:'mid-range', price:99900, oldPrice:114900, discount:13, rating:4.6, reviews:987, emoji:'📱', badge:'new', stock:'in-stock', colors:['#000000','#1a4dff','#2d5a27'], storage:['256GB','512GB'], emi:'8,325/mo', desc:'Blazing fast performance with Hasselblad cameras.', active:true, flashSale:false },
  { id:5, name:'Xiaomi 15 Ultra', brand:'Xiaomi', category:'mid-range', price:89900, oldPrice:104900, discount:14, rating:4.5, reviews:2103, emoji:'📲', badge:'hot', stock:'in-stock', colors:['#ffffff','#000000','#1c3a6b'], storage:['256GB','512GB','1TB'], emi:'7,492/mo', desc:'Flagship specs at mid-range pricing.', active:true, flashSale:true },
  { id:6, name:'Motorola Edge 50 Pro', brand:'Motorola', category:'budget', price:54900, oldPrice:64900, discount:15, rating:4.3, reviews:756, emoji:'📱', badge:'sale', stock:'low-stock', colors:['#3c3c3c','#6b1ab0','#1a4a8c'], storage:['128GB','256GB'], emi:'4,575/mo', desc:'Slim design with 144Hz curved display.', active:true, flashSale:false },
  { id:7, name:'Realme GT 6T', brand:'Realme', category:'budget', price:39900, oldPrice:49900, discount:20, rating:4.2, reviews:1432, emoji:'🤳', badge:'sale', stock:'in-stock', colors:['#c8a028','#1a1a1a'], storage:['128GB','256GB'], emi:'3,325/mo', desc:'Best budget phone with 120W fast charging.', active:true, flashSale:true },
  { id:8, name:'Nothing Phone (3)', brand:'Nothing', category:'mid-range', price:69900, oldPrice:79900, discount:13, rating:4.4, reviews:892, emoji:'📲', badge:'new', stock:'in-stock', colors:['#ffffff','#1a1a1a'], storage:['128GB','256GB','512GB'], emi:'5,825/mo', desc:'Iconic Glyph interface with clean Android.', active:true, flashSale:false },
];

const DEFAULT_CATS = [
  { id:1, name:'Flagship', icon:'👑', desc:'Premium top-tier smartphones' },
  { id:2, name:'Mid-Range', icon:'⚡', desc:'Best value for money' },
  { id:3, name:'Budget', icon:'💰', desc:'Affordable quality phones' },
  { id:4, name:'Gaming', icon:'🎮', desc:'High-performance gaming phones' },
];

const DEFAULT_SETTINGS = {
  siteName:'NextGen Mobiles', tagline:"Sri Lanka's #1 Premium Smartphone Store",
  phone:'+94 11 234 5678', email:'hello@nextgenmobiles.lk', address:'Colombo 03, Sri Lanka',
  flashSaleActive:true, chatbotActive:true, notificationsActive:true,
  freeShippingMin:10000, shippingFee:350, currency:'Rs.',
};

/* ===== HELPERS ===== */
function getData(key,def){ try{ return JSON.parse(localStorage.getItem(key))??def; }catch{ return def; } }
function saveData(key,val){ localStorage.setItem(key,JSON.stringify(val)); }
function getProducts(){ return getData(PRODUCTS_KEY,DEFAULT_PRODUCTS); }
function saveProducts(p){ saveData(PRODUCTS_KEY,p); }
function getSettings(){ return getData(SETTINGS_KEY,DEFAULT_SETTINGS); }
function saveSettings(s){ saveData(SETTINGS_KEY,s); }
function getCats(){ return getData(CATS_KEY,DEFAULT_CATS); }
function saveCats(c){ saveData(CATS_KEY,c); }
function getUsers(){ return getData(USERS_KEY,[]); }
function getOrders(){ return getData(ORDERS_KEY,[]); }
function saveOrders(o){ saveData(ORDERS_KEY,o); }
function getAdminPass(){ return localStorage.getItem(ADMIN_PASS_KEY)||DEFAULT_PASS; }
function setAdminPass(p){ localStorage.setItem(ADMIN_PASS_KEY,p); }

/* ===== AUTH ===== */
function checkSession(){ return sessionStorage.getItem(SESSION_KEY)==='true'; }
function login(pass){ if(pass===getAdminPass()){ sessionStorage.setItem(SESSION_KEY,'true'); return true; } return false; }
function logout(){ sessionStorage.removeItem(SESSION_KEY); location.reload(); }

/* ===== LOGIN ===== */
const loginScreen = document.getElementById('login-screen');
const adminApp    = document.getElementById('admin-app');
const loginForm   = document.getElementById('login-form');
const loginError  = document.getElementById('login-error');

if(checkSession()){ loginScreen.style.display='none'; adminApp.classList.add('show'); initAdmin(); }

loginForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const pass = document.getElementById('login-pass').value;
  if(login(pass)){ loginScreen.style.display='none'; adminApp.classList.add('show'); initAdmin(); }
  else { loginError.style.display='block'; loginError.textContent='❌ Wrong password!'; setTimeout(()=>loginError.style.display='none',3000); }
});

document.getElementById('pw-eye-btn').addEventListener('click',()=>{
  const inp=document.getElementById('login-pass');
  const icon=document.querySelector('#pw-eye-btn i');
  inp.type = inp.type==='password' ? 'text' : 'password';
  icon.className = inp.type==='password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

document.getElementById('logout-btn').addEventListener('click',logout);

/* ===== NAVIGATION ===== */
let currentPage='dashboard';
const pageSubtitles = {
  dashboard:'Overview & analytics', products:'Manage your product catalog',
  categories:'Organize product categories', flashsale:'Configure flash sale products',
  settings:'Site configuration & preferences', orders:'Customer order management',
  users:'Registered user accounts',
};

function navigate(page){
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  document.getElementById(`page-${page}`)?.classList.add('active');
  currentPage=page;
  const titles={dashboard:'Dashboard',products:'Products',categories:'Categories',flashsale:'Flash Sale',settings:'Settings',orders:'Orders',users:'Users'};
  document.getElementById('page-title').textContent=titles[page]||page;
  document.getElementById('page-subtitle').textContent=pageSubtitles[page]||'';
  const addBtn=document.getElementById('top-add-btn');
  if(page==='products'){ addBtn.style.display='flex'; addBtn.textContent='+ Add Product'; addBtn.onclick=()=>openProductModal(); }
  else if(page==='categories'){ addBtn.style.display='flex'; addBtn.textContent='+ Add Category'; addBtn.onclick=()=>openCatModal(); }
  else addBtn.style.display='none';
  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('.nav-item[data-page]').forEach(el=>{
  el.addEventListener('click',()=>navigate(el.dataset.page));
});

/* ===== INIT ===== */
function initAdmin(){
  renderDashboard();
  renderProducts();
  renderCategories();
  renderFlashSale();
  renderSettings();
  renderOrders();
  renderUsers();
  navigate('dashboard');
}

/* ===== TOAST ===== */
function toast(msg,type='success'){
  const container=document.getElementById('admin-toasts');
  const el=document.createElement('div');
  const icons={success:'✓',error:'✕',info:'ℹ'};
  el.className=`a-toast a-toast-${type}`;
  el.innerHTML=`<span>${icons[type]}</span> ${msg}`;
  container.appendChild(el);
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),400); },3000);
}

/* ===== DASHBOARD ===== */
function renderDashboard(){
  const products=getProducts();
  const users=getUsers();
  const orders=getOrders();

  document.getElementById('stat-products').textContent=products.length;
  document.getElementById('stat-users').textContent=users.length;
  document.getElementById('stat-orders').textContent=orders.length;

  const revenue=orders.reduce((sum,o)=>sum+(o.total||0),0);
  document.getElementById('stat-revenue').textContent=
    revenue>0 ? 'Rs. '+(revenue/1000).toFixed(0)+'K' : 'Rs. 0';

  // Top products by reviews
  const top=[...products].sort((a,b)=>b.reviews-a.reviews).slice(0,5);
  const topEl=document.getElementById('top-products-list');
  const rankClass=['gold','silver','bronze','',''];
  topEl.innerHTML=top.map((p,i)=>`
    <div class="top-product-item">
      <div class="top-rank ${rankClass[i]}">${i+1}</div>
      <span style="font-size:1.2rem">${p.emoji}</span>
      <span class="top-product-name">${p.name}</span>
      <span class="top-product-sales">Rs. ${(p.price/1000).toFixed(0)}K</span>
    </div>`).join('');

  // Mini bars
  const bars=document.getElementById('sales-bars');
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const vals=[45,62,38,78,55,90,72];
  const max=Math.max(...vals);
  bars.innerHTML=vals.map(v=>`<div class="mini-bar" style="height:${(v/max*100)}%"></div>`).join('');
  document.getElementById('bar-labels').innerHTML=months.map(m=>`<div class="bar-label">${m}</div>`).join('');

  // Recent orders in dashboard
  const recentOrders=orders.slice(0,3);
  const statusStyle={processing:'pill-hot',shipped:'pill-new',delivered:'pill-active',cancelled:'pill-inactive'};
  const recentTbody=document.getElementById('recent-orders-tbody');
  if(recentTbody){
    if(recentOrders.length===0){
      recentTbody.innerHTML=`<tr><td colspan="5" style="text-align:center;color:var(--text-3);padding:20px">No orders yet</td></tr>`;
    } else {
      recentTbody.innerHTML=recentOrders.map(o=>`
        <tr>
          <td style="color:var(--neon);font-weight:700">#${o.id}</td>
          <td>
            <div style="font-weight:700">${o.userName}</div>
            <div style="font-size:0.72rem;color:var(--text-3)">${o.userEmail}</div>
          </td>
          <td style="font-size:0.8rem">${o.items?.map(i=>i.name.split(' ').slice(0,2).join(' ')).join(', ')||'—'}</td>
          <td style="font-weight:700">Rs. ${(o.total||0).toLocaleString()}</td>
          <td><span class="pill ${statusStyle[o.status]||'pill-inactive'}">${(o.status||'').charAt(0).toUpperCase()+(o.status||'').slice(1)}</span></td>
        </tr>`).join('');
    }
  }
}

/* ===== PRODUCTS ===== */
let editingProductId=null;
let selectedEmoji='📱';
let productSearch='';

function renderProducts(){
  const products=getProducts();
  const filtered=products.filter(p=>!productSearch||p.name.toLowerCase().includes(productSearch)||p.brand.toLowerCase().includes(productSearch));
  const tbody=document.getElementById('products-tbody');
  if(filtered.length===0){ tbody.innerHTML=`<tr><td colspan="7"><div class="empty-state"><span class="ei">📦</span><p>No products found</p></div></td></tr>`; return; }
  tbody.innerHTML=filtered.map(p=>`
    <tr>
      <td>
        <div class="td-product">
          <div class="td-emoji">${p.emoji}</div>
          <div><div class="td-name">${p.name}</div><div class="td-brand">${p.brand} · ${p.category}</div></div>
        </div>
      </td>
      <td>
        <div style="font-weight:700">Rs. ${p.price.toLocaleString()}</div>
        <div style="font-size:0.72rem;color:var(--text-3);text-decoration:line-through">Rs. ${p.oldPrice.toLocaleString()}</div>
      </td>
      <td><span class="pill pill-${p.badge}">${p.badge.toUpperCase()}</span></td>
      <td><span class="pill ${p.stock==='in-stock'?'pill-active':p.stock==='low-stock'?'pill-hot':'pill-inactive'}">${p.stock==='in-stock'?'● In Stock':p.stock==='low-stock'?'⚠ Low':'✕ Out'}</span></td>
      <td><span class="pill ${p.flashSale?'pill-active':'pill-inactive'}">${p.flashSale?'⚡ Yes':'No'}</span></td>
      <td><span class="pill ${p.active?'pill-active':'pill-inactive'}">${p.active?'● Live':'○ Hidden'}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm btn-icon" onclick="openProductModal(${p.id})" title="Edit"><i class="fas fa-pen"></i></button>
          <button class="btn btn-success btn-sm btn-icon" onclick="toggleProductActive(${p.id})" title="${p.active?'Hide':'Show'}"><i class="fas fa-${p.active?'eye-slash':'eye'}"></i></button>
          <button class="btn btn-danger btn-sm btn-icon" onclick="deleteProduct(${p.id})" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

document.getElementById('product-search').addEventListener('input',(e)=>{ productSearch=e.target.value.toLowerCase(); renderProducts(); });

function toggleProductActive(id){
  const products=getProducts(); const p=products.find(x=>x.id===id); if(!p) return;
  p.active=!p.active; saveProducts(products); renderProducts(); renderDashboard();
  toast(`${p.name} ${p.active?'is now live':'hidden from store'}`,'info');
}

function deleteProduct(id){
  if(!confirm('Delete this product? This cannot be undone.')) return;
  saveProducts(getProducts().filter(p=>p.id!==id));
  renderProducts(); renderDashboard(); renderFlashSale(); toast('Product deleted','error');
}

/* Product Modal */
const productModal=document.getElementById('product-modal');
const productForm=document.getElementById('product-form');

function openProductModal(id=null){
  editingProductId=id;
  document.getElementById('product-modal-title').textContent=id?'Edit Product':'Add New Product';
  productForm.reset(); selectedEmoji='📱';
  document.querySelectorAll('.emoji-opt').forEach(e=>e.classList.remove('selected'));
  document.querySelector('.emoji-opt[data-emoji="📱"]')?.classList.add('selected');
  if(id){
    const p=getProducts().find(x=>x.id===id); if(!p) return;
    document.getElementById('pf-name').value=p.name;
    document.getElementById('pf-brand').value=p.brand;
    document.getElementById('pf-category').value=p.category;
    document.getElementById('pf-price').value=p.price;
    document.getElementById('pf-oldprice').value=p.oldPrice;
    document.getElementById('pf-discount').value=p.discount;
    document.getElementById('pf-badge').value=p.badge;
    document.getElementById('pf-stock').value=p.stock;
    document.getElementById('pf-emi').value=p.emi||'';
    document.getElementById('pf-desc').value=p.desc||'';
    document.getElementById('pf-flash').checked=p.flashSale;
    document.getElementById('pf-active').checked=p.active;
    document.getElementById('pf-storage').value=(p.storage||[]).join(', ');
    selectedEmoji=p.emoji;
    document.querySelectorAll('.emoji-opt').forEach(e=>e.classList.toggle('selected',e.dataset.emoji===p.emoji));
  }
  productModal.classList.add('open');
}

document.getElementById('product-modal-close').addEventListener('click',()=>productModal.classList.remove('open'));
productModal.addEventListener('click',(e)=>{ if(e.target===productModal) productModal.classList.remove('open'); });
document.querySelectorAll('.emoji-opt').forEach(el=>{
  el.addEventListener('click',()=>{
    document.querySelectorAll('.emoji-opt').forEach(e=>e.classList.remove('selected'));
    el.classList.add('selected'); selectedEmoji=el.dataset.emoji;
  });
});
document.getElementById('pf-price').addEventListener('input',calcDiscount);
document.getElementById('pf-oldprice').addEventListener('input',calcDiscount);
function calcDiscount(){
  const price=parseFloat(document.getElementById('pf-price').value);
  const old=parseFloat(document.getElementById('pf-oldprice').value);
  if(price&&old&&old>price) document.getElementById('pf-discount').value=Math.round((old-price)/old*100);
}

productForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const products=getProducts();
  const storageArr=document.getElementById('pf-storage').value.split(',').map(s=>s.trim()).filter(Boolean);
  const data={
    id:editingProductId||Date.now(),
    name:document.getElementById('pf-name').value.trim(),
    brand:document.getElementById('pf-brand').value.trim(),
    category:document.getElementById('pf-category').value,
    price:parseFloat(document.getElementById('pf-price').value),
    oldPrice:parseFloat(document.getElementById('pf-oldprice').value),
    discount:parseInt(document.getElementById('pf-discount').value)||0,
    badge:document.getElementById('pf-badge').value,
    stock:document.getElementById('pf-stock').value,
    emi:document.getElementById('pf-emi').value.trim(),
    desc:document.getElementById('pf-desc').value.trim(),
    flashSale:document.getElementById('pf-flash').checked,
    active:document.getElementById('pf-active').checked,
    storage:storageArr.length?storageArr:['128GB'],
    colors:['#1a1a1a','#ffffff','#0066cc'],
    emoji:selectedEmoji,
    rating:editingProductId?(products.find(p=>p.id===editingProductId)?.rating||4.5):4.5,
    reviews:editingProductId?(products.find(p=>p.id===editingProductId)?.reviews||0):0,
  };
  if(editingProductId){ const idx=products.findIndex(p=>p.id===editingProductId); if(idx!==-1) products[idx]=data; toast(`"${data.name}" updated!`,'success'); }
  else { products.push(data); toast(`"${data.name}" added!`,'success'); }
  saveProducts(products); productModal.classList.remove('open');
  renderProducts(); renderDashboard(); renderFlashSale();
});

/* ===== CATEGORIES ===== */
let editingCatId=null;
const catModal=document.getElementById('cat-modal');
const catForm=document.getElementById('cat-form');

function renderCategories(){
  const cats=getCats(); const products=getProducts();
  document.getElementById('cats-grid').innerHTML=cats.map(c=>{
    const count=products.filter(p=>p.category===c.name.toLowerCase().replace(/[- ]/g,'')||p.category===c.name.toLowerCase()).length;
    return `
      <div class="cat-admin-card">
        <span class="cat-admin-icon">${c.icon}</span>
        <div class="cat-admin-name">${c.name}</div>
        <div class="cat-admin-count">${count} products · ${c.desc}</div>
        <div class="cat-actions">
          <button class="btn btn-secondary btn-sm" onclick="openCatModal(${c.id})"><i class="fas fa-pen"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteCat(${c.id})"><i class="fas fa-trash"></i></button>
        </div>
      </div>`;}).join('');
}

function openCatModal(id=null){
  editingCatId=id; catForm.reset();
  document.getElementById('cat-modal-title').textContent=id?'Edit Category':'Add Category';
  if(id){ const c=getCats().find(x=>x.id===id); if(!c) return; document.getElementById('cf-name').value=c.name; document.getElementById('cf-icon').value=c.icon; document.getElementById('cf-desc').value=c.desc; }
  catModal.classList.add('open');
}

document.getElementById('cat-modal-close').addEventListener('click',()=>catModal.classList.remove('open'));
catModal.addEventListener('click',(e)=>{ if(e.target===catModal) catModal.classList.remove('open'); });
catForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const cats=getCats();
  const data={id:editingCatId||Date.now(),name:document.getElementById('cf-name').value.trim(),icon:document.getElementById('cf-icon').value.trim(),desc:document.getElementById('cf-desc').value.trim()};
  if(editingCatId){ const idx=cats.findIndex(c=>c.id===editingCatId); if(idx!==-1) cats[idx]=data; toast(`Category "${data.name}" updated!`,'success'); }
  else { cats.push(data); toast(`Category "${data.name}" added!`,'success'); }
  saveCats(cats); catModal.classList.remove('open'); renderCategories(); renderDashboard();
});

function deleteCat(id){
  if(!confirm('Delete this category?')) return;
  saveCats(getCats().filter(c=>c.id!==id)); renderCategories(); renderDashboard(); toast('Category deleted','error');
}

/* ===== FLASH SALE ===== */
function renderFlashSale(){
  const products=getProducts(); const settings=getSettings();
  document.getElementById('flash-active-badge').textContent=settings.flashSaleActive?'⚡ FLASH SALE ON':'○ Flash Sale OFF';
  document.getElementById('flash-active-badge').className=`flash-status-badge ${settings.flashSaleActive?'flash-on':'flash-off'}`;
  document.getElementById('flash-toggle-btn').textContent=settings.flashSaleActive?'Turn OFF':'Turn ON';
  document.getElementById('flash-tbody').innerHTML=products.map(p=>`
    <tr>
      <td><div class="td-product"><div class="td-emoji">${p.emoji}</div><div><div class="td-name">${p.name}</div><div class="td-brand">${p.brand}</div></div></div></td>
      <td>Rs. ${p.price.toLocaleString()}</td>
      <td><span style="color:var(--green);font-weight:700">${p.discount}% OFF</span></td>
      <td>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.85rem">
          <input type="checkbox" ${p.flashSale?'checked':''} onchange="toggleFlash(${p.id},this.checked)" style="accent-color:var(--neon);width:16px;height:16px;cursor:pointer" />
          ${p.flashSale?'<span style="color:var(--green)">In Flash Sale</span>':'<span style="color:var(--text-3)">Not included</span>'}
        </label>
      </td>
    </tr>`).join('');
}

function toggleFlash(id,val){
  const products=getProducts(); const p=products.find(x=>x.id===id); if(!p) return;
  p.flashSale=val; saveProducts(products);
  toast(`${p.name} ${val?'added to':'removed from'} Flash Sale`,val?'success':'info');
  renderFlashSale(); renderDashboard();
}

document.getElementById('flash-toggle-btn').addEventListener('click',()=>{
  const s=getSettings(); s.flashSaleActive=!s.flashSaleActive; saveSettings(s);
  renderFlashSale(); toast(`Flash Sale ${s.flashSaleActive?'activated':'deactivated'}`,s.flashSaleActive?'success':'info');
});

/* ===== ORDERS (Real from localStorage) ===== */
let orderSearch='';
let orderStatusFilter='all';

function renderOrders(){
  const allOrders=getOrders();
  let filtered=allOrders;
  if(orderStatusFilter!=='all') filtered=filtered.filter(o=>o.status===orderStatusFilter);
  if(orderSearch) filtered=filtered.filter(o=>
    o.id.toLowerCase().includes(orderSearch)||
    (o.userName||'').toLowerCase().includes(orderSearch)||
    (o.userEmail||'').toLowerCase().includes(orderSearch)
  );

  document.getElementById('orders-count').textContent=allOrders.length;

  const tbody=document.getElementById('orders-tbody');
  const statusStyle={processing:'pill-hot',shipped:'pill-new',delivered:'pill-active',cancelled:'pill-inactive'};

  if(filtered.length===0){
    tbody.innerHTML=`<tr><td colspan="7"><div class="empty-state"><span class="ei">📦</span><p>No orders found${orderSearch?' matching your search':''}</p><small style="color:var(--text-3)">Orders placed from the store will appear here</small></div></td></tr>`;
    return;
  }

  tbody.innerHTML=filtered.map(o=>`
    <tr>
      <td style="font-weight:700;color:var(--neon)">#${o.id}</td>
      <td>
        <div style="font-weight:700">${o.userName||'Guest'}</div>
        <div style="font-size:0.72rem;color:var(--text-3)">${o.userEmail||'—'}</div>
        <div style="font-size:0.72rem;color:var(--text-3)">${o.userPhone||'—'}</div>
      </td>
      <td style="font-size:0.78rem;max-width:180px">
        ${(o.items||[]).map(i=>`<div style="display:flex;align-items:center;gap:4px;margin-bottom:2px"><span>${i.emoji}</span><span>${i.name.split(' ').slice(0,2).join(' ')} x${i.qty}</span></div>`).join('')}
      </td>
      <td style="font-weight:700">Rs. ${(o.total||0).toLocaleString()}</td>
      <td>
        <select class="status-select" onchange="updateOrderStatus('${o.id}',this.value)"
          style="background:var(--bg-secondary);color:var(--text-1);border:1px solid var(--border);border-radius:8px;padding:4px 8px;font-size:0.75rem;cursor:pointer">
          <option value="processing" ${o.status==='processing'?'selected':''}>Processing</option>
          <option value="shipped" ${o.status==='shipped'?'selected':''}>Shipped</option>
          <option value="delivered" ${o.status==='delivered'?'selected':''}>Delivered</option>
          <option value="cancelled" ${o.status==='cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
      <td>
        <div style="font-size:0.78rem;color:var(--text-3)">${o.date||'—'}</div>
        <div style="font-size:0.7rem;color:var(--text-3)">${o.time||''}</div>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm btn-icon" onclick="viewOrderDetails('${o.id}')" title="View Details"><i class="fas fa-eye"></i></button>
          <button class="btn btn-danger btn-sm btn-icon" onclick="deleteOrder('${o.id}')" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function updateOrderStatus(orderId,newStatus){
  const orders=getOrders();
  const order=orders.find(o=>o.id===orderId);
  if(!order) return;
  order.status=newStatus;
  saveOrders(orders);
  renderDashboard();
  toast(`Order #${orderId} marked as ${newStatus}`,'success');
}

function deleteOrder(orderId){
  if(!confirm(`Delete order #${orderId}? This cannot be undone.`)) return;
  saveOrders(getOrders().filter(o=>o.id!==orderId));
  renderOrders(); renderDashboard();
  toast(`Order #${orderId} deleted`,'error');
}

function viewOrderDetails(orderId){
  const order=getOrders().find(o=>o.id===orderId);
  if(!order) return;
  alert(`Order Details:\n\nID: #${order.id}\nCustomer: ${order.userName}\nEmail: ${order.userEmail}\nPhone: ${order.userPhone}\nAddress: ${order.address}\nPayment: ${order.paymentMethod}\nDate: ${order.date} ${order.time}\nStatus: ${order.status}\n\nItems:\n${(order.items||[]).map(i=>`  ${i.emoji} ${i.name} x${i.qty} — Rs. ${(i.price*i.qty).toLocaleString()}`).join('\n')}\n\nTotal: Rs. ${order.total?.toLocaleString()}`);
}

document.getElementById('order-search')?.addEventListener('input',(e)=>{ orderSearch=e.target.value.toLowerCase(); renderOrders(); });
document.getElementById('order-status-filter')?.addEventListener('change',(e)=>{ orderStatusFilter=e.target.value; renderOrders(); });
document.getElementById('clear-orders-btn')?.addEventListener('click',()=>{
  if(!confirm('Delete ALL orders? This cannot be undone!')) return;
  saveOrders([]); renderOrders(); renderDashboard(); toast('All orders cleared','error');
});

/* ===== USERS ===== */
let userSearch='';

function renderUsers(){
  const users=getUsers();
  const orders=getOrders();
  let filtered=users;
  if(userSearch) filtered=filtered.filter(u=>
    (u.name||'').toLowerCase().includes(userSearch)||
    (u.email||'').toLowerCase().includes(userSearch)||
    (u.phone||'').toLowerCase().includes(userSearch)
  );

  document.getElementById('users-count').textContent=users.length;

  const tbody=document.getElementById('users-tbody');
  if(filtered.length===0){
    tbody.innerHTML=`<tr><td colspan="6"><div class="empty-state"><span class="ei">👥</span><p>No registered users yet</p><small style="color:var(--text-3)">Users who register from the store will appear here</small></div></td></tr>`;
    return;
  }

  tbody.innerHTML=filtered.map(u=>{
    const userOrders=orders.filter(o=>o.userEmail===u.email);
    const totalSpent=userOrders.reduce((sum,o)=>sum+(o.total||0),0);
    return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--neon),var(--purple));display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:800;color:#000;flex-shrink:0">
              ${(u.name||'?').charAt(0).toUpperCase()}
            </div>
            <div>
              <div style="font-weight:700">${u.name||'Unknown'}</div>
              <div style="font-size:0.72rem;color:var(--text-3)">ID: ${u.id?.toString().slice(-6)||'—'}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-size:0.85rem">${u.email||'—'}</div>
        </td>
        <td style="font-size:0.85rem">${u.phone||'—'}</td>
        <td>
          <div style="font-size:0.82rem">${u.createdAt||'—'}</div>
          <div style="font-size:0.72rem;color:var(--text-3)">${u.createdTime||''}</div>
        </td>
        <td>
          <span class="pill pill-new">${userOrders.length} order${userOrders.length!==1?'s':''}</span>
          ${totalSpent>0?`<div style="font-size:0.72rem;font-weight:700;color:var(--green);margin-top:4px">Rs. ${totalSpent.toLocaleString()}</div>`:''}
        </td>
        <td>
          <div class="table-actions">
            <button class="btn btn-secondary btn-sm btn-icon" onclick="viewUserOrders('${u.email}')" title="View Orders"><i class="fas fa-box"></i></button>
            <button class="btn btn-danger btn-sm btn-icon" onclick="deleteUser(${u.id})" title="Delete User"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>`;}).join('');
}

function viewUserOrders(email){
  const orders=getOrders().filter(o=>o.userEmail===email);
  if(orders.length===0){ toast('This user has no orders yet','info'); return; }
  alert(`Orders for ${email}:\n\n${orders.map(o=>`#${o.id} — Rs. ${o.total?.toLocaleString()} — ${o.status} — ${o.date}`).join('\n')}`);
}

function deleteUser(id){
  if(!confirm('Delete this user account? This cannot be undone.')) return;
  const users=getUsers().filter(u=>u.id!==id);
  saveData(USERS_KEY,users); renderUsers(); renderDashboard();
  toast('User account deleted','error');
}

document.getElementById('user-search')?.addEventListener('input',(e)=>{ userSearch=e.target.value.toLowerCase(); renderUsers(); });

/* ===== SETTINGS ===== */
function renderSettings(){
  const s=getSettings();
  document.getElementById('s-sitename').value=s.siteName;
  document.getElementById('s-tagline').value=s.tagline;
  document.getElementById('s-phone').value=s.phone;
  document.getElementById('s-email').value=s.email;
  document.getElementById('s-address').value=s.address;
  document.getElementById('s-shipping').value=s.shippingFee;
  document.getElementById('s-freeship').value=s.freeShippingMin;
  document.getElementById('s-currency').value=s.currency;
  renderToggle('toggle-flash',s.flashSaleActive);
  renderToggle('toggle-chat',s.chatbotActive);
  renderToggle('toggle-notif',s.notificationsActive);
}

function renderToggle(id,state){
  const el=document.getElementById(id);
  if(!el) return;
  el.classList.toggle('on',state);
}

document.querySelectorAll('.toggle').forEach(toggle=>{
  toggle.addEventListener('click',()=>{
    toggle.classList.toggle('on');
    const key=toggle.dataset.setting;
    if(!key) return;
    const s=getSettings();
    s[key]=toggle.classList.contains('on');
    saveSettings(s);
    toast('Setting updated','info');
  });
});

document.getElementById('save-general-btn').addEventListener('click',()=>{
  const s=getSettings();
  s.siteName=document.getElementById('s-sitename').value.trim();
  s.tagline=document.getElementById('s-tagline').value.trim();
  s.phone=document.getElementById('s-phone').value.trim();
  s.email=document.getElementById('s-email').value.trim();
  s.address=document.getElementById('s-address').value.trim();
  s.shippingFee=parseFloat(document.getElementById('s-shipping').value)||350;
  s.freeShippingMin=parseFloat(document.getElementById('s-freeship').value)||10000;
  s.currency=document.getElementById('s-currency').value;
  saveSettings(s); toast('General settings saved!','success');
});

document.getElementById('change-pass-btn').addEventListener('click',()=>{
  const current=document.getElementById('s-current-pass').value;
  const newPass=document.getElementById('s-new-pass').value;
  const confirm=document.getElementById('s-confirm-pass').value;
  if(current!==getAdminPass()){ toast('Current password is wrong!','error'); return; }
  if(newPass.length<6){ toast('Password must be at least 6 characters','error'); return; }
  if(newPass!==confirm){ toast('Passwords do not match!','error'); return; }
  setAdminPass(newPass);
  document.getElementById('s-current-pass').value='';
  document.getElementById('s-new-pass').value='';
  document.getElementById('s-confirm-pass').value='';
  toast('Password changed successfully! 🔒','success');
});

document.getElementById('reset-products-btn').addEventListener('click',()=>{
  if(!confirm('This will reset ALL products to defaults. Are you sure?')) return;
  saveProducts(DEFAULT_PRODUCTS); renderProducts(); renderDashboard(); renderFlashSale();
  toast('Products reset to defaults','info');
});

/* ===== EXPORT ===== */
document.getElementById('export-btn').addEventListener('click',()=>{
  const page=currentPage;
  if(page==='users'){
    const users=getUsers();
    const csv=['ID,Name,Email,Phone,Registered Date,Total Orders'].concat(
      users.map(u=>{ const oc=getOrders().filter(o=>o.userEmail===u.email).length; return `${u.id},"${u.name}","${u.email}","${u.phone||''}","${u.createdAt||''}",${oc}`; })
    ).join('\n');
    downloadCSV(csv,'nextgen-users.csv'); toast('Users exported as CSV!','success');
  } else if(page==='orders'){
    const orders=getOrders();
    const csv=['Order ID,Customer,Email,Phone,Address,Payment,Items,Total,Status,Date'].concat(
      orders.map(o=>`"${o.id}","${o.userName}","${o.userEmail}","${o.userPhone}","${o.address}","${o.paymentMethod}","${o.items?.length||0} items",${o.total||0},"${o.status}","${o.date}"`)
    ).join('\n');
    downloadCSV(csv,'nextgen-orders.csv'); toast('Orders exported as CSV!','success');
  } else {
    const products=getProducts();
    const csv=['ID,Name,Brand,Category,Price,Old Price,Discount,Badge,Stock,Flash Sale,Active'].concat(
      products.map(p=>[p.id,`"${p.name}"`,p.brand,p.category,p.price,p.oldPrice,p.discount+'%',p.badge,p.stock,p.flashSale,p.active].join(','))
    ).join('\n');
    downloadCSV(csv,'nextgen-products.csv'); toast('Products exported as CSV!','success');
  }
});

function downloadCSV(csv,filename){
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}

/* Visit Site */
document.getElementById('visit-site-btn').addEventListener('click',()=>window.open('index.html','_blank'));

/* Mobile sidebar toggle */
document.getElementById('sidebar-toggle')?.addEventListener('click',()=>{
  document.getElementById('sidebar').classList.toggle('open');
});
