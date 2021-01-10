import { parseRequestUrl } from "../utils";
import { getProduct } from "../api";
import Rating from "../components/Rating";

const ProductScreen = {
  // for cart page
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },

  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
      <div class="content">
        <div class="back-to-results">
          <a href="/#/">Back to previous page</a>
        </div>
        <div class="details">
          <div class="details-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
                ${Rating.render({
                  value: product.rating,
                  text: `${product.numReviews} reviews`,
                })}
              </li>
              <li>
                Price: <strong>$${product.price}</strong>
              </li>
              <li>
                Description:
                <div>
                  ${product.description}
                </div>
              </li>
            </ul>
          </div>
          <div class="details-action">
            <ul>
              <li>
                Price: $${product.price}
              </li>
              <li>
                Status: ${
                  product.countInStock
                    ? `<span class="success">In stock</span>`
                    : `<span class="error">Unavailable</span>`
                }
              </li>
              <li>
                <button id="add-button" class="primary fw">Add to cart</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },
};

export default ProductScreen;
