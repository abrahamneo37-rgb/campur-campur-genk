// Daftar unsur dan reaksi sederhana
const unsurList = ["H", "O", "Na", "Cl", "C"];
const reaksi = {
  "H+O": "H₂O (Air)",
  "Na+Cl": "NaCl (Garam Dapur)",
  "C+O": "CO₂ (Karbon Dioksida)"
};

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
}

// Area tabung reaksi
const tabung = document.getElementById("tabung");
tabung.addEventListener("dragover", e => e.preventDefault());
tabung.addEventListener("drop", dropUnsur);

function dropUnsur(e) {
  e.preventDefault();
  const unsur = e.dataTransfer.getData("unsur");
  if (unsur) selected.push(unsur);

  if (selected.length === 2) {
    periksaReaksi(selected[0], selected[1]);
    selected = [];
  }
}

function periksaReaksi(u1, u2) {
  const hasilDiv = document.getElementById("hasil");
  const kombinasi1 = `${u1}+${u2}`;
  const kombinasi2 = `${u2}+${u1}`;
  let hasil = reaksi[kombinasi1] || reaksi[kombinasi2];

  if (hasil) {
    hasilDiv.textContent = `💥 Hasil: ${hasil}!`;
  } else {
    hasilDiv.textContent = "😅 Tidak bereaksi, coba kombinasi lain!";
  }
}
