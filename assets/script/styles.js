// Active Header
// const navLink = document.querySelectorAll(".nav__item");
// console.log(navLink);

// navLink.forEach((item) => {
//     item.addEventListener("click", function (e) {
//         removeActive();
//         item.classList.add("active");
//         console.log(item);
//     });
// });

// function removeActive() {
//     navLink.forEach((item) => {
//         if (item.classList.contains("active")) {
//             item.classList.remove("active");
//             console.log(item);
//         }
//     });
// }

// Tối ưu hơn Active Header
// Lấy tất cả các mục menu
const navLink = document.querySelectorAll(".nav__link");
const currentPath = window.location.pathname;
navLink.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
        link.parentElement.classList.add("active");
    }
    link.addEventListener("click", function () {
        removeActive();
        link.parentElement.classList.add("active");
    });
});
function removeActive() {
    navLink.forEach((link) => {
        link.parentElement.classList.remove("active");
    });
}

// Active Footer
const navItemLinkFooter = document.querySelectorAll(".nav__link-footer");
console.log(navItemLinkFooter);
const currentPathFooter = window.location.pathname;
navItemLinkFooter.forEach((items) => {
    if (items.getAttribute("href") === currentPathFooter) {
        items.parentElement.classList.add("active");
    }
    items.addEventListener("click", function (e) {
        removeActiveFooter();
        items.classList.add("active");
        console.log(items);
    });
});

function removeActiveFooter() {
    navItemLinkFooter.forEach((items) => {
        if (items.classList.contains("active")) {
            items.classList.remove("active");
            console.log(items);
        }
    });
}

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

// Pay add card
const buttonAddCard = document.querySelectorAll("#product-card__button-child");
const overlay = document.getElementById("card__overlay");
const rowWrap = document.getElementById("row__wrap");
const cardImg = document.getElementById("card__img");

function showOverlay() {
    overlay.style.display = "flex";
    rowWrap.style.display = "flex";

    setTimeout(() => {
        overlay.style.opacity = "1";
        rowWrap.style.opacity = "1";
        overlay.style.visibility = "visible";
        rowWrap.style.visibility = "visible";
    }, 10); // Đợi một chút để đảm bảo transition hoạt động
}

function hideRowWrap() {
    rowWrap.style.opacity = "0"; // Làm mờ dần rowWrap
    overlay.style.opacity = "0"; // Làm mờ dần overlay

    setTimeout(() => {
        rowWrap.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
        rowWrap.style.display = "none";
        overlay.style.display = "none";
    }, 500); // Chờ 0.5s rồi mới ẩn hoàn toàn
}

function changeUpdate() {
    buttonAddCard.forEach((btn) => {
        btn.addEventListener("click", showOverlay);
    });
}
changeUpdate();

// Kiểm tra số lượng sản phẩm trong giỏ hàng để ẩn/hiện thanh cuộn

function checkCartItemsPay() {
    const productCardRow = document.querySelectorAll(".product__modal");
    const cartItemCountPay = productCardRow.length;
    console.log(cartItemCountPay);
    const emptyCartMessagePay = document.querySelector(".empty-cart-message-pay");
    if (cartItemCountPay === 0) {
        emptyCartMessagePay.style.display = "block";
    } else {
        emptyCartMessagePay.style.display = "none";
    }
}

// Xóa sản phẩm khỏi giỏ hàng pay
let cardHeaderLink = document.querySelectorAll(".card__header-link");
cardHeaderLink.forEach((link) => {
    link.addEventListener("click", function () {
        this.closest(".product__card-row .col").remove();
        checkCartItemsPay();
    });
});

// Khi nhấn vào cardImg, rowWrap sẽ từ từ ẩn đi
if (cardImg) {
    cardImg.addEventListener("click", hideRowWrap);
}

// Khi nhấn vào overlay cũng sẽ ẩn
window.addEventListener("click", function (event) {
    if (event.target === overlay) {
        hideRowWrap();
    }
});

// Add to card
// Product
// Giảm số lượng sản phẩm
document.getElementById("decrease-quantity").addEventListener("click", function () {
    let quantity = document.getElementById("quantity");
    let currentQuantity = parseInt(quantity.textContent);
    if (currentQuantity > 1) {
        quantity.textContent = currentQuantity - 1;
    }
});

// Tăng số lượng sản phẩm
document.getElementById("increase-quantity").addEventListener("click", function () {
    let quantity = document.getElementById("quantity");
    let currentQuantity = parseInt(quantity.textContent);
    quantity.textContent = currentQuantity + 1;
});

// Chọn hình ảnh sản phẩm
document.querySelectorAll(".thumbnails__image").forEach((img) => {
    img.addEventListener("click", function () {
        document
            .querySelectorAll(".thumbnails__image")
            .forEach((i) => i.classList.remove("thumbnails__image--selected"));
        this.classList.add("thumbnails__image--selected");
        document.querySelector(".container__product-3__image").src = this.src;
    });
});

// Chọn màu sản phẩm
document.querySelectorAll(".color-selection__button").forEach((button) => {
    button.addEventListener("click", function () {
        document
            .querySelectorAll(".color-selection__button")
            .forEach((b) => b.classList.remove("selected"));
        this.classList.add("selected");
    });
});

// Thêm sản phẩm vào giỏ hàng
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

    // Kiểm tra số lượng sản phẩm trong giỏ hàng để ẩn/hiện thanh cuộn
    checkCartItems();
});

// Cập nhật tổng giá tiền
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

// Xóa sản phẩm khỏi giỏ hàng
document.querySelectorAll(".cart-item__delete").forEach((button) => {
    button.addEventListener("click", function () {
        this.closest(".cart-item").remove();
        updateTotalPrice();
        checkCartItems();
    });
});

// Hiển thị modal khi nhấn nút Checkout
document.getElementById("checkout-button").addEventListener("click", function () {
    const modal = document.getElementById("checkout-modal");
    const totalPrice = document.querySelector(".total-checkout__price").textContent;
    document.getElementById("modal-total-price").textContent = totalPrice;
    modal.classList.add("show");
});

// Đóng modal khi nhấn nút đóng
document.querySelector(".modal-close").addEventListener("click", function () {
    const modal = document.getElementById("checkout-modal");
    modal.classList.remove("show");
});

// Đóng modal khi nhấn ra ngoài modal
window.addEventListener("click", function (event) {
    const modal = document.getElementById("checkout-modal");
    if (event.target == modal) {
        modal.classList.remove("show");
    }
});

// Kiểm tra số lượng sản phẩm trong giỏ hàng để ẩn/hiện thanh cuộn

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

// // Kiểm tra số lượng sản phẩm trong giỏ hàng khi tải trang
checkCartItems();
