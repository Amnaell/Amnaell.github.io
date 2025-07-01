const baseImageUrl = "https://amnaell.github.io/BBS-Checklist.github.io/Images/";
const attributes = ["Force", "Instinct", "Connaissance", "Technique", "Vitesse"];
const units = [];

// Génération dynamique des unités
for (let i = 1; i <= 772; i++) {
  const id = i;
  const num = String(i).padStart(3, "0");
  const attribute = attributes[(i - 1) % attributes.length];
  units.push({
    id,
    name: num,
    attribute,
    rarity: "6★",
    image: `${baseImageUrl}${num}.png`
  });
}

// 📦 Chargement des états depuis localStorage
let state = JSON.parse(localStorage.getItem("bbs_unit_state")) || {};

// 🔁 Sauvegarde
function saveState() {
  localStorage.setItem("bbs_unit_state", JSON.stringify(state));
}

// 🎯 Gestion du mode actif : normal, ft ou spe
let currentMode = "default";

function setMode(mode) {
  currentMode = mode;
  alert(`Mode activé : ${mode === "default" ? "Normal" : mode.toUpperCase()}`);
}

// ✅ Clic sur un personnage
function toggleUnit(id) {
  if (!state[id]) state[id] = { owned: false, ft: false, spec: 1 };
  state[id].owned = !state[id].owned;
  saveState();
  renderUnits();
  updateProgress();
}

// 🎮 Toggle FT
function toggleFT(id) {
  if (!state[id]) state[id] = { owned: false, ft: false, spec: 1 };
  state[id].ft = !state[id].ft;
  saveState();
  renderUnits();
}

// 🎮 Incrémentation spé
function incrementSpec(id) {
  if (!state[id]) state[id] = { owned: false, ft: false, spec: 1 };
  state[id].spec = state[id].spec >= 5 ? 1 : state[id].spec + 1;
  saveState();
  renderUnits();
}

// 🧱 Affichage des cartes
function renderUnits() {
  const container = document.getElementById("unit-list");
  container.innerHTML = "";

  units.forEach(unit => {
    const unitState = state[unit.id] || { owned: false, ft: false, spec: 1 };
    const card = document.createElement("div");

    card.className = `unit-card cursor-pointer ${
      unitState.owned ? "selected" : ""
    } ${unitState.ft ? "ft" : ""}`;

    // Gère le clic en fonction du mode actuel
    card.onclick = () => {
      if (currentMode === "ft") {
        toggleFT(unit.id);
      } else if (currentMode === "spe") {
        incrementSpec(unit.id);
      } else {
        toggleUnit(unit.id);
      }
    };

    const badge = unitState.owned ? `<span class="spe-badge">${unitState.spec}</span>` : "";

    card.innerHTML = `
      <img src="${unit.image}" alt="${unit.name}" class="mb-1" />
      ${badge}
    `;

    container.appendChild(card);
  });
}

// 📊 Barre de progression
function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");

  const total = units.length;
  const owned = Object.values(state).filter(u => u.owned).length;
  const percent = total > 0 ? Math.round((owned / total) * 100) : 0;

  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `${owned}/${total} (${percent}%)`;
}

// 🔄 Reset
function resetAll() {
  if (confirm("Souhaites-tu réinitialiser ta collection ?")) {
    state = {};
    saveState();
    renderUnits();
    updateProgress();
  }
}

// 📤 Export
function exportCollection() {
  const dataStr = JSON.stringify(state);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "bbs_collection.json";
  a.click();
  URL.revokeObjectURL(url);
}

// 📥 Import
function importCollection() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = JSON.parse(event.target.result);
        if (typeof data === "object") {
          state = data;
          saveState();
          renderUnits();
          updateProgress();
        } else {
          alert("Fichier invalide.");
        }
      } catch (e) {
        alert("Erreur lors de l'import.");
      }
    };
    reader.readAsText(file);
  });

  input.click();
}

// 📷 Générer une image PNG du site
function generateImage() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement("a");
    link.download = "bbs_checklist.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// 🚀 Init
window.addEventListener("DOMContentLoaded", () => {
  renderUnits();
  updateProgress();
});
