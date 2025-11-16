// Daftar unsur dan reaksi sederhana
const unsurList = ["H", "O", "Na", "Cl", "C"];
const reaksi = [
  { gabungan: ["H","O"], hasil: "H₂O (Air)" },
  { gabungan: ["Na","Cl"], hasil: "NaCl (Garam Dapur)" },
  { gabungan: ["C","O"], hasil: "CO₂ (Karbon Dioksida)" },
  { gabungan: ["C","H","O"], hasil: "C6H12O6 (Gula)" }
];


// Memuat unsur ke tampilan
const unsurContainer = document.querySelector(".unsur-list");
unsurList.forEach(u => {
  const div = document.createElement("div");
  div.className = "unsur";
  div.draggable = true;
  div.textContent = u;
  div.addEventListener("dragstart", dragStart);
  unsurContainer.appendChild(div);
});

let selected = [];

// Fungsi saat unsur diseret
function dragStart(e) {
  e.dataTransfer.setData("unsur", e.target.textContent);
  const slotContainer = document.querySelector(".tabung-reaksi-container");
slotContainer.addEventListener("dragover", e => e.preventDefault());
slotContainer.addEventListener("drop", dropUnsur);
}

let slots = ["", "", ""]; // 3 slot kosong

function dropUnsur(e) {
  e.preventDefault();
  const unsur = e.dataTransfer.getData("unsur");
  
  const index = slots.findIndex(s => s === "");
  if(index !== -1){
    slots[index] = unsur;
    document.getElementById(`slot${index+1}`).textContent = unsur;
  }
}
document.getElementById("campurBtn").addEventListener("click", () => {
  periksaReaksi(slots);
  
  // Kosongkan slot setelah reaksi
  slots = ["", "", ""];
  for(let i=1;i<=3;i++){
    document.getElementById(`slot${i}`).textContent = `Slot ${i}`;
  }
});


function periksaReaksi(selectedSlots) {
  const hasilDiv = document.getElementById("hasil");
  
  const filtered = selectedSlots.filter(s => s !== ""); // buang slot kosong
  
  let matched = reaksi.find(r => {
    if(r.gabungan.length !== filtered.length) return false;
    return r.gabungan.every(u => filtered.includes(u));
  });
  
  if(matched){
    hasilDiv.textContent = `💥 Hasil: ${matched.hasil}!`;
  } else {
    hasilDiv.textContent = "😅 Tidak bereaksi, coba kombinasi lain!";
  }
}

