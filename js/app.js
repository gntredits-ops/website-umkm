"use strict";

console.log("P10 JavaScript aktif");

const produkUmkm = [
  
  { nama: "Kopi Tubruk Signature", kategori: "Kopi", harga: 18000, stok: 12, unggulan: true },
  { nama: "Cold Brew Aren", kategori: "Kopi", harga: 22000, stok: 0, unggulan: false },
  { nama: "Kopi Susu Nusa", kategori: "Kopi", harga: 20000, stok: 8, unggulan: false },
  { nama: "Kopi Matcha Latte", kategori: "Kopi", harga: 25000, stok: 2, unggulan: false },

  { nama: "Paket Seduh Rumahan", kategori: "Bundling", harga: 85000, stok: 10, unggulan: false },
  { nama: "Paket Kantor Mingguan", kategori: "Bundling", harga: 150000, stok: 4, unggulan: false },
  { nama: "Paket Tester Pelanggan Baru", kategori: "Bundling", harga: 45000, stok: 15, unggulan: false },

  { nama: "Tumbler Kopi Nusa 350 ml", kategori: "Aksesori", harga: 75000, stok: 9, unggulan: false },
  { nama: "Gelas Keramik Kopi Nusa", kategori: "Aksesori", harga: 35000, stok: 0, unggulan: false },
  { nama: "Totebag Kopi Nusa", kategori: "Aksesori", harga: 40000, stok: 3, unggulan: false },

  { nama: "Roti Bakar Cokelat Keju", kategori: "Makanan", harga: 15000, stok: 20, unggulan: false },
  { nama: "Pisang Goreng Madu", kategori: "Makanan", harga: 12000, stok: 5, unggulan: false },
  { nama: "Croissant Butter", kategori: "Makanan", harga: 18000, stok: 0, unggulan: false },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) return { label: "Habis", className: "empty" };
  if (stok <= 5) return { label: "Stok terbatas", className: "warning" };
  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${labelKategori(produk.kategori)}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

function renderProduk() {

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);

  stock.classList.add("stock-badge");

  if (status.className) {
    stock.classList.add(status.className);
  }

  stock.textContent = status.label;

  card.append(title, category, price, stock);

  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");

  empty.classList.add("empty-state");
  empty.textContent =
    `Belum ada produk pada kategori ${kategori}.`;

  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter(
        (produk) => produk.kategori === kategoriAktif
      );

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent =
    `${produkTampil.length} produk ditampilkan.`;
}

renderProduk();

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
    });

    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});
}

document.addEventListener("DOMContentLoaded", renderProduk);

document.addEventListener("DOMContentLoaded", function () {

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");

            const menuTerbuka =
                navMenu.classList.contains("active");

            navToggle.setAttribute(
                "aria-expanded",
                menuTerbuka ? "true" : "false"
            );
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

});