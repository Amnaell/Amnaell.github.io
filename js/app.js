const card = document.createElement("div");
card.className = "unit-card ...";
card.innerHTML = `
  <img src="${unit.image}" alt="${unit.name}" class="w-full rounded mb-2" />
  <div class="text-xs font-semibold">${unit.name}</div>
  <div class="text-xs text-gray-400">${unit.attribute} • ${unit.rarity}</div>
`;
