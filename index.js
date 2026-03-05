const categoryURL = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector(".categories");

fetch(categoryURL)
  .then((res) => res.json())
  .then(showCategories);

function showCategories(categories) {
  container.innerHTML = "";

  categories.forEach((cat) => {
    const productsURL = `https://kea-alt-del.dk/t7/api/products?category=${cat.category}&limit=1`;

    fetch(productsURL)
      .then((res) => res.json())
      .then((products) => {
        const product = products[0];

        // fallback hvis en kategori ikke har produkter
        const imgSrc = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

        container.innerHTML += `
          <a class="hb-tile" href="productlist.html?category=${cat.category}">
            <img src="${imgSrc}" alt="${cat.category}" />
            <span class="hb-label">${cat.category}</span>
          </a>
        `;
      });
  });
}
