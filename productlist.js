const listURL = "https://kea-alt-del.dk/t7/api/products?limit=9";
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
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h3>${product.productdisplayname}</h3>
          <p>${product.price} kr.</p>
        </a>
      </article>
    `;
  });
}

getProducts();
