// Génération dynamique du tableau units avec 772 unités (exemple d'attributs en boucle)
const baseImageUrl = "https://amnaell.github.io/Images/";

const attributes = ["Force", "Instinct", "Connaissance", "Technique", "Vitesse"];
const units = [];

for (let i = 1; i <= 772; i++) {
  const id = i;
  const num = String(i).padStart(3, "0");
  // Exemple : attribut choisi en fonction de l'index (à remplacer par tes vrais données)
  const attribute = attributes[(i - 1) % attributes.length];

  units.push({
    id,
    name: num,
    attribute,
    rarity: "6★",
    image: `${baseImageUrl}${num}.png`
  });
}

// 🧠 Chargement des unités possédées depuis localStorage
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
