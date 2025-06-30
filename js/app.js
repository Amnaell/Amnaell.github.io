// 🧠 Chargement des unités possédées
let ownedUnits = JSON.parse(localStorage.getItem("bbs_owned_units")) || [];

// 🔄 Cocher/décocher une unité
function toggleUnit(id) {
  if (ownedUnits.includes(id)) {
    ownedUnits = ownedUnits.filter(uid => uid !== id);
  } else {
    ownedUnits.push(id);
  }
  localStorage.setItem("bbs_owned_units", JSON.stringify(ownedUnits));
  renderUnits();
  updateProgress();
}

// 🎨 Génère dynamiquement les cartes des unités
function renderUnits() {
  const container = document.getElementById("unit-list");
  container.innerHTML = "";

  const selectedAttr = document.getElementById("attributeFilter").value;

  const filtered = selectedAttr === "All"
    ? units
    : units.filter(unit => unit.attribute === selectedAttr);

  filtered.forEach(unit => {
    const isSelected = ownedUnits.includes(unit.id);
    const card = document.createElement("div");

    card.className = `unit-card border-2 rounded-xl p-2 cursor-pointer text-center transition ${
      isSelected ? "selected border-green-500" : "border-gray-700"
    }`;

    card.onclick = () => toggleUnit(unit.id);

    card.innerHTML = `
      <img src="${unit.image}" alt="${unit.name}" class="w-full rounded mb-2" />
      <div class="text-xs font-semibold">${unit.name}</div>
      <div class="text-xs text-gray-400">${unit.attribute} • ${unit.rarity}</div>
    `;

    container.appendChild(card);
  });
}

// 📊 Met à jour la barre de progression
function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");

  const total = units.length;
  const owned = ownedUnits.length;
  const percent = total > 0 ? Math.round((owned / total) * 100) : 0;

  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `${owned}/${total} (${percent}%)`;
}

// 🎯 Événement : changement d'attribut
document.getElementById("attributeFilter").addEventListener("change", () => {
  renderUnits();
  updateProgress();
});

// 🚀 Chargement initial
window.addEventListener("DOMContentLoaded", () => {
  renderUnits();
  updateProgress();
});
