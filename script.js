/* ===========================
   NextGen Mobiles — Main Store JS v3
   =========================== */

/* ===== STORAGE KEYS ===== */
const PRODUCTS_KEY    = 'ng_products';
const SETTINGS_KEY    = 'ng_settings';
const CATS_KEY        = 'ng_categories';
const USERS_KEY       = 'ng_users';
const ORDERS_KEY      = 'ng_orders';
const SESSION_KEY     = 'ng_session_user';

/* ===== STATE ===== */
const state = {
  cart:        JSON.parse(localStorage.getItem('ng_cart') || '[]'),
  wishlist:    JSON.parse(localStorage.getItem('ng_wish') || '[]'),
  compareList: [],
  theme:       localStorage.getItem('ng_theme') || 'dark',
  activeSlide: 0,
  currentUser: null,
};

/* ===== DEFAULT DATA ===== */
const DEFAULT_PRODUCTS = [
  { id:1, name:'iPhone 16 Pro Max', brand:'Apple', category:'flagship', price:189900, oldPrice:214900, discount:12, rating:4.9, reviews:2847, emoji:'📱', badge:'new', stock:'in-stock', colors:['#1c1c1e','#f5f5f0','#b0b8c1','#4d3b2f'], storage:['256GB','512GB','1TB'], emi:'15,825/mo', active:true, flashSale:true },
  { id:2, name:'Samsung Galaxy S25 Ultra', brand:'Samsung', category:'flagship', price:164900, oldPrice:184900, discount:11, rating:4.8, reviews:3214, emoji:'📲', badge:'hot', stock:'in-stock', colors:['#1a1a1a','#e6ddd4','#b8c4d9'], storage:['256GB','512GB'], emi:'13,742/mo', active:true, flashSale:true },
  { id:3, name:'Google Pixel 9 Pro XL', brand:'Google', category:'mid-range', price:139900, oldPrice:159900, discount:13, rating:4.7, reviews:1568, emoji:'🤳', badge:'sale', stock:'low-stock', colors:['#e8eaed','#3c4043','#c2d2e9'], storage:['128GB','256GB'], emi:'11,658/mo', active:true, flashSale:false },
  { id:4, name:'OnePlus 13 Pro', brand:'OnePlus', category:'mid-range', price:99900, oldPrice:114900, discount:13, rating:4.6, reviews:987, emoji:'📱', badge:'new', stock:'in-stock', colors:['#000000','#1a4dff','#2d5a27'], storage:['256GB','512GB'], emi:'8,325/mo', active:true, flashSale:false },
  { id:5, name:'Xiaomi 15 Ultra', brand:'Xiaomi', category:'mid-range', price:89900, oldPrice:104900, discount:14, rating:4.5, reviews:2103, emoji:'📲', badge:'hot', stock:'in-stock', colors:['#ffffff','#000000','#1c3a6b'], storage:['256GB','512GB','1TB'], emi:'7,492/mo', active:true, flashSale:true },
  { id:6, name:'Motorola Edge 50 Pro', brand:'Motorola', category:'budget', price:54900, oldPrice:64900, discount:15, rating:4.3, reviews:756, emoji:'📱', badge:'sale', stock:'low-stock', colors:['#3c3c3c','#6b1ab0','#1a4a8c'], storage:['128GB','256GB'], emi:'4,575/mo', active:true, flashSale:false },
  { id:7, name:'Realme GT 6T', brand:'Realme', category:'budget', price:39900, oldPrice:49900, discount:20, rating:4.2, reviews:1432, emoji:'🤳', badge:'sale', stock:'in-stock', colors:['#c8a028','#1a1a1a'], storage:['128GB','256GB'], emi:'3,325/mo', active:true, flashSale:true },
  { id:8, name:'Nothing Phone (3)', brand:'Nothing', category:'mid-range', price:69900, oldPrice:79900, discount:13, rating:4.4, reviews:892, emoji:'📲', badge:'new', stock:'in-stock', colors:['#ffffff','#1a1a1a'], storage:['128GB','256GB','512GB'], emi:'5,825/mo', active:true, flashSale:false },
];

const DEFAULT_SETTINGS = {
  siteName:'NextGen Mobiles', flashSaleActive:true, chatbotActive:true,
  notificationsActive:true, shippingFee:350, freeShippingMin:10000, currency:'Rs.',
};

const DEFAULT_CATS = [
  {id:1,name:'Flagship',icon:'👑',count:24},{id:2,name:'Mid-Range',icon:'⚡',count:48},
  {id:3,name:'Budget',icon:'💰',count:36},{id:4,name:'Gaming',icon:'🎮',count:18},
  {id:5,name:'Camera',icon:'📷',count:22},{id:6,name:'Battery',icon:'🔋',count:15},
  {id:7,name:'Foldable',icon:'🪗',count:8},{id:8,name:'5G Ready',icon:'🌐',count:56},
];

/* ===== DATA HELPERS ===== */
function getProducts(){ try{ return (JSON.parse(localStorage.getItem(PRODUCTS_KEY))||DEFAULT_PRODUCTS).filter(p=>p.active!==false); }catch{ return DEFAULT_PRODUCTS; } }
function getSettings(){ try{ return {...DEFAULT_SETTINGS,...(JSON.parse(localStorage.getItem(SETTINGS_KEY))||{})}; }catch{ return DEFAULT_SETTINGS; } }
function getCats(){ try{ return JSON.parse(localStorage.getItem(CATS_KEY))||DEFAULT_CATS; }catch{ return DEFAULT_CATS; } }
function getUsers(){ try{ return JSON.parse(localStorage.getItem(USERS_KEY))||[]; }catch{ return []; } }
function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getOrders(){ try{ return JSON.parse(localStorage.getItem(ORDERS_KEY))||[]; }catch{ return []; } }
function saveOrders(o){ localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); }
function saveCart(){ localStorage.setItem('ng_cart', JSON.stringify(state.cart)); }
function saveWishlist(){ localStorage.setItem('ng_wish', JSON.stringify(state.wishlist)); }

