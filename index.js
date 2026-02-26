fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then(showCategories);

const categoryImages = {
  Accessories: "images/hat.webp",
  Apparel: "images/modeller.webp",
  Footwear: "images/sko.webp",
  "Free Items": "images/scarf.webp",
  "Personal Care": "images/skincare.webp",
  "Sporting Goods": "images/surf.webp",
};

function showCategories(categories) {
  const container = document.querySelector(".categories");
  container.innerHTML = "";

  categories.forEach((cat) => {
    const img = categoryImages[cat.category] || "images/modeller.webp";

    const markup = `
      <a class="hb-tile" href="productlist.html?category=${encodeURIComponent(
        cat.category,
      )}">
        <img src="${img}" alt="${cat.category}" />
        <span class="hb-label">${cat.category}</span>
      </a>
    `;

    container.insertAdjacentHTML("beforeend", markup);
  });
}
