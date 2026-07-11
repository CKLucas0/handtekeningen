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

var items = [];
for (let i = 0; i < 100; i++) {make_item();}