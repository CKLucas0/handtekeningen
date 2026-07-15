const supabaseClient = window.supabase.createClient(
  'https://kvcbnpmqsktjphdjmfrf.supabase.co',
  'sb_publishable_xuPTsxyA9SZ2YcTm0nLyWQ_NMeAXJJ5'
);


function resizeImage(file, maxSize = 400) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8);
    };
    img.src = URL.createObjectURL(file);
  });
}
async function uploadPhoto(blob){
  const fileName = `${Date.now()}.jpg`;

  const { error } = await supabaseClient.storage
    .from('listing-photos')
    .upload(fileName, blob, { contentType: 'image/jpeg' });

  if (error) throw error;

  const { data } = supabaseClient.storage
    .from('listing-photos')
    .getPublicUrl(fileName);

  return data.publicUrl;
}


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
  if (filterValueCond != "All conditions") {
    filtereditems = filtereditems.filter(item => item.cond == filterValueCond);
  }
  if (PriceRangeMin != 0) {
    filtereditems = filtereditems.filter(item => item.price >= PriceRangeMin);
  }
  if (PriceRangeMax != 0) {
    filtereditems = filtereditems.filter(item => item.price <= PriceRangeMax);
  }
  currentItems = filtereditems;
  grid.innerHTML = filtereditems.map((it, index) => `
    <div class="card" data-index="${index}">
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
        var items = [];
        
        async function loadListings(){
          const { data, error } = await supabaseClient
            .from('listings')
            .select('*, profiles(display_name)')
            .order('created_at', { ascending: false });

          if (error){
            console.error(error);
            return;
          }
          items = data;
          renderGrid("All", document.getElementById("search-input").value);
        }
        loadListings();

let currentItems = [];

const modal = document.getElementById('item-modal');

document.getElementById('grid').addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  const index = Number(card.dataset.index);
  const it = currentItems[index];
  if (!it) return;

  document.getElementById('modal-photo').src = it.photo || 'logo black.png';
  document.getElementById('modal-price').innerHTML = `€${it.price}` + (it.was ? ` <span class="was">was €${it.was}</span>` : '');
  document.getElementById('modal-sign').textContent = it.sign;
  document.getElementById('modal-meta').textContent = `${it.product} · ${it.size ? it.size + ' · ' : ''}${it.cond}`;
  document.getElementById('modal-desc').textContent = it.desc || 'No description provided.';
  document.getElementById('modal-publisher-name').textContent = it.profiles?.display_name || 'Unknown seller';

  modal.classList.remove('hidden');
});


document.getElementById('modal-close').addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

let chipText = "All"

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelector('.chip.active').classList.remove('active');
    chip.classList.add('active');

    chipText = chip.textContent;
    renderGrid(chipText,document.getElementById("search-input").value)

  });
});
// filtering values
var filterValueCond = "All conditions";

document.getElementById('filter-condition').addEventListener('change', (e) => {
  filterValueCond = e.target.value;
  renderGrid(chipText, document.getElementById("search-input").value);
});

var PriceRangeMin = 0;
var PriceRangeMax = 0;

document.getElementById('price-min').addEventListener('input', (e) => {
  PriceRangeMin = e.target.value
  if (PriceRangeMin == 0) {
    document.getElementById("price-min").value = ""
    PriceRangeMin = 0
  }
  renderGrid(chipText,document.getElementById("search-input").value)
});

document.getElementById('price-max').addEventListener('input', (e) => {
  PriceRangeMax = e.target.value
  if (PriceRangeMax == 0) {
    document.getElementById("price-max").value = ""
    PriceRangeMax = 0
  }
  renderGrid(chipText,document.getElementById("search-input").value)
});

// view switching between browse and sell
const browseView = document.getElementById('browse-view');
const browseViewSearch = document.getElementById('browse-view-search');
const sellView = document.getElementById('sell-view');
const registerView = document.getElementById('register-view');
const loginView = document.getElementById('login-view');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');

filterToggle.addEventListener('click', () => {
  filterPanel.classList.toggle('hidden');
  filterToggle.classList.toggle('open');
});

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
  
  const username = document.getElementById('r-username').value;
  const email = document.getElementById('r-email').value;
  const password = document.getElementById('r-password').value;

  const { data: existing } = await supabaseClient
    .from('profiles')
    .select('id')
    .eq('display_name', username)
    .maybeSingle();

  if (existing) {
    alert('That display name is already taken. Please choose another.');
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email, password,
    options: { data: { display_name: username } }
  });
  

  if (error) {
    alert(error.message);
    return;
  }

  alert('Account created! Check your email to confirm before logging in.');
  showLogin();
});
// publishing a new listing
document.getElementById('sell-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('f-photo').files[0];
  if (!file) {
    document.getElementById('photo-slot-label').style.borderColor = 'red';
    return;
  }

  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    alert('Please log in to publish a listing.');
    showLogin();
    return;
  }

  const resizedBlob = await resizeImage(file);
  const photoData = await uploadPhoto(resizedBlob);

  const newItem = {
    sign: document.getElementById('f-sign').value || 'Unsigned',
    product: document.getElementById('f-title').value,
    price: Number(document.getElementById('f-price').value) || 0,
    size: document.getElementById('f-size').value || '',
    cond: document.getElementById('f-condition').value,
    category: document.getElementById("f-category").value,
    photo: photoData,
    user_id: session.user.id,
    desc: document.getElementById('f-desc').value,  
  };

  const { error } = await supabaseClient.from('listings').insert(newItem);

  if (error) {
    alert('Something went wrong: ' + error.message);
    return;
  }

  await loadListings();
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
  const DisplayName = session.user.user_metadata.display_name || session.user.email;

  authStatus.innerHTML = `
    <span style="color:var(--stone); font-size:13px; margin-right:10px;">${DisplayName}</span>
    <a href="#" class="sell-back" id="logout-link">Log out</a>
  `;

  document.getElementById('logout-link').addEventListener('click', async (e) => {
    e.preventDefault();
    await supabaseClient.auth.signOut();
    updateAuthStatus();
    showBrowse();
  });
  }
  else {
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