// Service
// Color col nào được hover thì có opacity là 0.8 còn không là 0.4 và khi thả chuột là 1
const cols = document.querySelectorAll(".features .col");

cols.forEach((col) => {
    col.addEventListener("mouseenter", function () {
        cols.forEach((item) => {
            item.style.opacity = "0.4"; // Mặc định tất cả là 0.4
        });
        col.style.opacity = "0.8"; // Item được hover có 0.8
    });

    col.addEventListener("mouseleave", function () {
        cols.forEach((item) => {
            item.style.opacity = "1"; // Reset về 1 khi rời chuột
        });
    });
});

// work
document.getElementById("decrease-quantity").addEventListener("click", function () {
    let quantity = document.getElementById("quantity");
    let currentQuantity = parseInt(quantity.textContent);
    if (currentQuantity > 1) {
        quantity.textContent = currentQuantity - 1;
    }
});

document.getElementById("increase-quantity").addEventListener("click", function () {
    let quantity = document.getElementById("quantity");
    let currentQuantity = parseInt(quantity.textContent);
    quantity.textContent = currentQuantity + 1;
});

document.querySelectorAll(".thumbnails__image").forEach((img) => {
    img.addEventListener("click", function () {
        document
            .querySelectorAll(".thumbnails__image")
            .forEach((i) => i.classList.remove("thumbnails__image--selected"));
        this.classList.add("thumbnails__image--selected");
        document.querySelector(".container__product-3__image").src = this.src;
    });
});

document.querySelectorAll(".color-selection__button").forEach((button) => {
    button.addEventListener("click", function () {
        document
            .querySelectorAll(".color-selection__button")
            .forEach((b) => b.classList.remove("selected"));
        this.classList.add("selected");
    });
});

document.getElementById("add-to-cart").addEventListener("click", function () {
    const cart = document.querySelector(".cart-items");
    const productName = "Green T-shirt";
    const productPrice = 120;
    const productQuantity = parseInt(document.getElementById("quantity").textContent);
    const productImage = document.querySelector(".container__product-3__image").src;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <div class="cart-item__info">
            <img class="cart-item__image" src="${productImage}" alt="${productName} thumbnail">
            <div>
                <p class="cart-item__name">${productName}</p>
                <p class="cart-item__price">$${productPrice}</p>
            </div>
        </div>
        <div class="cart-item__controls">
            <span class="cart-item__quantity">${productQuantity}</span>
            <button class="cart-item__delete"><i class="fas fa-trash"></i></button>
        </div>
    `;
    cart.appendChild(cartItem);

    updateTotalPrice();

    cartItem.querySelector(".cart-item__delete").addEventListener("click", function () {
        cartItem.remove();
        updateTotalPrice();
        checkCartItems();
    });

    checkCartItems();
});

function updateTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll(".cart-item").forEach((item) => {
        let price = parseFloat(
            item.querySelector(".cart-item__price").textContent.replace("$", "")
        );
        let quantity = parseInt(item.querySelector(".cart-item__quantity").textContent);
        totalPrice += price * quantity;
    });
    document.querySelector(".total-checkout__price").textContent =
        totalPrice.toFixed(2);
}

document.querySelectorAll(".cart-item__delete").forEach((button) => {
    button.addEventListener("click", function () {
        this.closest(".cart-item").remove();
        updateTotalPrice();
        checkCartItems();
    });
});

document.getElementById("checkout-button").addEventListener("click", function () {
    const modal = document.getElementById("checkout-modal");
    const totalPrice = document.querySelector(".total-checkout__price").textContent;
    document.getElementById("modal-total-price").textContent = totalPrice;
    modal.classList.add("show");
});

document.querySelector(".modal-close").addEventListener("click", function () {
    const modal = document.getElementById("checkout-modal");
    modal.classList.remove("show");
});

window.addEventListener("click", function (event) {
    const modal = document.getElementById("checkout-modal");
    if (event.target == modal) {
        modal.classList.remove("show");
    }
});

function checkCartItems() {
    const cartItems = document.querySelector(".cart-items");
    const cartItemCount = cartItems.children.length;
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    if (cartItemCount > 3) {
        cartItems.style.overflowY = "auto";
    } else {
        cartItems.style.overflowY = "hidden";
    }
    if (cartItemCount === 0) {
        emptyCartMessage.style.display = "block";
    } else {
        emptyCartMessage.style.display = "none";
    }
}

// Kiểm tra số lượng sản phẩm trong giỏ hàng khi tải trang
checkCartItems();
