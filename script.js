const supabaseClient = window.supabase.createClient(
  'https://kvcbnpmqsktjphdjmfrf.supabase.co',
  'sb_publishable_xuPTsxyA9SZ2YcTm0nLyWQ_NMeAXJJ5'
);


function randomName(){
  const randomNames = [
    "ronaldo", "messi", "neymar", "mbappe", "salah", "modric", "kane", "de bruyne", "pogba", "hazard","lewandowski", "suarez", "griezmann", "sterling", "mane", "aguero", "cavani", "dzeko", "higuain", "benzema"
  ];
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}
function randomImage(){
  const images = [
    "placeholder1.png", "placeholder2.png", "placeholder3.png"
  ];
  return images[Math.floor(Math.random() * images.length)];
}
function randomprice(){
  if (Math.floor(Math.random()*10) < 7) {
    return {price: Math.floor(Math.random() * 280) + 20};
  }
  else {
    var oldprice =  Math.floor(Math.random() * 280) + 20
    var discount = (Math.floor(Math.random()*30)+10)/100
    var newprice = oldprice-Math.floor(oldprice * discount)

    return {
      price: newprice,
      was: oldprice,
      tag: `-${Math.round(discount*100)}%`
    }
  }
}
function randomdiscount(){
  if (Math.floor(Math.random()*10) < 7) {
    return false
  }
  else {
    return Math.floor(Math.random()*30)+10
  } 
}
function randomcondition() {
  const conditions = [
    "Brand new with tags","Like new","Very good","Worn"
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
}
function randomproduct() {
  const products = [
    "football","shirt","shorts","sneakers","jacket","hoodie","cap","socks","gloves","scarf"
  ];
  const sizes = ["XS","S","M","L","XL","XXL"];
  var item =  products[Math.floor(Math.random() * products.length)];
  if (item == "shirt" || item == "shorts" || item == "jacket" || item == "hoodie") {
    return {
      product: item,
      size: sizes[Math.floor(Math.random() * sizes.length)]
    };
  }
  else {
    return { product: item };
  }
}
function randomcategory() {
  const categorys = [
    "Sport", "Actors", "Singers", "Other"
  ]
  return categorys[Math.floor(Math.random()*categorys.length)]
}
function make_item() {
  items.push({sign:randomName(),...randomproduct(),...randomprice(),cond:randomcondition(),photo:randomImage(), category:randomcategory()});
}

function resizeImage(file, maxSize = 400) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = URL.createObjectURL(file);
  });
}

var items = [];
for (let i = 0; i < 100; i++) {make_item();}

let chipText = "All"
const grid = document.getElementById('grid');
function renderGrid(category,search){
  let filtereditems;
  if (category == "All") {
    filtereditems = items;
  }
  else {
    filtereditems = items.filter(item => item.category == category);
  }
  filtereditems = filtereditems.filter(item => item.sign.toLowerCase().includes(search.toLowerCase()))
  
  grid.innerHTML = filtereditems.map(it => `
    <div class="card">
      <div class="thumb">
        ${it.tag ? `<div class="tag">${it.tag}</div>` : ''}
        <div class="heart">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8A82" stroke-width="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
          </svg>
        </div>
        <img class="photo_card" src="${it.photo ? it.photo : 'logo black.png'}">
      </div>
      <div class="info">
        <div class="price">€${it.price}${it.was ? `<span class="was">€${it.was}</span>` : ''}</div>
        <div class="sign">${it.sign}</div>
        <div class="meta">${it.product} · ${it.size? `<span class="was">${it.size} ·</span>` : ''}  ${it.cond}</div>
      </div>
    </div>
  `).join('');
}
renderGrid("All",document.getElementById("search-input").value);

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelector('.chip.active').classList.remove('active');
    chip.classList.add('active');

    chipText = chip.textContent;
    renderGrid(chipText,document.getElementById("search-input").value)

  });
});
// view switching between browse and sell
const browseView = document.getElementById('browse-view');
const browseViewSearch = document.getElementById('browse-view-search');
const sellView = document.getElementById('sell-view');
const registerView = document.getElementById('register-view');
const loginView = document.getElementById('login-view');

