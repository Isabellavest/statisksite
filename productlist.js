const params = new URLSearchParams(location.search);
const category = params.get("category");

const listURL =
  "https://kea-alt-del.dk/t7/api/products?category=" + category + "&limit=9";
const listContainer = document.querySelector(".products");

function getProducts() {
  fetch(listURL).then((res) =>
    res.json().then((products) => showProducts(products)),
  );
}

function showProducts(products) {
  listContainer.innerHTML = "";

  products.forEach((product) => {
    listContainer.innerHTML += `
  <article class="product-card ${product.soldout ? "soldout" : ""}">
    <a href="productdetails.html?id=${product.id}">
      ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ""}
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
      <h3>${product.productdisplayname}</h3>

      <p class="price">
        ${
          product.discount
            ? `<span class="old-price">${product.price} kr.</span>
               <span class="new-price">${Math.round(
                 product.price * (1 - product.discount / 100),
               )} kr.</span>`
            : `<span class="new-price">${product.price} kr.</span>`
        }
      </p>
    </a>
  </article>
`;
  });
}

getProducts();
