const supabase = window.supabase.createClient(
  'https://dqslxoozolliqqguauqh.supabase.co',
  'sb_publishable_c6lxpBsRn0htg6BJ61lU7Q_I5tfrQMC'
);

async function loadListings() {
  const { data, error } = await supabase.from('listings').select().order('created_at', { ascending: false });
  if (error) { console.error(error); return; }
  items.length = 0;
  items.push(...data);
  renderGrid();
}
loadListings();
document.querySelectorAll(".photo-slot").forEach(slot => {
  const input = slot.querySelector(".photoInput");
  const preview = slot.querySelector(".preview");
  const plus = slot.querySelector(".plus");

  slot.addEventListener("click", () => input.click());

  input.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
    plus.style.display = "none";
  });
});
const grid = document.getElementById('grid');
function renderGrid(){
  grid.innerHTML = items.map(it => `
    <div class="card">
      <div class="thumb">
        ${it.tag ? `<div class="tag">${it.tag}</div>` : ''}
        <div class="heart">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8A82" stroke-width="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
          </svg>
        </div>
        photo
      </div>
      <div class="info">
        <div class="price">€${it.price}${it.was ? `<span class="was">€${it.was}</span>` : ''}</div>
        <div class="brand">${it.brand}</div>
        <div class="meta">${it.item} · ${it.size} · ${it.cond}</div>
      </div>
    </div>
  `).join('');
}
renderGrid();

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelector('.chip.active').classList.remove('active');
    chip.classList.add('active');
  });
});

// view switching between browse and sell
const browseView = document.getElementById('browse-view');
const sellView = document.getElementById('sell-view');

function showSell(e){
  if(e) e.preventDefault();
  browseView.classList.add('hidden');
  sellView.classList.remove('hidden');
  window.scrollTo(0,0);
}
function showBrowse(e){
  if(e) e.preventDefault();
  sellView.classList.add('hidden');
  browseView.classList.remove('hidden');
  window.scrollTo(0,0);
}

document.getElementById('sell-link').addEventListener('click', showSell);
document.getElementById('back-link').addEventListener('click', showBrowse);
document.getElementById('logo-link').addEventListener('click', showBrowse);

// publishing a new listing
const toast = document.getElementById('toast');
document.getElementById('sell-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const newItem = {
    brand: document.getElementById('f-brand').value || 'Unbranded',
    item: document.getElementById('f-title').value,
    price: Number(document.getElementById('f-price').value) || 0,
    size: document.getElementById('f-size').value || 'One size',
    cond: document.getElementById('f-condition').value,
  };
  items.unshift(newItem);
  renderGrid();

  e.target.reset();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
  showBrowse();
});