function hideAllViews(){
  browseView.classList.add('hidden');
  browseViewSearch.classList.add('hidden');
  sellView.classList.add('hidden');
  registerView.classList.add('hidden');
  loginView.classList.add('hidden');
}

function showSell(e){
  if(e) e.preventDefault();
  hideAllViews();
  sellView.classList.remove('hidden');
  window.scrollTo(0,0);
}

function showBrowse(e){
  if(e) e.preventDefault();
  hideAllViews();
  browseView.classList.remove('hidden');
  browseViewSearch.classList.remove('hidden');
  document.getElementById("search-input").value = "";
  window.scrollTo(0,0);
}

function showRegister(e){
  if(e) e.preventDefault();
  hideAllViews();
  registerView.classList.remove('hidden');
  window.scrollTo(0,0);
}

function showLogin(e){
  if(e) e.preventDefault();
  hideAllViews();
  loginView.classList.remove('hidden');
  window.scrollTo(0,0);
}

document.getElementById('sell-link').addEventListener('click', showSell);
document.getElementById('back-link').addEventListener('click', showBrowse);
document.getElementById('logo-link').addEventListener('click', showBrowse);
document.getElementById('login-link').addEventListener('click', showLogin);
document.getElementById('register-back-link').addEventListener('click', showBrowse);
document.getElementById('login-back-link').addEventListener('click', showBrowse);
document.getElementById('go-to-login').addEventListener('click', showLogin);
document.getElementById('go-to-register').addEventListener('click', showRegister);

// sign up
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('r-email').value;
  const password = document.getElementById('r-password').value;

  const { data, error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    alert(error.message);
  } else {
    alert('Account created! Check your email to confirm before logging in.');
    showLogin();
  }
});

// publishing a new listing
const toast = document.getElementById('toast');
document.getElementById('sell-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('f-photo').files[0];
  if (!file) {
    document.getElementById('photo-slot-label').style.borderColor = 'red';
    return; // stop here, don't publish
  }
  const photoData = await resizeImage(file);
  const newItem = {
    sign: document.getElementById('f-sign').value || 'Unsigned',
    product: document.getElementById('f-title').value,
    price: Number(document.getElementById('f-price').value) || 0,
    size: document.getElementById('f-size').value || '',
    cond: document.getElementById('f-condition').value,
    category: document.getElementById("f-category").value,
    photo: photoData,
  };
  items.unshift(newItem);
  renderGrid("All",document.getElementById("search-input").value);
  e.target.reset();
  const slot = document.getElementById('photo-slot-label');
  slot.innerHTML = '+';
  slot.style.backgroundImage = '';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
  showBrowse();
});
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
document.getElementById('f-photo').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const slot = document.getElementById('photo-slot-label');
  slot.style.borderColor = ''; // clear any red warning from a previous failed submit

  if (!file) {
    slot.innerHTML = '+';
    slot.style.backgroundImage = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    slot.innerHTML = '';
    slot.style.backgroundImage = `url(${event.target.result})`;
    slot.style.backgroundSize = 'cover';
    slot.style.backgroundPosition = 'center';
  };
  reader.readAsDataURL(file);
});
document.getElementById('search-input').addEventListener('input', (e) => {
  renderGrid(chipText,e.target.value)
});
async function updateAuthStatus(){
  const { data: { session } } = await supabaseClient.auth.getSession();
  const authStatus = document.getElementById('auth-status');

  if (session) {
    authStatus.innerHTML = `
      <span style="color:var(--stone); font-size:13px; margin-right:10px;">${session.user.email}</span>
      <a href="#" class="sell-back" id="logout-link">Log out</a>
    `;
    document.getElementById('logout-link').addEventListener('click', async (e) => {
      e.preventDefault();
      await supabaseClient.auth.signOut();
      updateAuthStatus();
      showBrowse();
    });
  } else {
    authStatus.innerHTML = `<a href="#" class="sell-back" id="login-link">Log in</a>`;
    document.getElementById('login-link').addEventListener('click', showLogin);
  }
}

updateAuthStatus();
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('l-email').value;
  const password = document.getElementById('l-password').value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
  } else {
    updateAuthStatus();
    showBrowse();
  }
});