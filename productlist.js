const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "Apparel";

// hent produkter
fetch(
  `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(
    category,
  )}`,
)
  .then((res) => res.json())
  .then(showProducts)
  .catch((err) => {
    console.error("Fetch fejl:", err);
    document.querySelector(".products").innerHTML =
      "<p>Kunne ikke hente produkter.</p>";
  });

function showProducts(products) {
  const container = document.querySelector(".products");
  container.innerHTML = "";

  products.forEach((product) => {
    // discount beregning
    const hasDiscount = product.discount && Number(product.discount) > 0;

    const newPrice = hasDiscount
      ? Math.round(product.price - (product.price * product.discount) / 100)
      : product.price;

    const card = `
      <article class="card product-card ${
        product.soldout ? "soldout" : ""
      } ${hasDiscount ? "discount" : ""}">
        
        <a class="product-link" href="productdetails.html?id=${product.id}">
          
          <figure class="product-media">
            
            ${
              product.soldout
                ? '<span class="badge soldout-badge">Sold out</span>'
                : ""
            }
            
            ${
              hasDiscount
                ? '<span class="badge discount-badge">Sale</span>'
                : ""
            }

            <img 
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt="${product.productdisplayname}"
            />
          </figure>

          <div class="product-info">
            <h2 class="product-title">${product.productdisplayname}</h2>
            <p class="product-meta">Brand: ${product.brandname}</p>

            <p class="price">
              ${
                hasDiscount
                  ? `<span class="price-old">${product.price} kr.</span>`
                  : ""
              }
              <span class="price-now">${newPrice} kr.</span>
            </p>
          </div>

        </a>
      </article>
    `;

    container.insertAdjacentHTML("beforeend", card);
  });
}
