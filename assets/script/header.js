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
