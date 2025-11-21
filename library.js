const listZat = [
  { id: "h", nama: "H (Hidrogen)" },
  { id: "o", nama: "O (Oksigen)" },
  { id: "na", nama: "Na (Natrium)" },
  { id: "cl", nama: "Cl (Klorin)" },
  { id: "c", nama: "C (Karbon)" },
  { id: "h2o", nama: "H₂O (Air)" },
  { id: "h2o2", nama: "H₂O₂ (Hidrogen Peroksida)" },
  { id: "garam", nama: "NaCl (Garam Dapur)" },
  { id: "co2", nama: "CO₂ (Karbon Dioksida)" },
  { id: "co", nama: "CO (Karbon Monoksida)" },
  { id: "gula", nama: "C6H12O6 (Gula)" },
  { id: "h2co3", nama: "H2CO3 (Asam Karbonat)" },
  { id: "etanol", nama: "C2H5OH (Etanol)" },
  { id: "naoh", nama: "NaOH (Natrium Hidroksida)" },
  { id: "naocl", nama: "NaOCL (Natrium Hipoklorit)" },
  { id: "na2co3", nama: "Na2CO3 (Natrium Karbonat)" },
  { id: "chcl3", nama: "CHCl3 (Kloroform)" },
  { id: "cocl2", nama: "COCl2 (Fosgen)" },
];

// panel DOM
const listPanel = document.getElementById("library-list");
const detailPanel = document.getElementById("library-detail");

// Buat tombol list kiri
listZat.forEach(item => {
  const btn = document.createElement("button");
  btn.className = "lib-item";
  btn.textContent = item.nama;

 btn.addEventListener("click", () => {
  muatDetail(item.id, item.nama);
});

  listPanel.appendChild(btn);
});

// Load detail JSON ke panel kanan
function muatDetail(id, nama) {
  fetch(`funFactCard/${id}.json`)
    .then(res => res.json())
    .then(data => {
      detailPanel.innerHTML = `
        <h2>${nama}</h2>
        ${data.img ? `<img src="${data.img}" class="lib-img">` : ""}
        <p>${data.funfact}</p>
      `;
    });
}
