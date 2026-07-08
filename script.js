/*need to make this automated, so that the price is random between 20 and 300 and the name and image is random*/

function randomprice(){
  return Math.floor(Math.random() * 280) + 20;
}
const items = [
  {brand:"Carhartt WIP",item:"Detroit jacket",price:42,was:68,size:"M",cond:"Good",tag:"−38%"},
  {brand:"Levi's",item:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {brand:"Arc'teryx",item:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {brand:"COS",item:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {brand:"Dr. Martens",item:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {brand:"Uniqlo",item:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Patagonia",item:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {brand:"Ganni",item:"Printed midi skirt",price:29,was:45,size:"S",cond:"Like new",tag:"−30%"},
  {brand:"Stüssy",item:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {brand:"Acne Studios",item:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {brand:"Carhartt WIP",item:"Detroit jacket",price:42,was:68,size:"M",cond:"Good",tag:"−38%"},
  {brand:"Levi's",item:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {brand:"Arc'teryx",item:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {brand:"COS",item:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {brand:"Dr. Martens",item:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {brand:"Uniqlo",item:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Patagonia",item:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {brand:"Ganni",item:"Printed midi skirt",price:randomprice(),size:"S",cond:"Like new"},
  {brand:"Stüssy",item:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {brand:"Acne Studios",item:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {brand:"Carhartt WIP",item:"Detroit jacket",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Levi's",item:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {brand:"Arc'teryx",item:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {brand:"COS",item:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {brand:"Dr. Martens",item:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {brand:"Uniqlo",item:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Patagonia",item:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {brand:"Ganni",item:"Printed midi skirt",price:29,was:45,size:"S",cond:"Like new",tag:"−30%"},
  {brand:"Stüssy",item:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {brand:"Acne Studios",item:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {brand:"Carhartt WIP",item:"Detroit jacket",price:randomprice(),size:"M",cond:"Good",},
  {brand:"Levi's",item:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {brand:"Arc'teryx",item:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {brand:"COS",item:"Wool crewneck",price:randomprice(),size:"S",cond:"Good",tag:"−38%"},
  {brand:"Dr. Martens",item:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {brand:"Uniqlo",item:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Patagonia",item:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {brand:"Ganni",item:"Printed midi skirt",price:29,was:45,size:"S",cond:"Like new",tag:"−30%"},
  {brand:"Stüssy",item:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {brand:"Acne Studios",item:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {brand:"Carhartt WIP",item:"Detroit jacket",price:42,was:68,size:"M",cond:"Good",tag:"−38%"},
  {brand:"Levi's",item:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {brand:"Arc'teryx",item:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {brand:"COS",item:"Wool crewneck",price:18,was:29,size:"S",cond:"Good",tag:"−38%"},
  {brand:"Dr. Martens",item:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {brand:"Uniqlo",item:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Patagonia",item:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {brand:"Ganni",item:"Printed midi skirt",price:29,was:45,size:"S",cond:"Like new",tag:"−30%"},
  {brand:"Stüssy",item:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {brand:"Acne Studios",item:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
  {brand:"Carhartt WIP",item:"Detroit jacket",price:42,was:68,size:"M",cond:"Good",tag:"−38%"},
  {brand:"Levi's",item:"501 straight jeans",price:randomprice(),size:"32/32",cond:"Very good"},
  {brand:"Arc'teryx",item:"Beta rain shell",price:randomprice(),size:"L",cond:"Like new"},
  {brand:"COS",item:"Wool crewneck",price:randomprice(),size:"S",cond:"Good"},
  {brand:"Dr. Martens",item:"1460 boots",price:randomprice(),size:"EU42",cond:"Very good"},
  {brand:"Uniqlo",item:"Fleece pullover",price:randomprice(),size:"M",cond:"Good"},
  {brand:"Patagonia",item:"Better Sweater vest",price:randomprice(),size:"L",cond:"Very good"},
  {brand:"Ganni",item:"Printed midi skirt",price:29,was:45,size:"S",cond:"Like new",tag:"−30%"},
  {brand:"Stüssy",item:"Logo cap",price:randomprice(),size:"One size",cond:"Good"},
  {brand:"Acne Studios",item:"Wool scarf",price:randomprice(),size:"One size",cond:"Very good"},
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