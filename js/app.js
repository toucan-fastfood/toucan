async function loadMenu() {
  const res = await fetch('data/foods.json');
  const foods = await res.json();
  const menuDiv = document.getElementById('menu');
  foods.forEach(food => {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = 'foods/' + food.fa_name + '.jpg';
    img.alt = food.fa_name;
    const title = document.createElement('h3');
    title.textContent = food.fa_name;
    const ing = document.createElement('p');
    ing.textContent = food.ingredients;
    const price = document.createElement('p');
    price.textContent = food.price ? food.price + ' تومان' : '---';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'افزودن به سفارش';
    btn.onclick = () => addToOrder(food);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(ing);
    card.appendChild(price);
    card.appendChild(btn);
    menuDiv.appendChild(card);
  });
}

let order = [];

function addToOrder(food) {
  order.push(food.fa_name);
  renderOrder();
}

function renderOrder() {
  const list = document.getElementById('order-list');
  list.innerHTML = '';
  order.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

document.getElementById('submit-order').onclick = () => {
  if (order.length === 0) {
    alert('سفارشی انتخاب نشده است');
    return;
  }
  const message = 'سفارش جدید:%0A' + order.join('%0A');
  const phone = '+989125497421';
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
};

loadMenu();
