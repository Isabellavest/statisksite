const id = new URLSearchParams(location.search).get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(url)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(p) {
  // billede
  const img = document.querySelector(".product-page-media img");
  img.src = `https://kea-alt-del.dk/t7/images/webp/640/${p.id}.webp`;
  img.alt = p.productdisplayname;

  // titel + brand
  document.querySelector(".product-title").textContent = p.productdisplayname;
  document.querySelector(".product-meta").textContent = `Brand: ${p.brandname}`;

  // pris
  const now = document.querySelector(".price-now");
  const old = document.querySelector(".price-old");

  const hasDiscount = p.discount && Number(p.discount) > 0;
  const newPrice = hasDiscount
    ? Math.round(p.price * (1 - p.discount / 100))
    : p.price;

  now.textContent = `${newPrice} kr.`;
  old.textContent = `${p.price} kr.`;
  old.style.display = hasDiscount ? "inline" : "none";

  // lagerstatus
  const status = document.querySelector(".status");
  status.textContent = p.soldout ? "Sold out" : "På lager";
  status.classList.toggle("out", p.soldout);
  status.classList.toggle("in", !p.soldout);
}