/* ===== USER SESSION ===== */
function getSessionUser(){
  try{ return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }catch{ return null; }
}
function setSessionUser(u){ sessionStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function clearSession(){ sessionStorage.removeItem(SESSION_KEY); }

/* ===== HERO SLIDES ===== */
const heroSlides = [
  { brand:'Apple',  model:'iPhone 16 Pro Max',     price:'Rs. 189,900', emoji:'📱' },
  { brand:'Samsung',model:'Galaxy S25 Ultra',      price:'Rs. 164,900', emoji:'📲' },
  { brand:'Google', model:'Pixel 9 Pro XL',        price:'Rs. 139,900', emoji:'🤳' },
];

const testimonials = [
  { text:"NextGen Mobiles has the best collection I've ever seen. Got my iPhone 16 Pro Max in 2 days!", name:'Ashan Perera', role:'Tech Enthusiast', stars:5, avatar:'👨' },
  { text:"Incredible prices and genuine products. The EMI option made it easy to get my Samsung S25 Ultra.", name:'Nimasha Silva', role:'Content Creator', stars:5, avatar:'👩' },
  { text:"The customer support is exceptional. Helped me choose the perfect phone. Super fast delivery!", name:'Kasun Fernando', role:'Software Engineer', stars:5, avatar:'🧑' },
  { text:"Best online phone store in Sri Lanka! Smooth website, genuine products. Will buy again.", name:'Dilini Jayawardena', role:'Entrepreneur', stars:5, avatar:'👩' },
  { text:"Amazing deal on my OnePlus 13 Pro. Premium packaging, arrived in perfect condition. 10/10!", name:'Malith Rathnayake', role:'Student', stars:4, avatar:'👨' },
  { text:"Smooth checkout, fast delivery. AI chatbot helped me decide between two phones. Great!", name:'Tharushi Wijesekara', role:'Digital Marketer', stars:5, avatar:'👩' },
];

const chatResponses = [
  "What's your budget range? I'll find the best options for you!",
  "Great! For flagship experience, check out iPhone 16 Pro Max or Samsung S25 Ultra.",
  "For gaming phones, the Samsung S25 Ultra has an amazing Snapdragon chip!",
  "We offer 0% EMI starting from Rs. 3,325/month. Want details?",
  "All products have official warranty + free delivery above Rs. 10,000 🚀",
  "Want me to compare two phones side by side? Just name them!",
  "Our Flash Sale has amazing discounts — check before they run out! ⚡",
];

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
    initParticles();
    const s = getSettings();
    if (s.notificationsActive) startNotifications();
    loadUserSession();
  }, 2000);
});

/* ===== PARTICLES ===== */
function initParticles(){
  const bg = document.getElementById('particles-bg');
  if (!bg) return;
  const colors = ['#00d4ff','#7c3aed','#ff006e','#00ff88'];
  for(let i=0;i<35;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `left:${Math.random()*100}%;width:${Math.random()*3+1}px;height:${Math.random()*3+1}px;background:${colors[Math.floor(Math.random()*4)]};animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;`;
    bg.appendChild(p);
  }
}

/* ===== THEME ===== */
document.documentElement.setAttribute('data-theme', state.theme);
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
if(themeToggle){
  themeIcon.className = state.theme==='dark' ? 'fas fa-moon' : 'fas fa-sun';
  themeToggle.addEventListener('click', () => {
    state.theme = state.theme==='dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    themeIcon.className = state.theme==='dark' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('ng_theme', state.theme);
  });
}

/* ===== NAVBAR ===== */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
  document.querySelector('.back-to-top')?.classList.toggle('show', window.scrollY > 300);
});

const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
if(hamburger){
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('show');
  });
  mobileOverlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu(){
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('show');
}

/* Mobile Filter Toggle */
document.getElementById('mobile-filter-btn')?.addEventListener('click', () => {
  document.querySelector('.filter-sidebar')?.classList.toggle('mobile-open');
});

/* ===== SEARCH ===== */
const searchInput    = document.getElementById('nav-search');
const searchDropdown = document.getElementById('search-dropdown');
if(searchInput){
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    if(!val){ searchDropdown.classList.remove('show'); return; }
    const matches = getProducts().filter(p =>
      p.name.toLowerCase().includes(val) || p.brand.toLowerCase().includes(val)
    ).slice(0,5);
    if(!matches.length){ searchDropdown.classList.remove('show'); return; }
    searchDropdown.innerHTML = matches.map(p => `
      <div class="search-result-item" onclick="openQuickView(${p.id})">
        <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#0f172a,#1e293b);display:flex;align-items:center;justify-content:center;font-size:1.2rem">${p.emoji}</div>
        <div class="sri-info"><span>${p.name}</span><small>Rs. ${p.price.toLocaleString()}</small></div>
      </div>
    `).join('');
    searchDropdown.classList.add('show');
  });
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.nav-search')) searchDropdown.classList.remove('show');
  });
}

