const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Helpers
function $(selector) {
  return document.querySelector(selector);
}

function setText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value;
}

function show(selector) {
  const el = $(selector);
  if (el) el.style.display = "";
}

function hide(selector) {
  const el = $(selector);
  if (el) el.style.display = "none";
}

if (!id) {
  setText(
    ".product-title",
    "Mangler ?id= i URL (fx productdetails.html?id=1163)",
  );
  hide(".price");
} else {
  fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((product) => {
      if (!product) {
        setText(".product-title", "Produkt findes ikke");
        return;
      }

      // Title + brand
      setText(".product-title", product.productdisplayname || "Produkt");
      setText(".product-meta", `Brand: ${product.brandname || "-"}`);

      // Image
      const img = $(".product-page-media img");
      if (img) {
        img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
        img.alt = product.productdisplayname || "Produktbillede";
      }

      setText(
        ".product-desc",
        product.description || "Ingen beskrivelse endnu.",
      );

      // Price + discount
      const priceNowEl = $(".price-now");
      const priceOldEl = $(".price-old");

      // product.discount
      if (product.discount && Number(product.discount) > 0) {
        const newPrice = Math.round(
          product.price - (product.price * product.discount) / 100,
        );

        if (priceNowEl) priceNowEl.textContent = `${newPrice} kr.`;
        if (priceOldEl) {
          priceOldEl.textContent = `${product.price} kr.`;
          priceOldEl.style.display = "inline";
        }
      } else {
        if (priceNowEl) priceNowEl.textContent = `${product.price} kr.`;
        if (priceOldEl) priceOldEl.style.display = "none";
      }

      // Stock status
      const status = $(".status");
      if (status) {
        const isSoldOut = !!product.soldout;
        status.textContent = isSoldOut ? "Sold out" : "På lager";
        status.classList.toggle("out", isSoldOut);
        status.classList.toggle("in", !isSoldOut);
      }

      // Specs
      const specs = $(".specs");
      if (specs) {
        specs.innerHTML = `
          <li>Category: ${product.category || "-"}</li>
          <li>Type: ${product.articletype || "-"}</li>
          <li>Season: ${product.season || "-"}</li>
        `;
      }
    })
    .catch((err) => {
      console.error(err);
      setText(
        ".product-title",
        "Kunne ikke hente produktet (tjek id / netværk)",
      );
    });
}
