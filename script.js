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
    "Sport", "Actors", 
  ]
  return categorys[Math.floor(Math.random()*categorys.length)]
}
function make_item() {
  items.push({sign:randomName(),...randomproduct(),...randomprice(),cond:randomcondition(),photo:randomImage(), category:randomcategory()});
}
var items = [];
for (let i = 0; i < 10; i++) {make_item();}

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
document.getElementById('sell-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('f-photo').files[0];
  if (!file) {
    document.getElementById('photo-slot-label').style.borderColor = 'red';
    return; // stop here, don't publish
  }
  const photoData = await readFileAsDataURL(file);
  const newItem = {
    sign: document.getElementById('f-sign').value || 'Unsigned',
    product: document.getElementById('f-title').value,
    price: Number(document.getElementById('f-price').value) || 0,
    size: document.getElementById('f-size').value || '',
    cond: document.getElementById('f-condition').value,
    category: document.getElementById("f-condition"),
    photo: photoData,
  };
  items.unshift(newItem);
  renderGrid();
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