/* Voice Search */
const voiceBtn = document.getElementById('voice-btn');
if(voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR(); rec.continuous=false; rec.lang='en-US';
  voiceBtn.addEventListener('click', () => { voiceBtn.classList.add('listening'); rec.start(); });
  rec.onresult = (e) => { searchInput.value=e.results[0][0].transcript; searchInput.dispatchEvent(new Event('input')); voiceBtn.classList.remove('listening'); };
  rec.onerror = rec.onend = () => voiceBtn.classList.remove('listening');
} else if(voiceBtn){ voiceBtn.style.display='none'; }

/* ===== HERO SLIDER ===== */
let slideInterval;
function renderHeroSlide(idx){
  const slide = heroSlides[idx];
  const pn=document.querySelector('.phone-product-name'), pm=document.querySelector('.phone-product-model'), pp=document.querySelector('.phone-product-price');
  if(pn) pn.textContent=slide.brand;
  if(pm) pm.textContent=slide.model;
  if(pp) pp.textContent=slide.price;
  document.querySelectorAll('.slider-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
}
function startSlider(){
  slideInterval=setInterval(()=>{ state.activeSlide=(state.activeSlide+1)%heroSlides.length; renderHeroSlide(state.activeSlide); },3000);
}
document.querySelectorAll('.slider-dot').forEach((dot,i)=>{
  dot.addEventListener('click',()=>{ clearInterval(slideInterval); state.activeSlide=i; renderHeroSlide(i); startSlider(); });
});
startSlider();

/* Parallax */
document.addEventListener('mousemove', (e) => {
  const showcase = document.querySelector('.phone-showcase');
  if(!showcase || window.innerWidth < 900) return;
  const x=(e.clientX/window.innerWidth-0.5)*8;
  const y=(e.clientY/window.innerHeight-0.5)*8;
  showcase.style.transform=`translateY(0) rotateY(${x}deg) rotateX(${-y}deg)`;
});

/* ===== RENDER FUNCTIONS ===== */
function renderCategories(){
  const el=document.getElementById('categories-grid');
  if(!el) return;
  el.innerHTML=getCats().map(c=>`
    <div class="category-card reveal" onclick="filterByCategory('${c.name.toLowerCase()}')">
      <span class="cat-icon">${c.icon}</span>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count||0} Phones</div>
    </div>`).join('');
}

function renderFlashProducts(){
  const el=document.getElementById('flash-products');
  const section=document.getElementById('flash-sale');
  if(!el) return;
  const s=getSettings();
  if(!s.flashSaleActive){ if(section) section.style.display='none'; return; }
  const items=getProducts().filter(p=>p.flashSale);
  if(!items.length){ if(section) section.style.display='none'; return; }
  el.innerHTML=items.map(p=>renderProductCard(p)).join('');
}

function renderProducts(filter=null){
  const el=document.getElementById('products-grid');
  if(!el) return;
  let list=getProducts();
  if(filter) list=list.filter(p=>p.brand.toLowerCase()===filter||p.category===filter||p.category===filter.replace('-',''));
  const cnt=document.getElementById('products-count');
  if(cnt) cnt.textContent=list.length;
  el.innerHTML=list.map(p=>renderProductCard(p)).join('');
  observeReveal();
}

function renderTrending(){
  const el=document.getElementById('trending-grid');
  if(!el) return;
  el.innerHTML=[...getProducts()].sort((a,b)=>b.reviews-a.reviews).slice(0,4).map(p=>renderProductCard(p)).join('');
}

function renderTestimonials(){
  const el=document.getElementById('testimonials-grid');
  if(!el) return;
  el.innerHTML=testimonials.map(t=>`
    <div class="testimonial-card reveal">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.avatar}</div>
        <div><div class="author-name">${t.name}</div><div class="author-role">${t.role}</div></div>
      </div>
    </div>`).join('');
}

function renderProductCard(p){
  const isWished=state.wishlist.includes(p.id);
  const isCompared=state.compareList.includes(p.id);
  const s=getSettings();
  return `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-card-img">
        <div class="phone-emoji">${p.emoji}</div>
        <div class="product-badges">
          ${p.badge==='new'?'<span class="badge-pill badge-new">New</span>':''}
          ${p.badge==='sale'?'<span class="badge-pill badge-sale">Sale</span>':''}
          ${p.badge==='hot'?'<span class="badge-pill badge-hot">🔥 Hot</span>':''}
        </div>
        <div class="product-actions-overlay">
          <div class="action-btn ${isWished?'active':''}" title="Wishlist" onclick="toggleWishlist(${p.id},this)">
            <i class="fa${isWished?'s':'r'} fa-heart"></i>
          </div>
          <div class="action-btn" title="Quick View" onclick="openQuickView(${p.id})">
            <i class="fas fa-eye"></i>
          </div>
          <div class="action-btn ${isCompared?'active':''}" title="Compare" onclick="addToCompare(${p.id},this)">
            <i class="fas fa-code-compare"></i>
          </div>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating%1?'½':''}</span>
          <span class="rating-count">(${(p.reviews||0).toLocaleString()})</span>
        </div>
        <div class="stock-status ${p.stock==='in-stock'?'in-stock':p.stock==='low-stock'?'low-stock':'out-stock'}">
          <i class="fas fa-circle" style="font-size:0.5rem"></i>
          ${p.stock==='in-stock'?'In Stock':p.stock==='low-stock'?'Only 3 Left!':'Out of Stock'}
        </div>
        <div class="product-price">
          <span class="price-current">${s.currency} ${p.price.toLocaleString()}</span>
          ${p.oldPrice?`<span class="price-old">${s.currency} ${p.oldPrice.toLocaleString()}</span>`:''}
          ${p.discount?`<span class="price-discount">-${p.discount}%</span>`:''}
        </div>
        <div class="product-variants">
          ${(p.colors||[]).map((c,i)=>`<div class="variant-dot ${i===0?'active':''}" style="background:${c}" onclick="selectVariant(this)"></div>`).join('')}
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
          <i class="fas fa-shopping-cart"></i><span>Add to Cart</span>
        </button>
      </div>
    </div>`;
}

function selectVariant(el){
  el.closest('.product-variants').querySelectorAll('.variant-dot').forEach(d=>d.classList.remove('active'));
  el.classList.add('active');
}

function filterByCategory(cat){
  document.getElementById('products-section')?.scrollIntoView({behavior:'smooth'});
  setTimeout(()=>renderProducts(cat),400);
}

/* ===== CART ===== */
function addToCart(productId){
  const product=getProducts().find(p=>p.id===productId);
  if(!product) return;
  const existing=state.cart.find(i=>i.id===productId);
  if(existing) existing.qty++;
  else state.cart.push({...product,qty:1});
  saveCart(); updateCartUI();
  showToast(`${product.name} added to cart! 🛒`,'success');
  animateCartBadge();
}

function removeFromCart(productId){
  state.cart=state.cart.filter(i=>i.id!==productId);
  saveCart(); updateCartUI(); renderCartItems();
}

function updateQty(productId,delta){
  const item=state.cart.find(i=>i.id===productId);
  if(!item) return;
  item.qty=Math.max(1,item.qty+delta);
  saveCart(); renderCartItems(); updateCartUI();
}

function updateCartUI(){
  const total=state.cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('.cart-badge').forEach(b=>{
    b.textContent=total; b.style.display=total>0?'flex':'none';
  });
}

function animateCartBadge(){
  const b=document.querySelector('.cart-badge');
  if(!b) return;
  b.style.transform='scale(1.5)';
  setTimeout(()=>b.style.transform='scale(1)',300);
}

function renderCartItems(){
  const container=document.getElementById('cart-items');
  const empty=document.getElementById('cart-empty');
  const footer=document.getElementById('cart-footer');
  if(!container) return;
  const s=getSettings();
  if(state.cart.length===0){ container.innerHTML=''; empty.style.display='block'; footer.style.display='none'; return; }
  empty.style.display='none'; footer.style.display='block';
  container.innerHTML=state.cart.map(item=>`
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${s.currency} ${(item.price*item.qty).toLocaleString()}</div>
        <div class="cart-item-qty">
          <div class="qty-btn" onclick="updateQty(${item.id},-1)"><i class="fas fa-minus"></i></div>
          <span class="qty-num">${item.qty}</span>
          <div class="qty-btn" onclick="updateQty(${item.id},1)"><i class="fas fa-plus"></i></div>
        </div>
      </div>
      <div class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></div>
    </div>`).join('');
  const subtotal=state.cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  const shipping=subtotal>=s.freeShippingMin?0:s.shippingFee;
  const total=subtotal+shipping;
  document.getElementById('cart-subtotal').textContent=`${s.currency} ${subtotal.toLocaleString()}`;
  document.getElementById('cart-shipping').textContent=shipping===0?'FREE':`${s.currency} ${shipping}`;
  document.getElementById('cart-total').textContent=`${s.currency} ${total.toLocaleString()}`;
}

/* Cart sidebar */
const cartSidebar=document.getElementById('cart-sidebar');
document.getElementById('cart-toggle')?.addEventListener('click',()=>{ cartSidebar.classList.add('open'); renderCartItems(); });
document.getElementById('cart-close')?.addEventListener('click',()=>cartSidebar.classList.remove('open'));
document.getElementById('coupon-btn')?.addEventListener('click',()=>{
  const code=document.getElementById('coupon-input').value.trim().toUpperCase();
  if(code==='NEXTGEN10') showToast('10% discount applied! 🎉','success');
  else if(code==='FLASH20') showToast('20% flash sale discount! 🔥','success');
  else showToast('Invalid coupon code','error');
});

/* ===== CHECKOUT ===== */
document.getElementById('checkout-btn')?.addEventListener('click',()=>{
  if(state.cart.length===0){ showToast('Your cart is empty!','error'); return; }
  cartSidebar.classList.remove('open');
  openCheckoutModal();
});

function openCheckoutModal(){
  const user=state.currentUser;
  const modal=document.getElementById('checkout-modal');
  const s=getSettings();
  const subtotal=state.cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  const shipping=subtotal>=s.freeShippingMin?0:s.shippingFee;
  const total=subtotal+shipping;

  // Pre-fill if logged in
  if(user){
    document.getElementById('co-name').value=user.name||'';
    document.getElementById('co-email').value=user.email||'';
    document.getElementById('co-phone').value=user.phone||'';
  }

  // Order summary
  document.getElementById('co-items-list').innerHTML=state.cart.map(item=>`
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--glass-border)">
      <span style="font-size:1.4rem">${item.emoji}</span>
      <div style="flex:1">
        <div style="font-size:0.82rem;font-weight:700">${item.name}</div>
        <div style="font-size:0.75rem;color:var(--text-secondary)">Qty: ${item.qty}</div>
      </div>
      <div style="font-size:0.85rem;font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
        ${s.currency} ${(item.price*item.qty).toLocaleString()}
      </div>
    </div>`).join('');
  document.getElementById('co-subtotal').textContent=`${s.currency} ${subtotal.toLocaleString()}`;
  document.getElementById('co-shipping-fee').textContent=shipping===0?'FREE':`${s.currency} ${shipping}`;
  document.getElementById('co-total').textContent=`${s.currency} ${total.toLocaleString()}`;
  modal.classList.add('open');
}

document.getElementById('co-close')?.addEventListener('click',()=>
  document.getElementById('checkout-modal').classList.remove('open')
);
document.getElementById('checkout-modal')?.addEventListener('click',(e)=>{
  if(e.target===e.currentTarget) e.currentTarget.classList.remove('open');
});

document.getElementById('place-order-btn')?.addEventListener('click',()=>{
  const name=document.getElementById('co-name').value.trim();
  const email=document.getElementById('co-email').value.trim();
  const phone=document.getElementById('co-phone').value.trim();
  const address=document.getElementById('co-address').value.trim();
  const payment=document.getElementById('co-payment').value;
  if(!name||!email||!phone||!address){ showToast('Please fill all required fields','error'); return; }

  const s=getSettings();
  const subtotal=state.cart.reduce((sum,i)=>sum+i.price*i.qty,0);
  const shipping=subtotal>=s.freeShippingMin?0:s.shippingFee;
  const total=subtotal+shipping;

  const order={
    id:'NG-'+Date.now().toString().slice(-6),
    userId: state.currentUser?.id||null,
    userName: name,
    userEmail: email,
    userPhone: phone,
    address: address,
    paymentMethod: payment,
    items: state.cart.map(i=>({id:i.id,name:i.name,emoji:i.emoji,price:i.price,qty:i.qty})),
    subtotal,shipping,total,
    status:'processing',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}),
    createdAt: Date.now(),
  };

  const orders=getOrders();
  orders.unshift(order);
  saveOrders(orders);

  // Clear cart
  state.cart=[];
  saveCart(); updateCartUI();

  document.getElementById('checkout-modal').classList.remove('open');
  showOrderSuccess(order);
});

