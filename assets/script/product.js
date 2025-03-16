let productList = document.getElementById("product-list");
let cartList = document.getElementById("cart-list");
let notFound = document.getElementById("notFound");
let carts = [];
let products = [];

async function fetchApI() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
        showProduct(products);
    } catch (error) {
        console.log("Error call API!", error);
        showNotFound();
    }
}

// Save locolStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(carts));
}
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cartItems");
    carts = storedCart ? JSON.parse(storedCart) : []; // Đảm bảo carts luôn là mảng
    updateCart();
}

function showNotFound() {
    let notFound = document.getElementById("notFound");
    notFound.innerHTML = ""; // Xóa nội dung cũ

    if (!products || products.length === 0) {
        products.forEach((product) => {
            if (product) {
                return;
            } else {
                // Kiểm tra nếu API bị lỗi hoặc không có sản phẩm
                let errorDiv = document.createElement("div");
                errorDiv.classList.add("container");
                errorDiv.innerHTML = `
                <div class="notFound__inner">
                    <h4 class="notFound__heading">Không tìm thấy sản phẩm!</h4>
                    <img src="./assets/imgs/404 Error-pana 1.png" alt="Error" class="notFound__img-error"/>
                    <div class="notFound__action">
                        <a href="/"><button class="notFound__btn-back">GO BACK</button></a>
                    </div>
                </div>
            `;
            }
        });
        notFound.appendChild(errorDiv);
    }
}

function showProduct(products) {
    products.forEach((product) => {
        let colDiv = document.createElement("div");
        colDiv.classList.add("row__coll");
        colDiv.innerHTML = `
           <a href="#!">
                <img
                    src="${product.image}"
                    onerror="this.onerror=null; this.src='https://placehold.co/340x310';"
                    alt="White T-shirt with the word 'HOTEL' printed on it"
                    class="product-card__image-child"
                />
            </a>
            <div class="product-card__button">
                <button
                onclick="addToCart(${product.id})"
                id="product-card__button-child"
                class="product-card__button-child">
                Add to Cart
            </button>
            </div>
            <div class="product-card__details">
                <div class="product-card__category">
                    <span class="product-card__category-desc line-clamp">
                    ${product.description}
                    </span>
                    <i class="far fa-heart product-card__category-icon"></i>
                </div>
                <h2 class="product-card__title-child line-clamp">
                    ${product.title}
                </h2>
                <div class="product-card__rating">
                    <i class="fas fa-star product-card__rating-icon"></i>
                    <span class="product-card__rating-desc">
                    ${product.rating.rate} (${product.rating.count})
                    </span
                    >
                    <span class="product-card__price">${product.price}đ</span>
                </div>
            </div>
        `;
        productList.appendChild(colDiv);
    });
}

function addToCart(productId) {
    let findProduct = products.find((item) => item.id == productId);
    if (findProduct) {
        let confirmAdd = confirm(
            `Bạn có muốn thêm "${findProduct.title}" vào giỏ hàng không?`
        );
        if (confirmAdd) {
            carts.push(findProduct);
            saveCartToLocalStorage(); // Lưu giỏ hàng vào localStorage
            updateCart(); // Cập nhật giỏ hàng trên giao diện
        }
    }
}

function removeFromCart(index) {
    carts.splice(index, 1); // Xóa sản phẩm khỏi mảng
    saveCartToLocalStorage();
    updateCart(); // Cập nhật lại giỏ hàng
}

function updateCart() {
    cartList.innerHTML = "";
    let totalPrice = 0;
    carts.forEach((cartProduct, index) => {
        let li = document.createElement("li");
        li.classList.add("product__cart-item");
        li.innerHTML = `
                <div class="product__cart-item-wrap">
                    <a href="#!">
                        <img
                            src="${cartProduct.image}"
                            onerror="this.onerror=null; this.src='https://placehold.co/340x310';"
                            alt=""
                            class="product__cart-item-img"
                    /></a>
                </div>
                <div class="product__cart-item-desc">
                    <p class="product__cart-item-title line-clamp">${cartProduct.title}</p>
                    <p class="product__cart-item-price">${cartProduct.price}đ</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            `;
        cartList.appendChild(li);
        totalPrice = totalPrice + cartProduct.price;
    });
    let totalPrices = document.getElementById("total-price");
    totalPrices.innerHTML = `Total Price: ${totalPrice.toLocaleString()}đ`;
    saveCartToLocalStorage();
    checkProductCartItems();
}

function checkProductCartItems() {
    const emptyCartMessage = document.querySelector(".empty-cart-message-product");
    const productCartItems = document.querySelectorAll(".product__cart-item");
    const productCartItemCount = productCartItems.length;
    console.log(emptyCartMessage);

    if (productCartItemCount === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchApI();
    loadCartFromLocalStorage();
    updateCart();
});
