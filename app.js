
const units = [
  {
    id: 1,
    name: "Ichigo Kurosaki - Final Getsuga Tenshou",
    attribute: "Power",
    rarity: "6★",
    image: "https://via.placeholder.com/100x100?text=Ichigo"
  },
  {
    id: 2,
    name: "Rukia Kuchiki - Bankai",
    attribute: "Speed",
    rarity: "6★",
    image: "https://via.placeholder.com/100x100?text=Rukia"
  },
  {
    id: 3,
    name: "Byakuya Kuchiki - TYBW",
    attribute: "Mind",
    rarity: "6★",
    image: "https://via.placeholder.com/100x100?text=Byakuya"
  }
];

const unitList = document.getElementById("unit-list");
let ownedUnits = JSON.parse(localStorage.getItem("bbs_owned_units")) || [];

function toggleUnit(id) {
  if (ownedUnits.includes(id)) {
    ownedUnits = ownedUnits.filter(uid => uid !== id);
  } else {
    ownedUnits.push(id);
  }
  localStorage.setItem("bbs_owned_units", JSON.stringify(ownedUnits));
  renderUnits();
}

function renderUnits() {
  unitList.innerHTML = "";
  units.forEach(unit => {
    const div = document.createElement("div");
    div.className = \`rounded-xl shadow p-4 flex items-center gap-4 border-2 cursor-pointer transition \${ownedUnits.includes(unit.id) ? "border-green-500 bg-green-50" : "border-gray-300"}\`;
    div.onclick = () => toggleUnit(unit.id);

    div.innerHTML = \`
      <img src="\${unit.image}" alt="\${unit.name}" class="w-16 h-16 rounded object-cover" />
      <div>
        <div class="font-semibold">\${unit.name}</div>
        <div class="text-sm text-gray-600">\${unit.attribute} • \${unit.rarity}</div>
      </div>
    \`;
    unitList.appendChild(div);
  });
}

renderUnits();
