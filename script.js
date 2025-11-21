// Daftar unsur dan reaksi sederhana
const unsurList = ["H", "O", "Na", "Cl", "C"];
const reaksi = [
  {
    gabungan: ["H", "O"],
    hasil: [
      { nama: "H₂O (Air)", json: "funFactCard/h2o.json" },
      { nama: "H₂O₂ (Hidrogen Peroksida)", json: "funFactCard/h2o2.json" }
    ]
  },
  {
    gabungan: ["H", "Cl"],
    hasil: [
      { nama: "HCl (Asam Klorida)", json: "funFactCard/hcl.json" }
    ]
  },
  {
    gabungan: ["C", "H"],
    hasil: [
      { nama: "CH₄ (Metana)", json: "funFactCard/ch4.json" }
    ]
  },
  {
    gabungan: ["C", "Cl"],
    hasil: [
      { nama: "CCl₄ (Karbon Tetraklorida)", json: "funFactCard/ccl4.json" }
    ]
  },
  {
    gabungan: ["Na", "Cl"],
    hasil: [
      { nama: "NaCl (Garam Dapur)", json: "funFactCard/garam.json" }
    ]
  },
  {
    gabungan: ["C", "O"],
    hasil: [
      { nama: "CO₂ (Karbon Dioksida)", json: "funFactCard/co2.json" },
      { nama: "CO (Karbon Monoksida)", json: "funFactCard/co.json" }
    ]
  },
  { gabungan: ["C", "H", "O"], hasil: [
    { nama: "C6H12O6 (Gula)", json: "funFactCard/gula.json" },
    { nama: "H₂CO₃ (Asam Karbonat)", json: "funFactCard/h2co3.json" },
    { nama: "C₂H₅OH (Etanol)", json: "funFactCard/etanol.json" }
  ]
  },
  { gabungan: ["Na", "H", "O"], hasil: [
    { nama: "NaOH (Natrium Hidroksida)", json: "funFactCard/naoh.json" }
  ]
  },
  { gabungan: ["Na", "Cl", "O"], hasil: [
    { nama: "NaOCl (Natrium Hipoklorit)", json: "funFactCard/naocl.json" }
  ]
  },
  { gabungan: ["C", "Na", "O"], hasil: [
    { nama: "Na₂CO₃ (Natrium Karbonat)", json: "funFactCard/na2co3.json" }
  ]
  },
  { gabungan: ["C", "H", "Cl"], hasil: [
    { nama: "CHCl₃ (Kloroform)", json: "funFactCard/chcl3.json" }
  ]
  },
  { gabungan: ["C", "Cl", "O"], hasil: [
    { nama: "COCl₂ (Fosgen)", json: "funFactCard/cocl2.json" }
  ]
  }
];

// Memuat unsur ke tampilan
const unsurContainer = document.querySelector(".unsur-list");
unsurList.forEach((u) => {
  const div = document.createElement("div");
div.className = "unsur";
div.textContent = u;
div.setAttribute("data-unsur", u);


  // 1️⃣ Drag untuk desktop
  div.draggable = true;
  div.addEventListener("dragstart", dragStart);

  // 3️⃣ Optional: touchstart untuk gesture touch (lebih responsif)
  div.addEventListener("click", () => {
    const index = slots.findIndex((s) => s === "");
    if (index !== -1) {
  slots[index] = u;
  document.getElementById(`slot${index + 1}`).textContent = u;
  disableUnsur(u); // 🔥
}

  });

  unsurContainer.appendChild(div);
});

let selected = [];

// Fungsi saat unsur diseret
function dragStart(e) {
  e.dataTransfer.setData("unsur", e.target.textContent);
  const slotContainer = document.querySelector(".tabung-reaksi-container");
  slotContainer.addEventListener("dragover", (e) => e.preventDefault());
  slotContainer.addEventListener("drop", dropUnsur);
}

let slots = ["", "", ""]; // 3 slot kosong

function disableUnsur(u) {
  const el = document.querySelector(`[data-unsur='${u}']`);
  el.classList.add("disabled");
  el.style.opacity = "0.4";
  el.style.pointerEvents = "none";
}

function enableSemuaUnsur() {
  document.querySelectorAll(".unsur").forEach((el) => {
    el.classList.remove("disabled");
    el.style.opacity = "1";
    el.style.pointerEvents = "auto";
  });
}



function dropUnsur(e) {
  e.preventDefault();
  const unsur = e.dataTransfer.getData("unsur");

  const index = slots.findIndex((s) => s === "");
  if (index !== -1) {
    slots[index] = unsur;
    document.getElementById(`slot${index + 1}`).textContent = unsur;

    disableUnsur(unsur); // 🔥 fitur baru
  }
}

document.getElementById("campurBtn").addEventListener("click", () => {
  periksaReaksi(slots);

  // Kosongkan slot setelah reaksi
  slots = ["", "", ""];
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`slot${i}`).textContent = `Slot ${i}`;
  }
  enableSemuaUnsur(); // 🔥 reset tombol unsur
});

document.getElementById("undoBtn").addEventListener("click", () => {
  // cari slot terakhir yang terisi
  let lastIndex = -1;
  for (let i = slots.length - 1; i >= 0; i--) {
    if (slots[i] !== "") {
      lastIndex = i;
      break;
    }
  }

  if (lastIndex !== -1) {
    const unsur = slots[lastIndex];
    slots[lastIndex] = "";
    document.getElementById(`slot${lastIndex + 1}`).textContent = `Slot ${lastIndex + 1}`;

    // aktifkan kembali unsur
    enableUnsur(unsur);
  }
});

function enableUnsur(u) {
  const el = document.querySelector(`[data-unsur='${u}']`);
  el.classList.remove("disabled");
  el.style.opacity = "1";
  el.style.pointerEvents = "auto";
}


function periksaReaksi(selectedSlots) {
  const hasilDiv = document.getElementById("hasil");
  hasilDiv.innerHTML = ""; // bersihkan hasil sebelumnya

  const filtered = selectedSlots.filter((s) => s !== "");

  let matched = reaksi.find((r) => {
    if (r.gabungan.length !== filtered.length) return false;
    return r.gabungan.every((u) => filtered.includes(u));
  });

  if (matched) {
    hasilDiv.innerHTML = "Hasil pencampuranmu dapat menghasilkan zat ini:<br>";

    matched.hasil.forEach((h) => {
      const btn = document.createElement("button");
      btn.className = "hasilBtn";
      btn.textContent = h.nama;
      btn.style.margin = "5px";
      btn.addEventListener("click", () => {
        fetch(h.json)
          .then((res) => res.json())
          .then((data) => {
            const card = document.getElementById("funfactCard");
            document.getElementById("funfactText").textContent = data.funfact;
            document.getElementById("funfactImg").src = data.img || "";

            // 💥 Tambah bagian untuk ganti warna card
            if (data.color) {
              card.style.background = data.color;
            }

            card.style.display = "block";
          });
      });

      // Tombol close card
      document.getElementById("closeCard").addEventListener("click", () => {
        document.getElementById("funfactCard").style.display = "none";
      });

      hasilDiv.appendChild(btn);
    });
  } else {
    hasilDiv.textContent = "😅 Tidak bereaksi, coba kombinasi lain!";
  }
}
