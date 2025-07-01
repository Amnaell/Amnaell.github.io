// 🔗 Base URL des images
const baseImageUrl = "https://amnaell.github.io/BBS-Checklist.github.io/Images/";
const attributes = ["Force", "Instinct", "Connaissance", "Technique", "Vitesse"];
const units = [];

// 🔁 Génération dynamique des unités
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

// 🧠 Chargement des unités possédées
let ownedUnits = JSON.parse(localStorage.getItem("bbs_owned_units")) || [];

// ✅ Cocher/décocher une unité
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

// 🧱 Affichage des cartes
function renderUnits() {
  const container = document.getElementById("unit-list");
  container.innerHTML = "";

  units.forEach(unit => {
    const isSelected = ownedUnits.includes(unit.id);
    const card = document.createElement("div");

    card.className = `unit-card border-2 rounded-xl p-2 cursor-pointer text-center transition ${
      isSelected ? "selected border-yellow-500" : "border-gray-700"
    }`;

    card.onclick = () => toggleUnit(unit.id);

    card.innerHTML = `
      <img src="${unit.image}" alt="${unit.name}" class="w-full rounded mb-2" />
    `;

    container.appendChild(card);
  });
}

// 📊 Barre de progression
function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");

  const total = units.length;
  const owned = ownedUnits.length;
  const percent = total > 0 ? Math.round((owned / total) * 100) : 0;

  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `${owned}/${total} (${percent}%)`;
}

// 🔁 Réinitialiser la collection
function resetAll() {
  if (confirm("Souhaites-tu réinitialiser ta collection ?")) {
    ownedUnits = [];
    localStorage.removeItem("bbs_owned_units");
    renderUnits();
    updateProgress();
  }
}

// 💾 Exporter les unités en JSON
function exportCollection() {
  const dataStr = JSON.stringify(ownedUnits);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "bbs_collection.json";
  a.click();
  URL.revokeObjectURL(url);
}

// 📥 Importer une collection
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
        if (Array.isArray(data)) {
          ownedUnits = data;
          localStorage.setItem("bbs_owned_units", JSON.stringify(ownedUnits));
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

// 🚀 Initialisation
window.addEventListener("DOMContentLoaded", () => {
  renderUnits();
  updateProgress();
});
