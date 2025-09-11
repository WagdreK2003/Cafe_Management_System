// Inventory page logic
window.onload = function() {
  const tbody = document.getElementById('inventory-table-body');
  inventoryData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.name}</td><td>${item.quantity} / ${item.maxQuantity} ${item.unit}</td><td>${item.status}</td>`;
    tbody.appendChild(row);
  });
};