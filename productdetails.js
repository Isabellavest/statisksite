const params = new URLSearchParams(location.search);
const id = params.get("id");

const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector(".product-page");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  // billede
  document.querySelector(".product-page-media img").src =
    "https://kea-alt-del.dk/t7/images/webp/640/" + data.id + ".webp";
  document.querySelector(".product-page-media img").alt =
    data.productdisplayname;

  // titel + brand
  document.querySelector(".product-title").textContent =
    data.productdisplayname;
  document.querySelector(".product-meta").textContent =
    "Brand: " + data.brandname;

  // pris (med evt. discount)
  const priceNow = document.querySelector(".price-now");
  const priceOld = document.querySelector(".price-old");

  if (data.discount && Number(data.discount) > 0) {
    const newPrice = Math.round(
      data.price - (data.price * data.discount) / 100,
    );
    priceNow.textContent = newPrice + " kr.";
    priceOld.textContent = data.price + " kr.";
    priceOld.style.display = "inline";
  } else {
    priceNow.textContent = data.price + " kr.";
    if (priceOld) priceOld.style.display = "none";
  }

  // lagerstatus
  const status = document.querySelector(".status");
  status.textContent = data.soldout ? "Sold out" : "På lager";
  status.classList.toggle("out", data.soldout);
  status.classList.toggle("in", !data.soldout);
}

getData();
