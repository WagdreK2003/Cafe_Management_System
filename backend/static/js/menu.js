// Menu management page logic
window.onload = function() {
  const form = document.getElementById('add-item-form');
  const itemsDiv = document.getElementById('existing-menu-items');
  function renderItems() {
    itemsDiv.innerHTML = '';
    menuData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item-card';
      card.innerHTML = `<img src='${item.image}' alt='${item.name}'><h4>${item.name}</h4><p>$${item.price.toFixed(2)}</p><p>${item.description}</p>`;
      itemsDiv.appendChild(card);
    });
  }
  renderItems();
  form.onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const image = document.getElementById('itemImage').value;
    const category = document.getElementById('itemCategory').value;
    menuData.push({ id: menuData.length+1, name, price, image, category, description: '' });
    renderItems();
    form.reset();
  };
};
