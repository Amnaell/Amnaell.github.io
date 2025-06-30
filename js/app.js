
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("unit-list");

  units.forEach(unit => {
    const card = document.createElement("div");
    card.className = "unit-card border-2 rounded p-2 text-center text-white bg-gray-800 hover:bg-gray-700 transition";
    card.innerHTML = `
      <img src="${unit.image}" alt="${unit.name}" class="w-full rounded mb-1" />
      <div class="text-sm font-semibold">${unit.name}</div>
      <div class="text-xs text-gray-400">${unit.attribute} • ${unit.rarity}</div>
    `;
    container.appendChild(card);
  });
});
