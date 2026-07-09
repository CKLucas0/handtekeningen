/*need to make this automated, so that the price is random between 20 and 300 and the name and image is random*/

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
  return Math.floor(Math.random() * 280) + 20;
}

function randomdiscount(){
  if (Math.floor(Math.random()*10) < 7) {
    return false
  }
  else {
    return `-${Math.floor(Math.random()*30)+10}%`
  } 
}

const items = [
  {sign:"Carhartt WIP",product:"Detroit jacket",price:42,was:68,cond:"Good",tag:"−38%",photo:randomImage()},
  {sign:"Levi's",product:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good",photo:"test.png"},
  {sign:"Arc'teryx",product:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new",photo:"test2.png"},
  {sign:"COS",product:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {sign:"Dr. Martens",product:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {sign:"Uniqlo",product:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {sign:"Patagonia",product:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {sign:"Ganni",product:"Printed midi skirt",price:29,was:45,size:"S",cond:"Like new",tag:"−30%"},
  {sign:"Stüssy",product:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {sign:"Acne Studios",product:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {sign:"Carhartt WIP",product:"Detroit jacket",price:42,was:68,size:"M",cond:"Good",tag:"−38%"},
  {sign:"Levi's",product:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {sign:"Arc'teryx",product:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {sign:"COS",product:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {sign:"Dr. Martens",product:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {sign:"Uniqlo",product:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {sign:"Patagonia",product:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {sign:"Ganni",product:"Printed midi skirt",price:randomprice(),size:"S",cond:"Like new"},
  {sign:"Stüssy",product:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {sign:"Acne Studios",product:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {sign:"Carhartt WIP",product:"Detroit jacket",price:randomprice(),size:"M",cond:"Good"},
  {sign:"Levi's",product:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {sign:"Arc'teryx",product:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {sign:"COS",product:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {sign:"Dr. Martens",product:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
];

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
document.getElementById('sell-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const newItem = {
    sign: document.getElementById('f-sign').value || 'Unsigned',
    product: document.getElementById('f-title').value,
    price: Number(document.getElementById('f-price').value) || 0,
    size: document.getElementById('f-size').value || 'no size',
    cond: document.getElementById('f-condition').value,
  };
  items.unshift(newItem);
  renderGrid();

  e.target.reset();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
  showBrowse();
});