function showOrderSuccess(order){
  const modal=document.getElementById('order-success-modal');
  document.getElementById('os-order-id').textContent='#'+order.id;
  document.getElementById('os-name').textContent=order.userName;
  document.getElementById('os-total').textContent=`Rs. ${order.total.toLocaleString()}`;
  document.getElementById('os-items-count').textContent=order.items.length;
  modal.classList.add('open');
}

document.getElementById('os-close')?.addEventListener('click',()=>
  document.getElementById('order-success-modal').classList.remove('open')
);
document.getElementById('view-orders-btn')?.addEventListener('click',()=>{
  document.getElementById('order-success-modal').classList.remove('open');
  openMyOrders();
});

/* ===== MY ORDERS ===== */
function openMyOrders(){
  const modal=document.getElementById('my-orders-modal');
  const user=state.currentUser;
  const orders=getOrders();
  const myOrders=user ? orders.filter(o=>o.userEmail===user.email) : orders.filter(o=>o.userId===null);

  const tbody=document.getElementById('my-orders-list');
  const statusColors={processing:'#f59e0b',shipped:'#00d4ff',delivered:'#00ff88',cancelled:'#ef4444'};

  if(myOrders.length===0){
    tbody.innerHTML=`<div style="text-align:center;padding:48px 20px;color:var(--text-muted)">
      <div style="font-size:3rem;margin-bottom:12px">📦</div>
      <p>No orders yet. Start shopping!</p>
    </div>`;
  } else {
    tbody.innerHTML=myOrders.map(o=>`
      <div style="background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-size:0.9rem;font-weight:800;color:var(--neon-blue)">#${o.id}</div>
            <div style="font-size:0.72rem;color:var(--text-muted)">${o.date} · ${o.time}</div>
          </div>
          <span style="padding:4px 12px;border-radius:100px;font-size:0.72rem;font-weight:800;background:${statusColors[o.status]}20;color:${statusColors[o.status]};border:1px solid ${statusColors[o.status]}40">
            ${o.status.charAt(0).toUpperCase()+o.status.slice(1)}
          </span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
          ${o.items.map(i=>`
            <div style="display:flex;align-items:center;gap:6px;background:var(--bg-card);border:1px solid var(--glass-border);border-radius:10px;padding:6px 10px;font-size:0.78rem">
              <span style="font-size:1.1rem">${i.emoji}</span>
              <span style="font-weight:600">${i.name.split(' ').slice(0,3).join(' ')}</span>
              <span style="color:var(--text-muted)">x${i.qty}</span>
            </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding-top:10px;border-top:1px solid var(--glass-border)">
          <span style="color:var(--text-muted)">📍 ${o.address}</span>
          <span style="font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Rs. ${o.total.toLocaleString()}</span>
        </div>
      </div>`).join('');
  }
  modal.classList.add('open');
}

document.getElementById('orders-modal-close')?.addEventListener('click',()=>
  document.getElementById('my-orders-modal').classList.remove('open')
);
document.getElementById('my-orders-modal')?.addEventListener('click',(e)=>{
  if(e.target===e.currentTarget) e.currentTarget.classList.remove('open');
});

/* ===== WISHLIST ===== */
function toggleWishlist(productId,btn){
  const product=getProducts().find(p=>p.id===productId);
  const idx=state.wishlist.indexOf(productId);
  if(idx===-1){
    state.wishlist.push(productId);
    if(btn){ btn.classList.add('active'); btn.innerHTML='<i class="fas fa-heart"></i>'; }
    showToast(`${product?.name} added to wishlist! ❤️`,'info');
  } else {
    state.wishlist.splice(idx,1);
    if(btn){ btn.classList.remove('active'); btn.innerHTML='<i class="far fa-heart"></i>'; }
    showToast('Removed from wishlist','info');
  }
  saveWishlist();
  const wc=document.querySelector('.wish-badge');
  if(wc){ wc.textContent=state.wishlist.length; wc.style.display=state.wishlist.length>0?'flex':'none'; }
}

/* ===== QUICK VIEW ===== */
function openQuickView(productId){
  const p=getProducts().find(x=>x.id===productId);
  if(!p) return;
  const s=getSettings();
  document.getElementById('qv-emoji').textContent=p.emoji;
  document.getElementById('qv-name').textContent=p.name;
  document.getElementById('qv-price').textContent=`${s.currency} ${p.price.toLocaleString()}`;
  document.getElementById('qv-brand').textContent=p.brand;
  document.getElementById('qv-rating').textContent=`${'★'.repeat(Math.floor(p.rating))} (${(p.reviews||0).toLocaleString()} reviews)`;
  document.getElementById('qv-storage').innerHTML=(p.storage||[]).map((sv,i)=>
    `<span class="brand-chip ${i===0?'active':''}" onclick="selectBrandChip(this)">${sv}</span>`
  ).join('');
  document.getElementById('qv-desc').textContent=p.desc||`${p.brand} ${p.name} — ${p.category} category phone with amazing features.`;
  document.getElementById('qv-add-cart').onclick=()=>{ addToCart(productId); document.getElementById('quick-view-modal').classList.remove('open'); };
  document.getElementById('quick-view-modal').classList.add('open');
}

function selectBrandChip(el){
  el.closest('div').querySelectorAll('.brand-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
}
document.getElementById('qv-close')?.addEventListener('click',()=>document.getElementById('quick-view-modal').classList.remove('open'));
document.getElementById('quick-view-modal')?.addEventListener('click',(e)=>{ if(e.target===e.currentTarget) e.currentTarget.classList.remove('open'); });

/* ===== COMPARE ===== */
function addToCompare(productId,btn){
  const idx=state.compareList.indexOf(productId);
  if(idx!==-1){ state.compareList.splice(idx,1); btn?.classList.remove('active'); }
  else {
    if(state.compareList.length>=3){ showToast('Max 3 products to compare','error'); return; }
    state.compareList.push(productId); btn?.classList.add('active');
  }
  updateCompareBar();
}

function updateCompareBar(){
  const bar=document.getElementById('compare-bar');
  const itemsEl=document.getElementById('compare-items');
  if(!bar) return;
  if(state.compareList.length===0){ bar.classList.remove('show'); return; }
  bar.classList.add('show');
  itemsEl.innerHTML=[0,1,2].map(i=>{
    const pid=state.compareList[i];
    if(pid){ const p=getProducts().find(x=>x.id===pid); return `<div class="compare-item-thumb">${p?.emoji||'📱'}<div class="compare-item-remove" onclick="removeFromCompare(${pid})">✕</div></div>`; }
    return `<div class="compare-placeholder">+</div>`;
  }).join('');
}

function removeFromCompare(productId){
  state.compareList=state.compareList.filter(id=>id!==productId);
  updateCompareBar();
}

document.getElementById('compare-now-btn')?.addEventListener('click',()=>{
  if(state.compareList.length<2){ showToast('Select at least 2 products to compare','error'); return; }
  showToast('Opening comparison view...','info');
});
document.getElementById('clear-compare-btn')?.addEventListener('click',()=>{ state.compareList=[]; updateCompareBar(); });

/* ===== FILTERS ===== */
function filterByBrand(brand){
  document.querySelectorAll('.filter-brand-chips .brand-chip').forEach(c=>c.classList.toggle('active',c.textContent.toLowerCase()===brand));
  renderProducts(brand==='all'?null:brand);
}

document.getElementById('price-range')?.addEventListener('input',(e)=>{
  const el=document.getElementById('price-max-display');
  if(el) el.textContent=`Rs. ${(parseInt(e.target.value)*1000).toLocaleString()}`;
});
document.getElementById('sort-select')?.addEventListener('change',(e)=>{
  let sorted=[...getProducts()];
  switch(e.target.value){
    case 'price-asc':  sorted.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': sorted.sort((a,b)=>b.price-a.price); break;
    case 'rating':     sorted.sort((a,b)=>b.rating-a.rating); break;
    case 'reviews':    sorted.sort((a,b)=>b.reviews-a.reviews); break;
    case 'discount':   sorted.sort((a,b)=>b.discount-a.discount); break;
  }
  const el=document.getElementById('products-grid');
  if(el) el.innerHTML=sorted.map(p=>renderProductCard(p)).join('');
  observeReveal();
});
document.getElementById('grid-view-btn')?.addEventListener('click',()=>{
  document.getElementById('products-grid').classList.remove('list-view');
  document.getElementById('grid-view-btn').classList.add('active');
  document.getElementById('list-view-btn').classList.remove('active');
});
document.getElementById('list-view-btn')?.addEventListener('click',()=>{
  document.getElementById('products-grid').classList.add('list-view');
  document.getElementById('list-view-btn').classList.add('active');
  document.getElementById('grid-view-btn').classList.remove('active');
});
document.getElementById('clear-filters')?.addEventListener('click',()=>{
  document.querySelectorAll('.filter-option input').forEach(cb=>cb.checked=false);
  document.querySelectorAll('.filter-brand-chips .brand-chip').forEach(c=>c.classList.remove('active'));
  const pr=document.getElementById('price-range'); if(pr) pr.value=200;
  const pd=document.getElementById('price-max-display'); if(pd) pd.textContent='Rs. 200,000';
  renderProducts(); showToast('Filters cleared','info');
});
document.querySelectorAll('.filter-brand-chips .brand-chip').forEach(chip=>{
  chip.addEventListener('click',()=>{
    chip.classList.toggle('active');
    const active=[...document.querySelectorAll('.filter-brand-chips .brand-chip.active')].map(c=>c.textContent.toLowerCase());
    renderProducts(active.length?active[0]:null);
  });
});

/* ===== COUNTDOWN ===== */
function updateCountdown(){
  const now=new Date(),end=new Date(); end.setHours(23,59,59,0);
  const diff=end-now;
  const h=Math.floor(diff/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
  const el=id=>document.getElementById(id);
  if(el('cd-hours')) el('cd-hours').textContent=String(h).padStart(2,'0');
  if(el('cd-mins'))  el('cd-mins').textContent=String(m).padStart(2,'0');
  if(el('cd-secs'))  el('cd-secs').textContent=String(s).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

/* ===== USER AUTH ===== */
function loadUserSession(){
  state.currentUser=getSessionUser();
  updateUserUI();
}

function updateUserUI(){
  const user=state.currentUser;
  const navUserName=document.getElementById('nav-user-name');
  const userDropdown=document.querySelector('.user-dropdown');
  const wishCount=document.querySelector('.wish-badge');

  if(user){
    if(navUserName) navUserName.textContent=user.name.split(' ')[0];
    if(userDropdown){
      userDropdown.innerHTML=`
        <div style="padding:12px;border-bottom:1px solid var(--glass-border);margin-bottom:4px">
          <div style="font-size:0.9rem;font-weight:800">${user.name}</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">${user.email}</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">${user.phone||''}</div>
        </div>
        <a href="#" onclick="openMyOrders();return false;"><i class="fas fa-box"></i> My Orders</a>
        <a href="#" onclick="openWishlistView();return false;"><i class="far fa-heart"></i> Wishlist (${state.wishlist.length})</a>
        <a href="#" onclick="logoutUser();return false;" style="color:var(--neon-pink)"><i class="fas fa-sign-out-alt"></i> Logout</a>
      `;
    }
  } else {
    if(navUserName) navUserName.textContent='';
    if(userDropdown){
      userDropdown.innerHTML=`
        <a href="#" onclick="openAuthModal('login');return false;"><i class="fas fa-sign-in-alt"></i> Login</a>
        <a href="#" onclick="openAuthModal('register');return false;"><i class="fas fa-user-plus"></i> Register</a>
        <a href="#" onclick="openMyOrders();return false;"><i class="fas fa-box"></i> My Orders</a>
        <a href="#" onclick="openWishlistView();return false;"><i class="far fa-heart"></i> Wishlist</a>
      `;
    }
  }
  if(wishCount){ wishCount.textContent=state.wishlist.length; wishCount.style.display=state.wishlist.length>0?'flex':'none'; }
}

function openAuthModal(tab='login'){
  document.getElementById('auth-modal').classList.add('open');
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.auth-form').forEach(f=>f.classList.toggle('active',f.id===`${tab}-form`));
}

function logoutUser(){
  state.currentUser=null;
  clearSession();
  updateUserUI();
  showToast('Logged out successfully 👋','info');
}

function openWishlistView(){
  if(state.wishlist.length===0){ showToast(`Your wishlist is empty. Add some phones! ❤️`,'info'); return; }
  showToast(`You have ${state.wishlist.length} item${state.wishlist.length!==1?'s':''} in your wishlist ❤️`,'info');
}

document.getElementById('user-btn')?.addEventListener('click',()=>{
  if(!state.currentUser) openAuthModal('login');
});

/* Auth Tabs */
document.querySelectorAll('.auth-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f=>f.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`${tab.dataset.tab}-form`)?.classList.add('active');
  });
});

document.getElementById('auth-close')?.addEventListener('click',()=>document.getElementById('auth-modal').classList.remove('open'));
document.getElementById('auth-modal')?.addEventListener('click',(e)=>{ if(e.target===e.currentTarget) e.currentTarget.classList.remove('open'); });

/* LOGIN */
document.getElementById('login-form')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const email=document.getElementById('li-email').value.trim().toLowerCase();
  const pass=document.getElementById('li-pass').value;
  const users=getUsers();
  const user=users.find(u=>u.email.toLowerCase()===email&&u.password===pass);
  if(!user){ showToast('Wrong email or password!','error'); return; }
  state.currentUser=user;
  setSessionUser(user);
  updateUserUI();
  document.getElementById('auth-modal').classList.remove('open');
  showToast(`Welcome back, ${user.name.split(' ')[0]}! 👋`,'success');
});

/* REGISTER */
document.getElementById('register-form')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const firstName=document.getElementById('reg-firstname').value.trim();
  const lastName=document.getElementById('reg-lastname').value.trim();
  const email=document.getElementById('reg-email').value.trim().toLowerCase();
  const phone=document.getElementById('reg-phone').value.trim();
  const pass=document.getElementById('reg-pass').value;
  const confirmPass=document.getElementById('reg-confirm').value;

  if(pass!==confirmPass){ showToast('Passwords do not match!','error'); return; }
  if(pass.length<6){ showToast('Password must be at least 6 characters','error'); return; }
  const users=getUsers();
  if(users.find(u=>u.email.toLowerCase()===email)){ showToast('This email is already registered!','error'); return; }

  const newUser={
    id: Date.now(),
    name: `${firstName} ${lastName}`,
    email,phone,
    password: pass,
    createdAt: new Date().toLocaleDateString('en-GB'),
    createdTime: new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}),
  };
  users.push(newUser);
  saveUsers(users);
  state.currentUser=newUser;
  setSessionUser(newUser);
  updateUserUI();
  document.getElementById('auth-modal').classList.remove('open');
  showToast(`Welcome, ${firstName}! Account created! 🎉`,'success');
});

/* ===== CHATBOT ===== */
const chatWindow=document.getElementById('chat-window');
const chatInput=document.getElementById('chat-input');
const chatMessages=document.getElementById('chat-messages');
document.getElementById('chat-toggle')?.addEventListener('click',()=>{
  const s=getSettings();
  if(s.chatbotActive) chatWindow?.classList.toggle('open');
  else showToast('Chatbot is currently disabled','info');
});
let chatIdx=0;
function sendChatMessage(){
  const msg=chatInput?.value.trim(); if(!msg) return;
  appendChatMsg(msg,'user'); chatInput.value='';
  setTimeout(()=>{ appendChatMsg(chatResponses[chatIdx%chatResponses.length],'bot'); chatIdx++; },800);
}
function appendChatMsg(text,type){
  if(!chatMessages) return;
  const div=document.createElement('div');
  div.className=`chat-msg ${type}`;
  div.innerHTML=`${type==='bot'?'<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#00d4ff,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:0.8rem;flex-shrink:0">🤖</div>':''}<div class="chat-bubble">${text}</div>`;
  chatMessages.appendChild(div); chatMessages.scrollTop=chatMessages.scrollHeight;
}
document.getElementById('chat-send')?.addEventListener('click',sendChatMessage);
chatInput?.addEventListener('keydown',(e)=>{ if(e.key==='Enter') sendChatMessage(); });
document.querySelector('.chatbot-window .modal-close')?.addEventListener('click',()=>chatWindow?.classList.remove('open'));

/* ===== TOAST ===== */
function showToast(message,type='info'){
  const container=document.getElementById('toast-container');
  if(!container) return;
  const toast=document.createElement('div');
  const icons={success:'✓',error:'✕',info:'ℹ'};
  toast.className=`toast toast-${type}`;
  toast.innerHTML=`<span>${icons[type]}</span> ${message}`;
  container.appendChild(toast);
  requestAnimationFrame(()=>requestAnimationFrame(()=>toast.classList.add('show')));
  setTimeout(()=>{ toast.classList.remove('show'); setTimeout(()=>toast.remove(),400); },3500);
}

/* ===== NOTIFICATIONS ===== */
const notifMessages=[
  {title:'🔥 Flash Sale Alert!',text:'iPhone 16 Pro Max — 12% OFF today only!'},
  {title:'📦 Just Delivered!',text:"Kasun's Samsung S25 Ultra was delivered!"},
  {title:'⚡ Limited Stock!',text:'Only 3 units left of Google Pixel 9 Pro!'},
  {title:'🎁 New Arrival!',text:'Nothing Phone (3) now in stock!'},
  {title:'💰 Special Offer!',text:'0% EMI available on orders above Rs. 50,000!'},
];
let notifIdx=0;
function showNotification(){
  const popup=document.getElementById('notif-popup');
  if(!popup) return;
  const n=notifMessages[notifIdx%notifMessages.length]; notifIdx++;
  document.getElementById('notif-title').textContent=n.title;
  document.getElementById('notif-text').textContent=n.text;
  popup.classList.add('show'); setTimeout(()=>popup.classList.remove('show'),4500);
}
function startNotifications(){ setTimeout(showNotification,3500); setInterval(showNotification,13000); }
document.getElementById('notif-close')?.addEventListener('click',()=>document.getElementById('notif-popup')?.classList.remove('show'));

/* ===== NEWSLETTER ===== */
document.getElementById('newsletter-form')?.addEventListener('submit',(e)=>{
  e.preventDefault(); showToast("Subscribed! You'll get the best deals. 📧",'success'); e.target.reset();
});

/* ===== BACK TO TOP ===== */
document.querySelector('.back-to-top')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ===== WISHLIST BTN ===== */
document.getElementById('wishlist-btn')?.addEventListener('click',()=>
  showToast(`You have ${state.wishlist.length} item${state.wishlist.length!==1?'s':''} in your wishlist ❤️`,'info')
);

/* ===== SCROLL REVEAL ===== */
function observeReveal(){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach((entry,i)=>{ if(entry.isIntersecting){ setTimeout(()=>entry.target.classList.add('visible'),i*60); io.unobserve(entry.target); } });
  },{threshold:0.08});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));
}

/* ===== INIT ===== */
function init(){
  const s=getSettings();
  document.title=`${s.siteName} — Premium Smartphone Store`;
  renderCategories(); renderFlashProducts(); renderProducts();
  renderTrending(); renderTestimonials(); updateCartUI();
  loadUserSession();
  setTimeout(observeReveal,100);
}

document.addEventListener('DOMContentLoaded',init);
